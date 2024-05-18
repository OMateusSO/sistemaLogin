"use client";
import { Formik, Form } from "formik";
import React, { useState, useEffect } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import * as Yup from "yup";
import { useSession } from "next-auth/react"; // Alteração aqui: removi o import de signIn e useNavigation
import Nav from "@/components/Nav";
import { useRouter } from "next/navigation";

export default function Cadastrar() {
  const [error, setError] = useState("");
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/login"); // Use router.push para redirecionar
    }
  }, [status]);

  if (status !== "unauthenticated") {
    return null;
  }

  const initialValues = {
    nome: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("O campo nome é obrigatório"),
    email: Yup.string()
      .email("Digite um e-mail válido")
      .required("O campo e-mail é obrigatório"),
    password: Yup.string().required("O campo senha é obrigatório"),
  });

  async function handleSubmit(values, { resetForm }) {
    setFormSubmitting(true);
    try {
      await fetch("/api/auth/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: values.nome,
          email: values.email,
          password: values.password,
        }),
      }).then(async (res) => {
        const result = await res.json();

        if (result.status === 201) {
          alert(result.message);
          router.push("/login");
        } else {
          renderError(result.message);
          resetForm();
        }

        setFormSubmitting(false);
      });
    } catch (error) {
      setFormSubmitting(false);
      renderError("Erro ao criar conta, tente mais tarde!");
    }
  }

  function renderError(msg) {
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
          <h1 className="text-2xl font-bold text-center mb-4">Cadastro</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form noValidate className="space-y-4">
                <Input name="nome" type="text" placeholder="Nome" required />
                <Input name="email" type="email" placeholder="E-mail" required />
                <Input
                  name="password"
                  type="password"
                  placeholder="Senha"
                  required
                  autoComplete="off"
                />
                <Button
                  type="submit"
                  text={isFormSubmitting ? "Carregando..." : "Cadastrar"}
                  disabled={isFormSubmitting}
                  className={`w-full bg-blue-600 text-white rounded p-2 cursor-pointer ${
                    isFormSubmitting ? "opacity-50" : ""
                  }`}
                />
                {!values.nome && !values.email && !values.password && error && (
                  <span className="text-red-500 text-sm text-center">
                    {error}
                  </span>
                )}
                <div className="text-xs text-gray-500 text-center mt-4">
                  Já possui uma conta?
                  <Link href="/login" className="text-blue-600 font-bold ml-1">
                    Faça login
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
