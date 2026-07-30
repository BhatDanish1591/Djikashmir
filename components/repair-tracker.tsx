"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const STAGES = ["Received", "Diagnosing", "Repairing", "Quality Check", "Shipped"]

// Demo lookup: any ticket ending in a digit maps to that stage index
export function RepairTracker() {
  const [ticket, setTicket] = useState("")
  const [result, setResult] = useState<{ id: string; stage: number; drone: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function lookup(e: React.FormEvent) {
    e.preventDefault()
    if (!ticket.trim()) return
    setError("")
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      const match = ticket.trim().match(/(\d)(?!.*\d)/)
      if (!match) {
        setError("Ticket not found. Try a code like SKY-2048.")
        setLoading(false)
        return
      }
      const stage = Number.parseInt(match[1], 10) % STAGES.length
      setResult({ id: ticket.trim().toUpperCase(), stage, drone: "Aero Pro X1" })
      setLoading(false)
    }, 900)
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <h3 className="font-sans text-xl font-semibold text-foreground">Track Your Repair</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Enter your repair ticket number to see live status. {"(Try SKY-2048)"}
      </p>
      <form onSubmit={lookup} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={ticket}
            onChange={(e) => setTicket(e.target.value)}
            placeholder="e.g. SKY-2048"
            className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            aria-label="Repair ticket number"
          />
        </div>
        <Button type="submit" className="h-12 rounded-full px-6" disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : "Track"}
        </Button>
      </form>

      {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}

      {result ? (
        <div className="mt-6 rounded-2xl bg-secondary/60 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Ticket {result.id}</p>
              <p className="font-sans text-lg font-semibold text-foreground">{result.drone}</p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {STAGES[result.stage]}
            </span>
          </div>
          <ol className="mt-6 space-y-4">
            {STAGES.map((stage, i) => {
              const done = i <= result.stage
              const active = i === result.stage
              return (
                <li key={stage} className="flex items-center gap-3">
                  {done ? (
                    <CheckCircle2 className={`size-5 ${active ? "text-primary" : "text-primary/70"}`} />
                  ) : (
                    <Circle className="size-5 text-muted-foreground/40" />
                  )}
                  <span className={`text-sm ${done ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                    {stage}
                  </span>
                </li>
              )
            })}
          </ol>
        </div>
      ) : null}
    </div>
  )
}
