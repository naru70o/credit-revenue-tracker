import React from 'react'
import { Button } from './ui/button'

export default function FilterCredits() {
  return (
    <div className="flex items-center self-end">
    <Button size="sm" className="bg-blue-500 hover:bg-blue-700">
      unpaid
    </Button>
    <Button
      size="sm"
      className="bg-blue-500 hover:bg-blue-700 border-x border-x-slate-100"
    >
      paid
    </Button>
    <Button size="sm" className="bg-blue-500 hover:bg-blue-700">
      expensive
    </Button>
  </div>
  )
}
