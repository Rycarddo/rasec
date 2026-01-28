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
import { Settings, Users, ChartLine } from "lucide-react";
import { DatePicker } from "./date-picker";
import { NavUser } from "./nav-user";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row justify-between mt-2 mb-4">
        <h2 className="text-lg font-semibold px-4 py-2">RASEC</h2>
        <div className="mt-1 mr-3">
          <ModeToggle />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <DatePicker />
        <SidebarMenu aria-label="Menu principal">
          <SidebarMenuItem>
            <SidebarMenuButton aria-label="Controle de BCOs">
              <Users className="mr-2 h-4 w-4" aria-hidden="true" />
              Controle BCO&apos;s
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton disabled aria-label="Dashboard - Em construção">
              <ChartLine className="mr-2 h-4 w-4" aria-hidden="true" />
              Dashboard (Em construção...)
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              disabled
              aria-label="Configurações - Em construção"
            >
              <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
              Configurações (Em construção...)
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <NavUser />
    </Sidebar>
  );
}
