import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background p-3 sm:p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-primary/50">
      <div className="mb-2 sm:mb-3 inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20">
        {icon}
      </div>
      <h3 className="mb-1 text-sm sm:text-base font-bold">{title}</h3>
      <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

