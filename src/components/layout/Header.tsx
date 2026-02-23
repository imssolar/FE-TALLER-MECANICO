import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "react-router";

const routeNames: Record<string, string> = {
  "/": "Dashboard",
  "/buses": "Buses",
  "/empleados": "Empleados",
  "/neumaticos": "Neumáticos",
  "/baterias": "Baterías",
  "/ordenes-trabajo": "Órdenes de Trabajo",
  "/catalogos/terminales": "Terminales",
  "/catalogos/modelos": "Modelos",
  "/catalogos/rutas": "Rutas",
};

export function Header() {
  const userName = useAuthStore((s) => s.userName);
  const { logout } = useAuth();
  const location = useLocation();

  const currentRoute = routeNames[location.pathname] ?? "Página";
  const isCatalogo = location.pathname.startsWith("/catalogos");

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb className="flex-1">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          {isCatalogo && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Catálogos</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
          {location.pathname !== "/" && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{currentRoute}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
          <span className="hidden text-sm font-medium sm:inline-block">
            {userName}
          </span>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {userName?.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled>
            <User className="mr-2 h-4 w-4" />
            {userName}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
