import MainLayout from "./components/DashboardLayout";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>
        <MainLayout>{children}</MainLayout>
      </div>
    </>
  );
}
