"use client";
import React from "react";
import LayoutAdmin from "@/components/LayoutAdmin";
import Nav from "@/components/Nav";
import { useSession } from "next-auth/react";

export default function Home() {
  const { status, data: session } = useSession();
  return (
    <LayoutAdmin>
      <main className="min-h-screen">
        <Nav/>
        <div className="flex justify-center">
          <span>{`Meu DEUS ${session?.user?.email}`}</span>
        </div>
      </main>
    </LayoutAdmin>
  );
}
