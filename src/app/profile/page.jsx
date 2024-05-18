"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Substitua o import para next/navigation
import React, { useEffect, useState } from "react";
import LayoutAdmin from "@/components/LayoutAdmin";
import Nav from "@/components/Nav";


export default function Profile() {
  const { data: session, status } = useSession();
  
  const router = useRouter();

  useEffect(() => {}, [session]);



  // Se a sessão estiver carregando ou não houver sessão, exibe uma mensagem de carregamento
  if (status === "loading" || !session) {
    return <div>Carregando...</div>;
  }

  // Extrair nome e email do usuário da sessão
  const { nome, email } = session.user;
  console.log(nome);

  return (
    <LayoutAdmin>
      <Nav></Nav>
      <main className="flex flex-col min-h-screen">
        <div className="flex flex-1 items-center justify-center p-4">
          <div className="flex flex-col gap-4 p-4 border border-zinc-300 rounded bg-white min-w-[300px]">
            <h1>Perfil</h1>
            <p>Nome: {session.user.nome}</p>
            <p>Email: {session.user.email}</p>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
