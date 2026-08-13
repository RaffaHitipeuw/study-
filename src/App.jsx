import { useState, useEffect, useCallback } from 'react'
import { DurationPicker } from './components/DurationPicker'
import { Timer } from './components/Timer'
import { Card } from './components/ui/card'
import { CheckCircle2 } from 'lucide-react'

const isChromeExtension = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id

function App() {
  const [status, setStatus] = useState('idle')
  const [duration, setDuration] = useState(25)
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [task, setTask] = useState('')

  const syncWithBackground = useCallback(() => {
    if (!isChromeExtension) {
      setStatus('idle')
      return
    }

    chrome.runtime.sendMessage({ type: 'getTimer' }, (timer) => {
      if (!timer) {
        setStatus('idle')
        return
      }

      if (timer.status === 'running') {
        const remaining = Math.max(0, Math.ceil((timer.endTime - Date.now()) / 1000))
        if (remaining <= 0) {
          setStatus('completed')
          setTimeLeft(0)
          setDuration(timer.duration)
          setTask(timer.task || '')
        } else {
          setStatus('running')
          setDuration(timer.duration)
          setTimeLeft(remaining)
          setTask(timer.task || '')
        }
      }
    })
  }, [])

  useEffect(() => {
    syncWithBackground()
  }, [syncWithBackground])

  useEffect(() => {
    if (status !== 'running') return

    const interval = setInterval(() => {
      if (!isChromeExtension) {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            setStatus('completed')
            return 0
          }
          return prev - 1
        })
        return
      }

      chrome.runtime.sendMessage({ type: 'getTimer' }, (timer) => {
        if (!timer || timer.status !== 'running') {
          setStatus('idle')
          clearInterval(interval)
          return
        }

        const remaining = Math.max(0, Math.ceil((timer.endTime - Date.now()) / 1000))
        if (remaining <= 0) {
          setStatus('completed')
          setTimeLeft(0)
          clearInterval(interval)
        } else {
          setTimeLeft(remaining)
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [status])

  const handleStart = useCallback((selectedDuration, taskName) => {
    if (isChromeExtension) {
      chrome.runtime.sendMessage({
        type: 'startTimer',
        duration: selectedDuration,
        task: taskName
      })
    }

    setDuration(selectedDuration)
    setTimeLeft(selectedDuration * 60)
    setTask(taskName)
    setStatus('running')
  }, [])

  const handleCancel = useCallback(() => {
    if (isChromeExtension) {
      chrome.runtime.sendMessage({ type: 'cancelTimer' })
    }

    setStatus('idle')
    setDuration(25)
    setTimeLeft(25 * 60)
    setTask('')
  }, [])

  const handleReset = useCallback(() => {
    if (isChromeExtension) {
      chrome.runtime.sendMessage({ type: 'cancelTimer' })
    }

    setStatus('idle')
    setDuration(25)
    setTimeLeft(25 * 60)
    setTask('')
  }, [])

  const handleComplete = useCallback(() => {
    setStatus('completed')
    setTimeLeft(0)
  }, [])

  const progress = status === 'idle'
    ? 0
    : ((duration * 60 - timeLeft) / (duration * 60)) * 100

  return (
    <div className="min-h-screen bg-[#edf2f4]">
      <div className="px-6 py-8">
        <div className="flex items-center justify-center mb-10">
          <img
            src="/icon.svg"
            alt="study://"
            className="w-16 h-16"
          />
        </div>

        {status === 'idle' && (
          <Card className="p-6">
            <DurationPicker onStart={handleStart} />
          </Card>
        )}

        {status === 'running' && (
          <Card className="p-6">
            <Timer
              duration={duration}
              timeLeft={timeLeft}
              task={task}
              status={status}
              progress={progress}
              onCancel={handleCancel}
              onComplete={handleComplete}
            />
          </Card>
        )}

        {status === 'completed' && (
          <Card className="p-8">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="w-20 h-20 rounded-full bg-[#34C759]/10 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-[#34C759]" />
              </div>

              <div className="space-y-1">
                <h2 className="text-[22px] font-semibold tracking-tight text-[#2b2d42]">
                  Session Complete
                </h2>
                {task && (
                  <p className="text-[15px] text-[#8d99ae]">
                    {task}
                  </p>
                )}
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="text-[#2b2d42] text-[15px] font-medium hover:text-[#2b2d42]/70 transition-colors"
                >
                  Start Another Session
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

export default App
