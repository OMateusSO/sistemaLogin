"use client";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "./Button";

const Nav = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="top-0 left-0 w-full z-50 bg-blue-700 p-4">
      {session ? (
        <LoggedInNav
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          signOut={signOut}
        />
      ) : (
        <LoggedOutNav
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      )}
    </nav>
  );
};

const LoggedInNav = ({ isMobileMenuOpen, setIsMobileMenuOpen, signOut }) => (
  <div>
    <div className="flex items-center justify-between">
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
        <Button
          text="Sair"
          className="bg-red-600 text-white rounded px-3 py-2 cursor-pointer"
          onClick={() => signOut()}
        />
      </div>
    </div>
    <div className={`menu-mobile ${isMobileMenuOpen ? "open" : ""}`}>
      <p
        className="absolute left-0 top-0 text-white text-3xl"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        X
      </p>
      <div className="flex mx-20 my-2 gap-4 mt-6 text-2xl brightness-200 drop-shadow contrast-200 text-center flex-col">
        <p className="text-red-600 cursor-pointer" onClick={() => signOut()}>
          Sair
        </p>
      </div>
    </div>
  </div>
);

const LoggedOutNav = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => (
  <div className="flex items-center justify-between">
    <Link href="/" className="text-white text-2xl">
      Home
    </Link>
    <button
      className="md:hidden text-3xl text-white"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    >
      ☰
    </button>

    <div className="hidden md:flex sm:flex-row items-end sm:ml-auto sm:w-auto sm:mt-0">
      <div className="m-1">
        <Link href="/cadastrar" className="text-white text-2xl">
          Cadastrar
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

    <div className={`menu-mobile ${isMobileMenuOpen ? "open" : ""}`}>
      <p
        className="absolute left-0 top-0 text-white text-3xl"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        X
      </p>
      <div className="flex flex-col justify-center items-center mx-20 mt-6 text-2xl text-center brightness-200 drop-shadow contrast-200">
        <div className="m-2">
          <Link href="/login" className="text-white text-2xl">
            Login
          </Link>
        </div>
        <div className="m-2">
          <Link href="/cadastrar" className="text-white text-2xl">
            Cadastrar
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Nav;
