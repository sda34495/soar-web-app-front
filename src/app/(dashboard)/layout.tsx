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
        <div className="@container ">
          <div className=" max-w-[340px]  mx-auto md:mx-0  sm:max-w-[500px] md:max-w-[745px] lg:max-w-full">
            {children}
          </div>
        </div>
      </MainLayout>
    </>
  );
}
