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
      .email("Digite Um e-mail válido")
      .required("O campo e-mail é obrigatorio"),
    password: Yup.string().required("O campo senha é obrigatorio"),
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
      readerError("Erro ao criar conta, tente mais tarde!");
    }
  }

  function readerError(msg) {
    setError(msg);
    setTimeout(() => {
      setError("");
    }, 3000);
  }

  return (
    <main>
      <Nav />
      <div className="min-h-screen flex items-center justify-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form
              noValidate
              className="flex flex-col gap-2 p-4 border border-zinc-300 rounded min-w-[300px] bg-white"
            >
              <Input name="email" type="email" required />
              <Input
                name="password"
                type="password"
                required
                autoComplete="off"
              />
              <Button
                type="submit"
                text={isFormSubmitting ? "Carregando" : "Entrar"}
                disabled={isFormSubmitting}
                className="bg-blue-600 text-white rounded p-2 cursor-pointer"
              />
              {!values.email && !values.password && error && (
                <span className="text-red-500 text-sm text-center">
                  {error}
                </span>
              )}
              <span className="text-xs text-zinc-500">
                Não possui conta?
                <strong className="text-zinc-700 cursor-pointer">
                  <Link href="/register"> Inscreva-se</Link>
                </strong>
              </span>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}
