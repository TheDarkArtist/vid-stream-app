import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import Containter from "./_components/containter";

interface CreatorLayoutProps {
  params: {
    username: string;
  };
  children: React.ReactNode;
}

const CreatorLayout = async ({
  params,
  children,
}: CreatorLayoutProps) => {
  const { username } = await params;

  const self = await getSelfByUsername(username);

  if (!self) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-16">
        <Sidebar />
        <Containter>{children}</Containter>
      </div>
    </>
  );
};

export default CreatorLayout;
