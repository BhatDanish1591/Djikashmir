import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  center,
  align,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  center?: boolean
  align?: 'left' | 'center' | 'right'
  className?: string
}) {
  const isCenter = center || align === 'center'
  return (
    <div className={cn('max-w-2xl', isCenter && 'mx-auto text-center', className)}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full bg-cream px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          <span className="size-1.5 rounded-full bg-primary" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tighter text-balance sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-base leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
      )}
    </div>
  )
}
