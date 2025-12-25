'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { cn } from '@/lib/utils'

// Drawer rebuilt on Radix Dialog to avoid the old vaul peer constraint.
const Drawer = Dialog.Root
const DrawerTrigger = Dialog.Trigger
const DrawerPortal = Dialog.Portal
const DrawerClose = Dialog.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
  <Dialog.Overlay
    ref={ref}
    data-slot="drawer-overlay"
    className={cn(
      'fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
))
DrawerOverlay.displayName = 'DrawerOverlay'

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  React.ComponentPropsWithoutRef<typeof Dialog.Content> & { side?: 'bottom' | 'top' | 'left' | 'right' }
>(({ className, children, side = 'bottom', ...props }, ref) => {
  const sideClasses: Record<string, string> = {
    bottom: 'inset-x-0 bottom-0 mt-24 max-h-[80vh] rounded-t-lg border-t data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
    top: 'inset-x-0 top-0 mb-24 max-h-[80vh] rounded-b-lg border-b data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top',
    left: 'inset-y-0 left-0 w-3/4 sm:max-w-sm rounded-r-lg border-r data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
    right: 'inset-y-0 right-0 w-3/4 sm:max-w-sm rounded-l-lg border-l data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
  }

  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <Dialog.Content
        ref={ref}
        data-slot="drawer-content"
        className={cn(
          'fixed z-50 flex h-auto flex-col bg-background shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out',
          sideClasses[side],
          className,
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full sm:block" />
        {children}
      </Dialog.Content>
    </DrawerPortal>
  )
})
DrawerContent.displayName = 'DrawerContent'

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn('flex flex-col gap-0.5 p-4 md:gap-1.5', className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  )
}

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    data-slot="drawer-title"
    className={cn('text-foreground font-semibold', className)}
    {...props}
  />
))
DrawerTitle.displayName = 'DrawerTitle'

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    data-slot="drawer-description"
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
))
DrawerDescription.displayName = 'DrawerDescription'

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
