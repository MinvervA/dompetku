import { ArrowLeftRight, LayoutDashboard, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Transaksi", icon: ArrowLeftRight, path: "/transactions" },
  { label: "Pengaturan", icon: Settings, path: "/settings" },
];

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="">
          <div className="px-1.5 flex w-full items-center gap-2">
            <div className="p-2.5 bg-[#6ee7b7] rounded-md">💰</div>
            <div className="text-3xl font-bold">Dompetku</div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <NavLink to={item.path} end={item.path === "/"}>
                {({ isActive }) => (
                  <SidebarMenuButton
                    isActive={isActive}
                    className={
                      isActive ? "font-bold border-gray-200 border" : ""
                    }
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};
