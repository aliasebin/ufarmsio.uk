import type { ReactNode } from "react"

interface SectionHeadingProps {
  icon?: ReactNode
  badge: string
  title: string
  description?: string
  centered?: boolean
}

export function SectionHeading({ icon, badge, title, description, centered = true }: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col ${centered ? "items-center justify-center text-center" : "items-start"} space-y-2 sm:space-y-4`}
    >
      <div className="inline-flex items-center rounded-full border px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-semibold">
        {icon && <span className="mr-1.5 sm:mr-2">{icon}</span>}
        <span className="text-primary">{badge}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">{title}</h2>
      {description && (
        <p className={`${centered ? "max-w-[700px]" : ""} text-base sm:text-lg text-muted-foreground`}>{description}</p>
      )}
    </div>
  )
}

