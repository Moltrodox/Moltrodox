'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { sendEmail } from './actions'

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function onSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await sendEmail(formData)
      setSuccess(true)
      const form = document.querySelector('form') as HTMLFormElement
      form?.reset()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="first-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            First name
          </label>
          <Input
            id="first-name"
            name="first-name"
            placeholder="John"
            required
            className="border-gray-200"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="last-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Last name
          </label>
          <Input
            id="last-name"
            name="last-name"
            placeholder="Doe"
            required
            className="border-gray-200"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Email
        </label>
        <Input
          id="email"
          name="email"
          placeholder="john.doe@example.com"
          type="email"
          required
          className="border-gray-200"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Subject
        </label>
        <Input
          id="subject"
          name="subject"
          placeholder="How can we help you?"
          required
          className="border-gray-200"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Enter your message here"
          required
          className="min-h-[150px] border-gray-200 resize-none"
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">Message sent successfully!</p>}
    </form>
  )
}
