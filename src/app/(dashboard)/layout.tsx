import Sidebar from "@/components/Sidebar";
import MainLayout from "./components/DashboardLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainLayout>
        <div className="mx-auto md:mx-0 max-w-[330px] sm:max-w-[500px] md:max-w-[745px] lg:max-w-full">{children}</div>
      </MainLayout>
    </>
  );
}
