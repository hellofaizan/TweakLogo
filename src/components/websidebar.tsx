import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import Image from "next/image"
  
  export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader className="flex flex-row items-center gap-2">
            <Image src="/logos/logo.svg" alt="logo" width={32} height={32} />
            <h1 className='text-2xl font-bold'>Logo</h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }