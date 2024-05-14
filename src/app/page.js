"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Nav from "@/components/Nav";    <main>
<Nav/>
<div className="min-h-screen flex justify-center pt-6">
  sobre
</div>
</main>

export default function Index() {
  const router = useRouter();

  return (
    <main>
      <Nav/>
      <div className="min-h-screen flex justify-center pt-6">
        <Button
          text="Login"
          onClick={() => router.push("/login")}
          className="bg-blue-600 text-white rounded p-2 mr-2 cursor-pointer"
        />
        <Button
          text="Registrar"
          onClick={() => router.push("/register")}
          className="bg-blue-600 text-white rounded p-2 cursor-pointer"
        />
      </div>
    </main>
  );
}
