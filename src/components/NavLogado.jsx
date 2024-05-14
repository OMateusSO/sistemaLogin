"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "./Button";


export default function NavLogado() {
  const { status, data: session } = useSession();
  
  if (status !== "authenticated") {
    return null;
  }
  

  return (
    <div className="hidden flex-col flex-wrap md:flex bg-black">
      <div className="flex flex-col mx-2 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <Link href="/home" className="text-white text-2xl">Home</Link>
        <div className="ml-auto flex gap-4 w-full space-x-2 sm:justify-end">
          <div className="">
            <Button
              text="Sair"
              className="bg-red-600 text-white rounded mt-1 px-3 cursor-pointer"
              onClick={() => signOut()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}