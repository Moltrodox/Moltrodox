import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-1 flex flex-col items-center justify-center py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center">
          <div className="space-y-3">
            <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl">404</h1>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Page Not Found</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/">
              <Button className="flex items-center gap-2">
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