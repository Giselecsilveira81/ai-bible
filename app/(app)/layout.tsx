import TabBar from "@/components/TabBar";
import Sidebar from "@/components/Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-paper min-h-screen">
      <Sidebar />
      <div className="lg:ml-64 pb-20 lg:pb-0">{children}</div>
      <TabBar />
    </div>
  );
}
