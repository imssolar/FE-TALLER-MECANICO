import { Outlet } from "react-router";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./Sidebar";
import { Header } from "./Header";
import { SessionModal } from "@/components/shared/SessionModal";
import { useSessionTimer } from "@/hooks/use-session-timer";
import { useAuth } from "@/hooks/use-auth";
import { SESSION_CONFIG } from "@/constants/session";

export function DefaultLayout() {
  const { logout, refreshToken } = useAuth();

  const { showModal, remainingTime, resetTimer } = useSessionTimer({
    timeInSeconds: SESSION_CONFIG.WARNING_TIME,
  });

  const handleRefreshToken = async () => {
    try {
      await refreshToken();
      resetTimer();
    } catch {
      logout();
    }
  };

  return (
    <SidebarProvider>
      <SessionModal
        isOpen={showModal}
        remainingSeconds={SESSION_CONFIG.WARNING_BEFORE + remainingTime}
        onRefreshToken={handleRefreshToken}
        onLogout={logout}
      />
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
