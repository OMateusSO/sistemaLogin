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
        <Nav />
        <div className="min-h-80 flex items-center justify-center">
        <h1 className="text-6xl">{`Roubei seu email ${session?.user?.email}`}</h1>
        </div>
      </main>
    </LayoutAdmin>
  );
}