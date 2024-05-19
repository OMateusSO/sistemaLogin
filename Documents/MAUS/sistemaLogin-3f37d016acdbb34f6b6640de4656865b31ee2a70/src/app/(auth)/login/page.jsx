"use client";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import * as Yup from "yup";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";

export default function Login() {
  const [error, setError] = useState("");
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status, router]);

  if (status !== "unauthenticated") {
    return null;
  }

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Digite um e-mail válido")
      .required("O campo e-mail é obrigatório"),
    password: Yup.string().required("O campo senha é obrigatório"),
  });

  async function handleSubmit(values, { resetForm }) {
    setFormSubmitting(true);
    try {
      signIn("Credentials", { ...values, redirect: false }).then(
        ({ error }) => {
          if (!error) {
            router.push("/home");
          } else {
            readerError(error.replace("Error: ", ""));
            resetForm();
          }
          setFormSubmitting(false);
        }
      );
    } catch (error) {
      setFormSubmitting(false);
      readerError("Erro ao fazer login, tente novamente mais tarde!");
    }
  }

  function readerError(msg) {
    setError(msg);
    setTimeout(() => {
      setError("");
    }, 3000);
  }

  return (
    <main className="flex flex-col min-h-screen bg-gray-100">
      <Nav />
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form noValidate className="space-y-4">
                <Input name="email" type="email" required />
                <Input
                  name="password"
                  type="password"
                  required
                  autoComplete="off"
                />
                <Button
                  type="submit"
                  text={isFormSubmitting ? "Carregando..." : "Entrar"}
                  disabled={isFormSubmitting}
                  className={`w-full bg-blue-600 text-white rounded p-2 cursor-pointer ${
                    isFormSubmitting ? "opacity-50" : ""
                  }`}
                />
                {!values.email && !values.password && error && (
                  <span className="text-red-500 text-sm text-center">
                    {error}
                  </span>
                )}
                <div className="text-xs text-gray-500 text-center mt-4">
                  Não possui conta?
                  <Link href="/cadastrar" className="text-blue-600 font-bold ml-1">
                    Inscreva-se
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
}
