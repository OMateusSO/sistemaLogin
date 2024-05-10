"use client";
import React from 'react'
import LayoutAdmin from "@/components/LayoutAdmin";
import Nav from '@/components/Nav';
import { signOut, useSession } from "next-auth/react";



export default function Home() {
  const { status, data: session } = useSession();

  if (status !== "authenticated"){
    return null;
  }
  console.log(session);
  return (
    <LayoutAdmin>
      <Nav/>
      <main className="min-h-screen flex justify-center pt-6">
        <span>{`olá ${session?.user?.email}`}</span>
      </main>
  </LayoutAdmin>
  )
}
