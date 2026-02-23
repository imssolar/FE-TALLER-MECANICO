import { useLocation } from "react-router";
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  LayoutDashboard,
  Bus,
  Users,
  ClipboardList,
  CircleDot,
  Battery,
  ChevronRight,
  BookOpen,
  Wrench,
} from "lucide-react";

const mainNav = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Buses", href: "/buses", icon: Bus },
  { title: "Empleados", href: "/empleados", icon: Users },
  { title: "Neumáticos", href: "/neumaticos", icon: CircleDot },
  { title: "Baterías", href: "/baterias", icon: Battery },
  { title: "Órdenes de Trabajo", href: "/ordenes-trabajo", icon: ClipboardList },
];

const catalogos = [
  { title: "Terminales", href: "/catalogos/terminales" },
  { title: "Modelos", href: "/catalogos/modelos" },
  { title: "Rutas", href: "/catalogos/rutas" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <SidebarPrimitive>
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <Wrench className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">Taller Mecánico</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.href}
                  >
                    <a href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <BookOpen className="h-4 w-4" />
                      <span>Catálogos</span>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {catalogos.map((item) => (
                        <SidebarMenuSubItem key={item.href}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={location.pathname === item.href}
                          >
                            <a href={item.href}>{item.title}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarPrimitive>
  );
}
