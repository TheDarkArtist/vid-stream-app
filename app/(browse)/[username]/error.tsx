"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="mt-40 flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <p className="px-4 text-center">Something went wrong</p>
      <Button
        variant="secondary"
        asChild
      >
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
