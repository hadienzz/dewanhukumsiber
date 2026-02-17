"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface AccordionContextValue {
  openItems: string[]
  toggle: (value: string) => void
  type: "single" | "multiple"
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined)

interface AccordionProps {
  type?: "single" | "multiple"
  defaultValue?: string | string[]
  children: React.ReactNode
  className?: string
}

export function Accordion({
  type = "single",
  defaultValue,
  children,
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>(() => {
    if (!defaultValue) return []
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
  })

  const toggle = React.useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        if (type === "single") {
          return prev.includes(value) ? [] : [value]
        }
        return prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      })
    },
    [type]
  )

  return (
    <AccordionContext.Provider value={{ openItems, toggle, type }}>
      <div className={cn("w-full", className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function AccordionItem({ value, children, className }: AccordionItemProps) {
  return (
    <div className={cn("border-b", className)} data-value={value}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ itemValue?: string }>, { itemValue: value })
        }
        return child
      })}
    </div>
  )
}

interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
  itemValue?: string
}

export function AccordionTrigger({ children, className, itemValue }: AccordionTriggerProps) {
  const context = React.useContext(AccordionContext)
  if (!context) throw new Error("AccordionTrigger must be used within Accordion")

  const isOpen = itemValue ? context.openItems.includes(itemValue) : false

  return (
    <button
      type="button"
      onClick={() => itemValue && context.toggle(itemValue)}
      className={cn(
        "flex flex-1 w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  )
}

interface AccordionContentProps {
  children: React.ReactNode
  className?: string
  itemValue?: string
}

export function AccordionContent({ children, className, itemValue }: AccordionContentProps) {
  const context = React.useContext(AccordionContext)
  if (!context) throw new Error("AccordionContent must be used within Accordion")

  const isOpen = itemValue ? context.openItems.includes(itemValue) : false

  return (
    <div
      className={cn(
        "overflow-hidden text-sm transition-all",
        isOpen ? "animate-accordion-down" : "animate-accordion-up hidden",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  )
}
