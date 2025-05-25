import * as React from 'react'
import Link from 'next/link'
import { GalleryVerticalEnd } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { NavMain } from '@/components/nav-main'
import { SearchForm } from '@/components/search-form'
import { SidebarOptInForm } from '@/components/sidebar-opt-in-form'

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Pinned',
      url: '#',
      items: [
        {
          title: 'HTML ⇄ JSX',
          url: '/tools/transformations/html-jsx',
        },
        {
          title: 'Code Transformations',
          url: '/tools/transformations',
        },
      ],
    },
    {
      title: 'Tools',
      url: '#',
      items: [
        {
          title: 'JSON Tools',
          url: '/tools/json-tools',
        },
        {
          title: 'Date & Time Utilities',
          url: '/tools/datetime-tools',
        },
        {
          title: 'Text Manipulation',
          url: '/tools/text-manipulation',
        },
        {
          title: 'UUID & Random Generators',
          url: '/tools/uuid-generators',
        },
        {
          title: 'JWT Decoder',
          url: '/tools/jwt-decoder',
        },
        {
          title: 'Code Transformations',
          url: '/tools/transformations',
        },
        {
          title: 'Cryptographic Utilities',
          url: '/tools/crypto-utilities',
        },
        {
          title: 'Data Format Converters',
          url: '/tools/data-converters',
        },
        {
          title: 'Encoders & Decoders',
          url: '/tools/encoders-decoders',
        },
        {
          title: 'Diff Checker',
          url: '/tools/text-diff',
        },
        {
          title: 'IP & Network Utilities',
          url: '/tools/network-utilities',
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Creight Utils</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive || false}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
