"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const carouselData = [
  {
    image: "/farm.jpg?height=1080&width=1920",
    heading: "Smart Farming, Simplified",
    subtext: "Automate your hydroponic growing with our easy-to-use technology",
  },
  {
    image: "/growMore.jpg?height=1080&width=1920",
    heading: "Grow More, Work Less",
    subtext: "Let our automation handle the routine tasks while you focus on what matters",
  },
  {
    image: "/precision.jpg?height=1080&width=1920",
    heading: "Precision Growing at Your Fingertips",
    subtext: "Advanced sensors and controls made simple for everyone",
  },
  {
    image: "/img1.jpg?height=1080&width=1920",
    heading: "The Future of Farming is Here",
    subtext: "Join the agricultural revolution with Ufarms automation",
  },
]

export function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Adjust for the fixed header height
      const headerHeight = 64 // 16 * 4 = 64px (h-16)
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[60vh] md:h-[75vh]">
      {carouselData.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={`Ufarms - ${slide.heading}`}
            fill
            sizes="100vw"
            className="object-cover"
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-black/50" />

          {/* Dynamic Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
              <div className="max-w-3xl space-y-3 sm:space-y-4 text-center sm:text-left text-white">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-1 sm:mb-2 tracking-tight">
                  {slide.heading}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-3 sm:mb-4">{slide.subtext}</p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start">
                  <Button size="sm" className="font-medium sm:size-lg" asChild>
                    <Link
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection("contact")
                      }}
                    >
                      Join Our Mission
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" className="bg-background/20 font-medium sm:size-lg" asChild>
                    <Link
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection("contact")
                      }}
                    >
                      Get in Touch
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

