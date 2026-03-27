import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export const MainLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 items-center border-b px-10 sticky top-0 bg-white z-50 transition-shadow">
            <SidebarTrigger />
          </header>
          <main className="flex-1 px-4 w-full mx-auto max-w-7xl">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
