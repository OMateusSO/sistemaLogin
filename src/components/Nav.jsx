"use client";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "./Button";
import { useRouter } from "next/navigation";

const Nav = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (status === "loading") {
    // Ainda carregando a sessão, pode mostrar um spinner ou placeholder
    return <div>Carregando...</div>;
  }

  return (
    <nav>
      {session ? (
        // Se estiver logado, mostra o componente de navegação para usuários logados
        <LoggedInNav
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          signOut={signOut}
        />
      ) : (
        // Se não estiver logado, mostra o componente de navegação para visitantes
        <LoggedOutNav />
      )}
    </nav>
  );
};

const LoggedInNav = ({ isMobileMenuOpen, setIsMobileMenuOpen, signOut }) => (
  <div>
    <div className="bg-black p-4 flex items-center justify-between">
      <Link href="/home" className="text-white text-2xl">
        Home
      </Link>
      <button
        className="md:hidden text-3xl text-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        ☰
      </button>
      <div className="hidden md:flex items-center gap-4">
        <Link href="/" className="text-white text-2xl">
          Opções
        </Link>
        <Button
          text="Sair"
          className="bg-red-600 text-white rounded px-3 py-2 cursor-pointer"
          onClick={() => signOut()}
        />
      </div>
    </div>
    <div className={`menu-mobile ${isMobileMenuOpen ? "open" : ""}`}>
      <p
        className="my-2 text-white text-3xl"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        X
      </p>
      <div className="flex mx-20 my-2 gap-4 text-2xl brightness-200 drop-shadow contrast-200 text-center flex-col">
        <p className=" text-white">Opções</p>
        <p className="text-red-600 cursor-pointer" onClick={() => signOut()}>
          Sair
        </p>
      </div>
    </div>
  </div>
);

const LoggedOutNav = () => (
  <div className="flex items-center justify-between bg-black p-4">
    <Link href="/" className="text-white text-2xl">
      Home
    </Link>
    <div className="flex sm:flex-row items-end sm:ml-auto sm:w-auto sm:mt-0">
      <div className="m-1">
        <Link href="/register" className="text-white text-2xl">
          Register
        </Link>
      </div>
      <div className="m-1">
        <p className="text-white text-2xl">|</p>
      </div>
      <div className="m-1">
        <Link href="/login" className="text-white text-2xl">
          Login
        </Link>
      </div>
    </div>
  </div>
);

export default Nav;
