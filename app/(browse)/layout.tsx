import Navbar from "@/components/navbar";
import Sidebar, {
  SidebarSkeleton,
} from "@/components/sidebar";
import Containter from "@/components/containter";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Containter>{children}</Containter>
      </div>
    </>
  );
}
