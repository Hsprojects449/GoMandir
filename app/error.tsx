"use client"

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // TODO: hook into error reporting (e.g., Sentry)
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[50vh] flex items-center justify-center text-center p-6">
      <div>
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">An unexpected error occurred. Please try again.</p>
        <button className="mt-4 inline-flex px-4 py-2 rounded-md bg-black text-white" onClick={reset}>
          Retry
        </button>
      </div>
    </div>
  )
}
