import Sidebar from "@/components/Sidebar";
import MainLayout from "./components/DashboardLayout";


export default function Layout({
  children,
  
}: Readonly<{
  children: React.ReactNode;
  
}>) {
  return (
    <>
      <MainLayout>{children}</MainLayout>
    </>
  );
}
