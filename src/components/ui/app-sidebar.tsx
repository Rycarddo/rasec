"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ModeToggle } from "../ui/modetoggle";
import { ThemeProvider } from "../ui/theme-provider";
import { Settings, Users, ChartLine } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row justify-between mt-2 mb-4">
        <h2 className="text-lg font-semibold px-4 py-2 ">RASEC</h2>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mt-1 mr-3">
            <ModeToggle />
          </div>
        </ThemeProvider>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Users className="mr-2 h-4 w-4" />
              Controle BCO's
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton>
              <ChartLine className="mr-2 h-4 w-4" />
              Dashboard (Em construção...)
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="mr-2 h-4 w-4" />
              Configurações (Em construção...)
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
