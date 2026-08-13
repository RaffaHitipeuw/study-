import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Separator } from './ui/separator'

const DURATIONS = [
  { value: 25, label: '25m', desc: 'Quick' },
  { value: 45, label: '45m', desc: 'Deep' },
  { value: 60, label: '60m', desc: 'Long' },
]

export function DurationPicker({ onStart }) {
  const [selected, setSelected] = useState(25)
  const [task, setTask] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onStart(selected, task.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>What are you working on?</Label>
        <Input
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>

      <Separator />

      <div className="space-y-3">
        <Label>Session Length</Label>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {DURATIONS.map((d) => (
            <button key={d.value} type="button" onClick={() => setSelected(d.value)} className={`p-4 rounded-2xl transition-all duration-300 flex flex-col items-center ${selected === d.value?'bg-[#2b2d42] text-white scale-[1.02]':'bg-[#edf2f4] text-[#2b2d42] hover:bg-[#d8dce2]'}`}>
              <span className="text-[24px] font-semibold">{d.label}</span>
              <span className={`text-[11px] mt-0.5 ${selected === d.value ? 'text-white/70' : 'text-[#8d99ae]'}`}>
                {d.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <Button type="submit" className="w-full h-12 text-[17px] font-semibold">
        Start Session
      </Button>
    </form>
  )
}
