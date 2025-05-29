"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, RefreshCw, FileQuestion } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-1 flex flex-col items-center justify-center py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center">
          <FileQuestion className="h-16 w-16 text-gray-400 mb-4" />
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Something went wrong!</h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl">
              We apologize for the inconvenience. An error occurred while processing your request.
            </p>
          </div>
          <div className="mt-8 flex gap-4">
            <Button onClick={reset} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 