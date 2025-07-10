import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex">
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>Header</SidebarHeader>
            <SidebarContent>First content</SidebarContent>
          </Sidebar>
        </SidebarProvider>
        {children}
      </div>
    </>
  );
}
