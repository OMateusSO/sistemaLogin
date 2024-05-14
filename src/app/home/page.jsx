"use client";
import React from 'react'
import LayoutAdmin from "@/components/LayoutAdmin";
import NavLogado from '@/components/NavLogado';
import { useSession } from "next-auth/react";


export default function Home() {
  const { status, data: session } = useSession();
  return (
    <LayoutAdmin>
      <NavLogado/>
      <main className="min-h-screen flex justify-center pt-6">
        <span>{`Meu DEUS ${session?.user?.email}`}</span>
      </main>
  </LayoutAdmin>
  )
}
