'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from './button'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  serviceName?: string
}

export function BookingModal({ isOpen, onClose, serviceName }: BookingModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-lg overflow-hidden rounded-[2rem] bg-zinc-950 p-8 shadow-2xl border border-white/10 pointer-events-auto relative"
            >
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <X className="size-5" />
              </button>

              <div className="mb-8 text-center w-full">
                <h2 className="font-display text-3xl font-bold text-white">Book a Service</h2>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); alert('Booking submitted successfully!')}}>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">Full name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">Email</label>
                  <input 
                    type="email" 
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">Phone</label>
                  <input 
                    type="tel" 
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Preferred date</label>
                    <input 
                      type="date" 
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Service type</label>
                    <select 
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors appearance-none"
                      defaultValue={serviceName || ""}
                    >
                      <option value="" disabled className="bg-zinc-900 text-zinc-400">Select an option</option>
                      <option value="Wedding Shoots" className="bg-zinc-900 text-white">Wedding Shoots</option>
                      <option value="Event Coverage" className="bg-zinc-900 text-white">Event Coverage</option>
                      <option value="Real Estate" className="bg-zinc-900 text-white">Real Estate</option>
                      <option value="Survey & Mapping" className="bg-zinc-900 text-white">Survey & Mapping</option>
                      <option value="Industrial Inspection" className="bg-zinc-900 text-white">Industrial Inspection</option>
                      <option value="Agriculture" className="bg-zinc-900 text-white">Agriculture</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">Details</label>
                  <textarea 
                    required
                    rows={3}
                    placeholder="Tell us more about your project or issue..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full h-12 rounded-xl text-base shadow-lg shadow-primary/25">
                    Submit Request
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
