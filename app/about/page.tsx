import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About KeyboardHaven</h1>
              <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed">
                Passionate about mechanical keyboards since 2015
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">Our Story</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">From Enthusiasts to Experts</h2>
              <p className="text-gray-500 md:text-xl/relaxed">
                KeyboardHaven started as a small passion project by two keyboard enthusiasts who were frustrated by the
                lack of quality options in the market. What began in a garage with custom-built keyboards for friends has
                grown into a trusted brand serving typing enthusiasts worldwide.
              </p>
              <p className="text-gray-500 md:text-xl/relaxed">
                Our journey has been defined by an unwavering commitment to quality, innovation, and the perfect typing
                experience. Every keyboard we sell is tested by our team of experts who understand that the right
                keyboard is more than a tool—it's an extension of yourself.
              </p>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-xl">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Our workshop"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Values</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
                The principles that guide everything we do
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 lg:gap-12">
            {values.map((value) => (
              <div key={value.title} className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <value.icon className="h-8 w-8 text-gray-900" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="text-gray-500">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meet Our Team</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
                The experts behind KeyboardHaven
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-4 lg:gap-8">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col items-center space-y-4 text-center">
                <div className="relative h-40 w-40 overflow-hidden rounded-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Elevate Your Typing Experience?</h2>
              <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed">
                Browse our collection of premium mechanical keyboards and find your perfect match.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/store">
                <Button className="bg-white text-black hover:bg-gray-200">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Mock data
const values = [
  {
    title: "Quality",
    description: "We never compromise on materials or craftsmanship. Every keyboard is built to last and perform flawlessly.",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Innovation",
    description: "We're constantly exploring new technologies and designs to bring you the most advanced keyboards on the market.",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: "Community",
    description: "We believe in building a community of keyboard enthusiasts who share knowledge and passion for the perfect typing experience.",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
]

const team = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Jamie Taylor",
    role: "Chief Design Officer",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Sam Rodriguez",
    role: "Head of Engineering",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Morgan Lee",
    role: "Customer Experience",
    image: "/placeholder.svg?height=150&width=150",
  },
] 