"use client";
import Link from "next/link";



export default function Nav() {

  return (
    <div className="hidden flex-col flex-wrap md:flex bg-black">
      <div className="flex flex-col mx-2 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <Link href="/" className="text-white text-2xl">Home</Link>
        <div className="ml-auto flex gap-4 w-full space-x-2 sm:justify-end">
          <div>
            <Link href="/register" className="text-white text-2xl">Register</Link>
          </div>
          <div>
            <Link href="/login" className="text-white text-2xl">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
