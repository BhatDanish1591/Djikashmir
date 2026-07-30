'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from './button'

interface MagneticButtonProps extends ButtonProps {
  magneticStrength?: number
  magneticRadius?: number
}

export function MagneticButton({
  className,
  children,
  magneticStrength = 20, // max pixel displacement
  magneticRadius = 150, // how far away the mouse can be to trigger it
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return
    const { clientX, clientY } = e
    const { width, height, left, top } = buttonRef.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    
    // Calculate distance from center
    const distance = Math.sqrt(middleX * middleX + middleY * middleY)
    
    // Apply displacement only if within magnetic radius
    if (distance < magneticRadius) {
      setPosition({ x: middleX * (magneticStrength / 100), y: middleY * (magneticStrength / 100) })
    }
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      className={cn('relative', className)}
      ref={buttonRef as any}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <Button {...props} className={cn('w-full h-full', className)}>
        {children}
      </Button>
    </motion.div>
  )
}
