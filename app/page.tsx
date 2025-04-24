"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel } from "@/components/carousel"
import { SectionHeading } from "@/components/section-heading"
import { MobileMenu } from "@/components/mobile-menu"
import { FeatureCard } from "@/components/feature-card"
import {
  Droplet,
  Thermometer,
  Gauge,
  Percent,
  Waves,
  Zap,
  PlusCircle,
  Settings,
  ToggleLeft,
  Mail,
  Phone,
  MapPin,
  Send,
  Users,
  GraduationCap,
  School,
  SproutIcon as Seedling,
  Building,
  Trophy,
  Star,
  Bookmark,
} from "lucide-react"
import {
  Award,
  Check,
  ChevronRight,
  Leaf,
  Sprout,
  Lightbulb,
  Menu,
  Calendar,
  Cpu,
  FlaskRoundIcon as Flask,
  Rocket,
  Beaker,
  Milestone,
} from "lucide-react"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const [activeTab, setActiveTab] = useState("automation")
  const [userInteracted, setUserInteracted] = useState(false)
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const tabIndicatorRef = useRef<HTMLDivElement>(null)

  // Update the handleTabChange function to implement slide animation
  const handleTabChange = (value: string) => {
    if (value === activeTab) return

    setIsAnimating(true)
    setTimeout(() => {
      setActiveTab(value)
      setTimeout(() => {
        setIsAnimating(false)
      }, 50)
    }, 300)

    setUserInteracted(true)

    // Reset inactivity timer
    if (inactivityTimer) clearTimeout(inactivityTimer)

    const timer = setTimeout(() => {
      setUserInteracted(false)
    }, 8000)

    setInactivityTimer(timer)
  }

  // Update the useEffect for auto-switching to implement slide animation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (!userInteracted) {
      interval = setInterval(() => {
        setIsAnimating(true)
        setTimeout(() => {
          setActiveTab((current) => {
            const nextTab = (() => {
              switch (current) {
                case "automation":
                  return "precision"
                case "precision":
                  return "hydroponic"
                case "hydroponic":
                  return "analytics"
                case "analytics":
                  return "automation"
                default:
                  return "automation"
              }
            })()
            return nextTab
          })
          setTimeout(() => {
            setIsAnimating(false)
          }, 50)
        }, 300)
      }, 4000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [userInteracted])

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer)
    }
  }, [inactivityTimer])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Reset tab indicator animation when tab changes
  useEffect(() => {
    if (tabIndicatorRef.current) {
      tabIndicatorRef.current.style.animation = "none"
      // Force a reflow
      void tabIndicatorRef.current.offsetWidth
      tabIndicatorRef.current.style.animation = userInteracted ? "none" : "tabIndicator 4s linear infinite"
    }
  }, [activeTab, userInteracted])

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

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container px-4 sm:px-6 md:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Ufarms UK</span>
          </div>
          <nav className="hidden md:flex gap-4 lg:gap-6">
            <Link
              href="#about"
              className="text-sm font-medium hover:text-primary"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("about")
              }}
            >
              About
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("features")
              }}
            >
              Features
            </Link>
            <Link
              href="#achievements"
              className="text-sm font-medium hover:text-primary"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("achievements")
              }}
            >
              Achievements
            </Link>
            <Link
              href="#roadmap"
              className="text-sm font-medium hover:text-primary"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("roadmap")
              }}
            >
              Roadmap
            </Link>
            <Link
              href="#solutions"
              className="text-sm font-medium hover:text-primary"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("solutions")
              }}
            >
              Solutions
            </Link>
            <Link
              href="#beta-program"
              className="text-sm font-medium hover:text-primary"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("beta-program")
              }}
            >
              Beta Program
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-primary"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("contact")
              }}
            >
              Contact
            </Link>
          </nav>
          <Button asChild className="hidden md:inline-flex">
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
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </header>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative z-10">
          <Carousel />
        </section>

        {/* About Section */}
        <section id="about" className="py-8 sm:py-10 md:py-16">
          <div className="container px-4 sm:px-6 md:px-8">
            <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-4 sm:space-y-6">
                <SectionHeading
                  icon={<Sprout className="h-5 w-5" />}
                  badge="About Ufarms UK"
                  title="At the Forefront of AgriTech Innovation"
                  description="As an innovative UK startup, Ufarms is developing simple, user-friendly indoor farming solutions to enable hyperlocal food production for everyone."
                  centered={false}
                />
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-xl font-bold">UK Research Focus</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Adapting our automation technology to UK's climatic conditions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Developing AI-driven crop prediction models for optimized farming</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Partnerships with Glasgow Caledonian University & Glasgow Council</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <div className="aspect-video sm:aspect-square w-full">
                  <Image
                    src="/about.jpg?height=800&width=800"
                    alt="Ufarms research facility in the UK"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Features Section */}
        <section id="features" className="py-8 sm:py-10 md:py-16">
          <div className="container px-4 sm:px-6 md:px-8">
            <SectionHeading
              icon={<Cpu className="h-5 w-5" />}
              badge="Product Features"
              title="Smart Growing Made Simple"
              description="Powerful technology that makes professional hydroponic growing accessible to everyone"
            />

            <div className="mt-8 sm:mt-10 grid gap-6 sm:gap-8 lg:grid-cols-2 items-center">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <FeatureCard
                  icon={<Droplet className="h-5 w-5" />}
                  title="EC/TDS Sensor"
                  description="Monitor nutrient concentration"
                />
                <FeatureCard
                  icon={<Gauge className="h-5 w-5" />}
                  title="pH Sensor"
                  description="Perfect pH balance for crops"
                />
                <FeatureCard
                  icon={<Thermometer className="h-5 w-5" />}
                  title="Temperature"
                  description="Water & ambient monitoring"
                />
                <FeatureCard
                  icon={<Percent className="h-5 w-5" />}
                  title="Humidity"
                  description="Optimal plant environment"
                />
                <FeatureCard
                  icon={<Waves className="h-5 w-5" />}
                  title="Water Level"
                  description="Automatic monitoring"
                />
                <FeatureCard
                  icon={<PlusCircle className="h-5 w-5" />}
                  title="Expandable"
                  description="Add more sensors as needed"
                />
                <FeatureCard
                  icon={<ToggleLeft className="h-5 w-5" />}
                  title="9 Outputs"
                  description="Control pumps, lights & more"
                />
                <FeatureCard
                  icon={<Settings className="h-5 w-5" />}
                  title="Customizable"
                  description="Tailored to your needs"
                />
                <FeatureCard
                  icon={
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
                      className="h-5 w-5"
                    >
                      <path d="m12 22 9-9-9-9" />
                      <path d="M3 4v8c0 2.5 1.5 3 4 3h14" />
                      <path d="M3 16v4" />
                    </svg>
                  }
                  title={
                    <div className="relative">
                      Auto Dosing
                      <span className="absolute -top-6 -right-2 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                  }
                  description="Automatic nutrient mixing & pH adjustment"
                />
                <div className="hidden sm:block"></div>
              </div>

              <div className="relative rounded-xl overflow-hidden">
                <div className="aspect-video w-full">
                  <Image
                    src="/precise.jpg?height=800&width=1200"
                    alt="Ufarms IoT hardware system for hydroponic growing"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-lg sm:text-xl font-bold text-white">Custom IoT Hardware</h3>
                    <p className="text-sm sm:text-base text-white/80">
                      Built specifically for hydroponic growing systems
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 p-4 sm:p-6 bg-primary/5 rounded-xl">
              <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
                <div className="md:w-1/5 flex justify-center">
                  <div className="inline-flex h-14 sm:h-16 w-14 sm:w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Zap className="h-7 sm:h-8 w-7 sm:w-8" />
                  </div>
                </div>
                <div className="md:w-4/5 text-center md:text-left">
                  <h3 className="text-xl font-bold">Ready to Automate Your Growing?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Our IoT system takes the guesswork out of hydroponic growing with precise sensors and customizable
                    controls.
                  </p>
                  <Button className="mt-3 sm:mt-4" asChild>
                    <Link
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection("contact")
                      }}
                    >
                      Get Your System
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support and Collaborations Section */}
        <section id="collaborations" className="py-8 sm:py-10 md:py-16 bg-white">
          <div className="container px-4 sm:px-6 md:px-8">
            <SectionHeading
              icon={<Bookmark className="h-5 w-5" />}
              badge="Our Network"
              title="Support & Collaborations"
              description="We're proud to work with these leading organizations to advance agricultural technology"
            />

            <div className="mt-8 sm:mt-10">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-center">
                {/* SRUC */}
                <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors duration-300 aspect-video">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                      <GraduationCap className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base">SRUC</h3>
                    <p className="text-xs text-muted-foreground mt-1">Scotland's Rural College</p>
                  </div>
                </div>

                {/* Business Gateway */}
                <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors duration-300 aspect-video">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                      <Building className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base">Business Gateway</h3>
                    <p className="text-xs text-muted-foreground mt-1">Business Support Network</p>
                  </div>
                </div>

                {/* Glasgow Caledonian University */}
                <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors duration-300 aspect-video">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                      <School className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base">GCU</h3>
                    <p className="text-xs text-muted-foreground mt-1">Glasgow Caledonian University</p>
                  </div>
                </div>

                {/* STAC */}
                <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors duration-300 aspect-video">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                      <Rocket className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base">STAC</h3>
                    <p className="text-xs text-muted-foreground mt-1">Scottish Tech Army CIC</p>
                  </div>
                </div>

                {/* University of Glasgow */}
                <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors duration-300 aspect-video">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                      <Building className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base">UofG</h3>
                    <p className="text-xs text-muted-foreground mt-1">University of Glasgow</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Roadmap Section */}
        <section id="roadmap" className="py-8 sm:py-10 md:py-16 bg-muted/30">
          <div className="container px-4 sm:px-6 md:px-8">
            <SectionHeading
              icon={<Milestone className="h-5 w-5" />}
              badge="Product Roadmap"
              title="Our Journey to Innovation"
              description="Follow our progress from concept to market-ready solutions"
            />

            <div className="mt-8 sm:mt-10 grid gap-6 sm:gap-8 md:grid-cols-2">
              {/* Journey Image */}
              <div className="relative rounded-xl overflow-hidden order-1">
                <div className="aspect-square md:aspect-auto md:h-full w-full">
                  <Image
                    src="/roadmap.png?height=800&width=600"
                    alt="Ufarms journey from concept to market-ready solutions"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                  
                 
                </div>
              </div>

              {/* Timeline */}
              <div className="relative order-1 md:order-2">
                {/* Vertical timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/20"></div>

                {/* Timeline items */}
                <div className="space-y-8 sm:space-y-10 pl-6 sm:pl-8">
                  {/* Ufarms Formation */}
                  <div className="relative">
                    <div className="absolute left-0 -translate-x-1/2 top-0 w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center z-10">
                      <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary"></div>
                    </div>
                    <div className="pt-0">
                      <div className="inline-flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
                        <Calendar className="h-4 sm:h-5 w-4 sm:w-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold">Ufarms Formation</h3>
                      <p className="mt-1 text-muted-foreground text-xs sm:text-sm">
                        Founded with a vision to revolutionize urban farming through technology and sustainability.
                      </p>
                    </div>
                  </div>

                  {/* Research & Development */}
                  <div className="relative">
                    <div className="absolute left-0 -translate-x-1/2 top-0 w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center z-10">
                      <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary"></div>
                    </div>
                    <div className="pt-0">
                      <div className="inline-flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
                        <Flask className="h-4 sm:h-5 w-4 sm:w-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold">Research & Development</h3>
                      <p className="mt-1 text-muted-foreground text-xs sm:text-sm">
                        Intensive R&D phase exploring automation, AI, and sustainable farming technologies.
                      </p>
                    </div>
                  </div>

                  {/* First Prototype */}
                  <div className="relative">
                    <div className="absolute left-0 -translate-x-1/2 top-0 w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center z-10">
                      <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary"></div>
                    </div>
                    <div className="pt-0">
                      <div className="inline-flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
                        <Cpu className="h-4 sm:h-5 w-4 sm:w-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold">First Prototype</h3>
                      <p className="mt-1 text-muted-foreground text-xs sm:text-sm">
                        Development of our initial vertical farming system with basic automation capabilities.
                      </p>
                    </div>
                  </div>

                  {/* Santander UK Awards */}
                  <div className="relative">
                    <div className="absolute left-0 -translate-x-1/2 top-0 w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center z-10">
                      <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary"></div>
                    </div>
                    <div className="pt-0">
                      <div className="inline-flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
                        <Award className="h-4 sm:h-5 w-4 sm:w-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold">Santander UK Awards</h3>
                      <p className="mt-1 text-muted-foreground text-xs sm:text-sm">
                        Recognized as one of the top 100 innovative startups in the Santander UK Awards 2023.
                      </p>
                    </div>
                  </div>

                  {/* STAC Acceleration */}
                  <div className="relative">
                    <div className="absolute left-0 -translate-x-1/2 top-0 w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center z-10">
                      <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary"></div>
                    </div>
                    <div className="pt-0">
                      <div className="inline-flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
                        <Rocket className="h-4 sm:h-5 w-4 sm:w-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold">STAC Acceleration</h3>
                      <p className="mt-1 text-muted-foreground text-xs sm:text-sm">
                        Selected for the STAC Acceleration program, providing mentorship and resources to scale our
                        technology.
                      </p>
                    </div>
                  </div>

                  {/* Beta Release */}
                  <div className="relative">
                    <div className="absolute left-0 -translate-x-1/2 top-0 w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center z-10">
                      <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary"></div>
                    </div>
                    <div className="pt-0">
                      <div className="inline-flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
                        <Beaker className="h-4 sm:h-5 w-4 sm:w-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold">Beta Release</h3>
                      <p className="mt-1 text-muted-foreground text-xs sm:text-sm">
                        Current stage: Beta version available for early adopters and testing partners.
                      </p>
                      <Button
                        size="sm"
                        className="mt-3 flex items-center gap-2"
                        onClick={() => {
                          const betaButton = document.getElementById("beta-form-button")
                          if (betaButton) {
                            betaButton.scrollIntoView({ behavior: "smooth" })
                            betaButton.focus()
                            betaButton.classList.add("animate-pulse")
                            setTimeout(() => betaButton.classList.remove("animate-pulse"), 2000)
                          }
                        }}
                      >
                        <Beaker className="h-4 w-4" />
                        Join Beta Testing Program
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Beta Program Section */}
        <section id="beta-program" className="py-8 sm:py-10 md:py-16 bg-primary/5">
          <div className="container px-4 sm:px-6 md:px-8">
            <SectionHeading
              icon={<Beaker className="h-5 w-5" />}
              badge="Beta Program"
              title="Join Our Beta Testing Program"
              description="We're looking for partners to help us refine our technology and shape the future of farming"
            />

            <div className="mt-8 sm:mt-10 grid gap-6 sm:gap-8 md:grid-cols-3">
              <Card className="bg-background/80 backdrop-blur">
                <CardHeader className="pb-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <CardTitle>Researchers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Academic and industry researchers interested in agricultural technology, sustainability, and food
                    security.
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    Join our beta program to help shape the future of agricultural technology and get early access to
                    our innovative solutions.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/80 backdrop-blur">
                <CardHeader className="pb-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                    <School className="h-6 w-6" />
                  </div>
                  <CardTitle>Educational Institutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Schools, colleges, and universities looking to incorporate modern agricultural technology into their
                    curriculum.
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    Join our beta program to help shape the future of agricultural technology and get early access to
                    our innovative solutions.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/80 backdrop-blur">
                <CardHeader className="pb-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                    <Seedling className="h-6 w-6" />
                  </div>
                  <CardTitle>Growers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Commercial and hobby growers interested in testing cutting-edge automation for their hydroponic
                    systems.
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    Join our beta program to help shape the future of agricultural technology and get early access to
                    our innovative solutions.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 sm:mt-10 p-4 sm:p-6 bg-background rounded-xl shadow-sm border">
              <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
                <div className="md:w-1/4 flex justify-center">
                  <div className="inline-flex h-14 sm:h-16 w-14 sm:w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Users className="h-7 sm:h-8 w-7 sm:w-8" />
                  </div>
                </div>
                <div className="md:w-3/4 text-center md:text-left">
                  <h3 className="text-xl font-bold">Ready to Join Our Beta Program?</h3>
                  <p className="mt-2 text-muted-foreground">
                    We're currently accepting applications from researchers, educational institutions, and growers
                    interested in testing our technology and providing feedback.
                  </p>
                  <Button
                    className="mt-3 sm:mt-4"
                    onClick={() => {
                      const betaButton = document.getElementById("beta-form-button")
                      if (betaButton) {
                        betaButton.scrollIntoView({ behavior: "smooth" })
                        betaButton.focus()
                        betaButton.classList.add("animate-pulse")
                        setTimeout(() => betaButton.classList.remove("animate-pulse"), 2000)
                      }
                    }}
                  >
                    Apply to Beta Program
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="py-8 sm:py-10 md:py-16 bg-muted/50">
          <div className="container px-4 sm:px-6 md:px-8">
            <SectionHeading
              icon={<Lightbulb className="h-5 w-5" />}
              badge="Our Solutions"
              title="Cutting-Edge Agricultural Technology"
              description="Our innovative solutions combine IoT, AI, and precision agriculture to revolutionize farming"
            />
            <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="inline-flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
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
                      className="h-5 sm:h-6 w-5 sm:w-6"
                      aria-hidden="true"
                    >
                      <path d="M12 22v-5" />
                      <path d="M9 7V2" />
                      <path d="M15 7V2" />
                      <path d="M6 13V" />
                      <path d="M9 7V2" />
                      <path d="M15 7V2" />
                      <path d="M6 13V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3Z" />
                      <path d="M9 17v5" />
                      <path d="M15 17v5" />
                    </svg>
                  </div>
                  <CardTitle>Simple Farm Automation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Easy-to-use controls that handle watering, lighting, and plant care automatically - no technical
                    expertise needed
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="inline-flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
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
                      className="h-5 sm:h-6 w-5 sm:w-6"
                      aria-hidden="true"
                    >
                      <path d="M12 2v8" />
                      <path d="m4.93 10.93 1.41 1.41" />
                      <path d="M2 18h2" />
                      <path d="M20 18h2" />
                      <path d="m19.07 10.93-1.41 1.41" />
                      <path d="M22 22H2" />
                      <path d="m16 6-4 4-4-4" />
                      <path d="M16 18a4 4 0 0 0-8 0" />
                    </svg>
                  </div>
                  <CardTitle>Smart Growing Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Monitor plant health and growing conditions with easy-to-understand reports (AI-powered insights
                    coming soon!)
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="inline-flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
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
                      className="h-5 sm:h-6 w-5 sm:w-6"
                      aria-hidden="true"
                    >
                      <path d="M9 12h.01" />
                      <path d="M15 12h.01" />
                      <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
                      <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1s.4-1 1-1c.4 0 .5.2.5.5" />
                    </svg>
                  </div>
                  <CardTitle>Home Growing Automation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Turn your existing hydroponic or vertical garden into a self-managing system with our easy add-on
                    automation
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="inline-flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
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
                      className="h-5 sm:h-6 w-5 sm:w-6"
                      aria-hidden="true"
                    >
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                    </svg>
                  </div>
                  <CardTitle>Custom Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Need something specific? We'll build custom automation controls tailored to your unique growing
                    needs
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8 sm:mt-10">
              <Tabs defaultValue="automation" value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 relative">
                  <TabsTrigger value="automation">Automation</TabsTrigger>
                  <TabsTrigger value="precision">Precision</TabsTrigger>
                  <TabsTrigger value="hydroponic">Hydroponic</TabsTrigger>
                  <TabsTrigger value="analytics">Custom Solutions</TabsTrigger>
                  {!userInteracted && (
                    <div
                      ref={tabIndicatorRef}
                      className={`tab-indicator ${userInteracted ? "tab-indicator-paused" : ""}`}
                    ></div>
                  )}
                </TabsList>
                <div
                  className={`mt-4 sm:mt-6 overflow-hidden relative ${isAnimating ? "pointer-events-none" : ""}`}
                  style={{ minHeight: "400px" }}
                >
                  <div
                    className={`transition-all duration-500 absolute w-full ${isAnimating ? "translate-x-[-100%] opacity-0" : "translate-x-0 opacity-100"}`}
                    style={{ transformOrigin: "center" }}
                  >
                    <TabsContent value="automation" className="m-0 relative">
                      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 items-center">
                        <div className="relative rounded-xl overflow-hidden">
                          <div className="aspect-video w-full h-[250px] sm:h-[300px] md:h-[350px]">
                            <Image
                              src="/precision.jpg?height=600&width=800"
                              alt="Simple Farm Automation system by Ufarms"
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-cover solution-image"
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                          <h3 className="text-xl sm:text-2xl font-bold">Simple Farm Automation</h3>
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Our easy-to-use system takes care of your plants automatically. Just set it up once, and it
                            handles watering, lighting, and climate control without you having to worry. Perfect for
                            busy people who want fresh produce without the hassle.
                          </p>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>Set-and-forget climate control - no daily adjustments needed</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>Water-saving irrigation that knows exactly when plants need water</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>Simple mobile app that even non-tech people can use easily</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="precision" className="m-0 relative">
                      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 items-center">
                        <div className="relative rounded-xl overflow-hidden">
                          <div className="aspect-video w-full h-[250px] sm:h-[300px] md:h-[350px]">
                            <Image
                              src="/precise.jpg?height=600&width=800"
                              alt="Smart Growing Insights dashboard by Ufarms"
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-cover solution-image"
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                          <h3 className="text-xl sm:text-2xl font-bold">Smart Growing Insights</h3>
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Know exactly how your plants are doing with easy-to-understand reports. Our system monitors
                            everything important and tells you in simple terms what's happening with your garden.
                            Advanced AI-powered insights and predictive analysis coming soon!
                          </p>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>Simple plant health updates in everyday language</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>Early warnings when something needs attention</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>Harvest predictions so you know when food will be ready</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="hydroponic" className="m-0 relative">
                      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 items-center">
                        <div className="relative rounded-xl overflow-hidden">
                          <div className="aspect-video w-full h-[250px] sm:h-[300px] md:h-[350px]">
                            <Image
                              src="/precision.jpg?height=600&width=800"
                              alt="Home Growing Automation system by Ufarms"
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-cover solution-image"
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                          <h3 className="text-xl sm:text-2xl font-bold">Home Growing Automation</h3>
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Already have a hydroponic or vertical garden? Our automation system can be added to your
                            existing setup, turning manual tasks into automatic ones. Enjoy the benefits of home-grown
                            food without the daily maintenance.
                          </p>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>Easy installation with most popular home growing systems</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>Uses 90% less water than traditional gardening</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>Grow fresh food year-round, regardless of weather</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="analytics" className="m-0 relative">
                      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 items-center">
                        <div className="relative rounded-xl overflow-hidden">
                          <div className="aspect-video w-full h-[250px] sm:h-[300px] md:h-[350px]">
                            <Image
                              src="/placeholder.svg?height=600&width=800"
                              alt="Custom Farming Solutions by Ufarms"
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-cover solution-image"
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                          <h3 className="text-xl sm:text-2xl font-bold">Custom Solutions</h3>
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Have a unique growing challenge? As an agile startup, we can create custom automation
                            solutions tailored specifically to your needs. If you can't find it elsewhere, we'll build
                            it for you.
                          </p>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>Personalized consultation to understand your specific needs</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>Custom-built controls for unique growing environments</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>Ongoing support from our dedicated startup team</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </div>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-8 sm:py-10 md:py-16 bg-primary/5">
          <div className="container px-4 sm:px-6 md:px-8">
            <SectionHeading
              icon={<Trophy className="h-5 w-5" />}
              badge="Our Achievements"
              title="Recognition & Milestones"
              description="Our journey of growth and innovation has been recognized by leading institutions in the UK"
            />

            <div className="mt-4 sm:mt-6 max-w-3xl mx-auto text-center mb-8">
              <p className="text-muted-foreground">
                At Ufarms, we're proud of the recognition we've received for our innovative approach to agricultural
                technology. These achievements reflect our commitment to developing sustainable farming solutions that
                address real-world challenges.
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-background/80 backdrop-blur hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                    <Award className="h-6 w-6" />
                  </div>
                  <CardTitle>Santander X UK Awards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Recognized as one of the top 100 innovative startups in the prestigious Santander X UK Awards.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/80 backdrop-blur hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                    <Rocket className="h-6 w-6" />
                  </div>
                  <CardTitle>STAC Accelerator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Selected for the STAC Accelerator cohort 4, providing mentorship and resources to scale our
                    technology.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/80 backdrop-blur hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                    <Building className="h-6 w-6" />
                  </div>
                  <CardTitle>University of Glasgow</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Incubated at the University of Glasgow, leveraging academic expertise and research facilities.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/80 backdrop-blur hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                    <Star className="h-6 w-6" />
                  </div>
                  <CardTitle>Tech Scaler Program</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Selected for the Tech Scaler Program, supporting our growth with resources, mentorship, and
                    networking opportunities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-8 sm:py-10 md:py-16 bg-muted/30">
          <div className="container px-4 sm:px-6 md:px-8">
            <SectionHeading
              icon={<Mail className="h-5 w-5" />}
              badge="Get in Touch"
              title="Contact Us"
              description="Have questions about our technology or want to join our beta testing program? Reach out to us."
            />

            <div className="mt-8 sm:mt-10 grid gap-6 sm:gap-8 md:grid-cols-2">
              <div className="bg-background rounded-xl p-6 sm:p-8 shadow-sm border">
                <div className="text-center mb-6">
                  <div className="inline-flex h-14 sm:h-16 w-14 sm:w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <Mail className="h-7 sm:h-8 w-7 sm:w-8" />
                  </div>
                  <h3 className="text-xl font-bold">Get in Touch</h3>
                  <p className="text-muted-foreground mt-2">
                    We'd love to hear from you! Reach out to discuss how our technology can help your growing needs.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button className="flex-1" asChild>
                    <a href="mailto:hello@ufarms.io">
                      <Send className="h-4 w-4 mr-2" />
                      Contact Us Now
                    </a>
                  </Button>
                  <Button id="beta-form-button" className="flex-1 bg-primary" asChild>
                    <a
                      href="#beta-form"
                      onClick={(e) => {
                        e.preventDefault()
                        alert(
                          "Google Form will be linked here. This button will redirect to your form once it's created.",
                        )
                      }}
                    >
                      <Beaker className="h-4 w-4 mr-2" />
                      Join Beta Program
                    </a>
                  </Button>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <div className="bg-background rounded-xl p-5 sm:p-6 shadow-sm border">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                      <p className="text-muted-foreground mb-2 text-sm">For general inquiries and support</p>
                      <a href="mailto:hello@ufarms.io" className="text-primary hover:underline">
                        hello@ufarms.io
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-background rounded-xl p-5 sm:p-6 shadow-sm border">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                      <p className="text-muted-foreground mb-2 text-sm">Monday to Friday, 9am to 5pm</p>
                      <a href="tel:+447447146002" className="text-primary hover:underline">
                        +44 7447 146002
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-background rounded-xl p-5 sm:p-6 shadow-sm border">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Visit Us</h3>
                      <p className="text-muted-foreground mb-2 text-sm">Our office location</p>
                      <address className="not-italic text-sm">
                        Ufarms.io Ltd.
                        <br />
                        Clyde Offices 2nd Floor
                        <br />
                        48 West George Street, Glasgow G2 1BP
                      </address>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer with SEO-friendly links */}
      <footer className="bg-black text-white py-8 border-t border-gray-800">
        <div className="container px-4 sm:px-6 md:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Ufarms UK</span>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Empowering sustainable farming with automation and AI technology.
              </p>
              <p className="text-sm text-gray-300">© {new Date().getFullYear()} Ufarms UK. All rights reserved.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#about"
                    className="text-sm text-gray-300 hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("about")
                    }}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="text-sm text-gray-300 hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("features")
                    }}
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#achievements"
                    className="text-sm text-gray-300 hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("achievements")
                    }}
                  >
                    Achievements
                  </Link>
                </li>
                <li>
                  <Link
                    href="#solutions"
                    className="text-sm text-gray-300 hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("solutions")
                    }}
                  >
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    href="#beta-program"
                    className="text-sm text-gray-300 hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("beta-program")
                    }}
                  >
                    Beta Program
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="text-sm text-gray-300 hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("contact")
                    }}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:hello@ufarms.io" className="text-sm text-gray-300 hover:text-primary">
                    hello@ufarms.io
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href="tel:+447447146002" className="text-sm text-gray-300 hover:text-primary">
                    +44 7447 146002
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm text-gray-300">Glasgow, UK</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-400">
              Ufarms UK is committed to sustainable farming practices and reducing the environmental impact of food
              production.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

