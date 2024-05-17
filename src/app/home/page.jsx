"use client";
import React from 'react'
import LayoutAdmin from "@/components/LayoutAdmin";
import Nav from '@/components/Nav';
import { useSession } from "next-auth/react";


export default function Home() {
  const { status, data: session } = useSession();
  return (
    <LayoutAdmin>
      <Nav/>
      <main className="min-h-screen flex justify-center pt-6">
        <span>{`Meu DEUS ${session?.user?.email}`}</span>
      </main>
  </LayoutAdmin>
  )
}
