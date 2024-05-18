"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Nav from "@/components/Nav";

export default function Index() {
  const router = useRouter();

  return (
    <main className="min-h-screen">
      <Nav />
      <div className="min-h-80 flex items-center justify-center">
        <h1 className="text-6xl">FAZ LOGIN AI AMIGO</h1>
        
      </div>
    </main>
  );
}
