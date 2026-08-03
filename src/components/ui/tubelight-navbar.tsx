import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { LucideIcon } from "lucide-react"
import { cn } from "../../lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  // Use React Router location for active state
  const location = useLocation()
  
  // Find which tab maps to current route, default to first item
  const currentTab = items.find(item => item.url === location.pathname)?.name || items[0].name
  const [activeTab, setActiveTab] = useState(currentTab)
  const [isMobile, setIsMobile] = useState(false)

  // Sync activeTab if location changes outside of clicking
  useEffect(() => {
    setActiveTab(currentTab)
  }, [currentTab])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-4 lg:top-0 left-1/2 -translate-x-1/2 z-[100]",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 sm:gap-3 bg-background/5 border border-white/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-4 py-2 sm:px-6 sm:py-2 rounded-full transition-colors",
                "text-white/80 hover:text-primary",
                isActive && "bg-white/10 text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden flex items-center justify-center">
                <Icon size={16} strokeWidth={2} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-10 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-6 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-3 h-3 bg-primary/20 rounded-full blur-sm top-0 left-1.5" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
