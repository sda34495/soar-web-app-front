import Sidebar from "@/components/Sidebar";
import AdminLayout from "./components/AdminLayout";



export default function Layout({
  children,
  
}: Readonly<{
  children: React.ReactNode;
  
}>) {
  return (
    <>
      <AdminLayout>{children}</AdminLayout>
    </>
  );
}
