'use client'

import { ComponentPropsWithRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

export interface SidebarNavItemProps extends ComponentPropsWithRef<typeof SidebarMenuItem> {
  title: string
  url: string
}

export const SidebarNavItem = ({ title, url, ...props }: SidebarNavItemProps) => {
  const pathname = usePathname()
  return (
    <SidebarMenuItem {...props}>
      <SidebarMenuButton asChild isActive={pathname === url}>
        <Link href={url}>{title}</Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
