import { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function Timer({ duration, timeLeft, task, status, progress, onCancel, onComplete }) {
  const completedRef = useRef(false)

  useEffect(() => {
    if (status === 'running') {
      completedRef.current = false
    }
  }, [status])

  useEffect(() => { 
    if (status !== 'running' || completedRef.current) return
    if (timeLeft <= 0) {
      completedRef.current = true
      onComplete()
    }
  }, [timeLeft, status, onComplete])

  const circumference = 2 * Math.PI * 80
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center space-y-6 py-4">
      {task && (
        <p className="text-[15px] font-medium text-[#2b2d42] text-center">
          {task}
        </p>
      )}

      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 180 180">
          <circle cx="90" cy="90" r="80" fill="none" stroke="#d8dce2" strokeWidth="8" />
          <circle
            cx="90"
            cy="90"
            r="80"
            fill="none"
            stroke="#2b2d42"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-light tracking-tight text-[#2b2d42] tabular-nums">
            {formatTime(timeLeft)}
          </span>
          <span className="text-[12px] text-[#8d99ae] mt-1">remaining</span>
        </div>
      </div>

      <Progress value={progress} className="h-1 w-full max-w-[200px]" />

      <Separator className="w-full" />

      <div className="w-full space-y-4">
        <Button onClick={onCancel} variant="outline" className="w-full h-11">
          Cancel Session
        </Button>
      </div>
    </div>
  )
}
