import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export const MainLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <SidebarInset>
          <main className="flex-1 px-4 overflow-auto">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
