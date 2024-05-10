"use client";
import { Formik, Form } from "formik";
import { React, useState, useEffect } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Register() {
  const [error, setError] = useState("");
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated"){
      router.push("/home");
    }
  }, [status, router]);

  if (status !== "unauthenticated"){
    return null;
  }

  const initialValues = {
    nome: "",
    email: "",
    password: "",
  }

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
      await fetch("/api/auth/register", {
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
        const result = await res.json()

        if (result.status === 201) {
          alert(result.message);
          //crio a conta
          router.push("/login");
        } else {
          renderError(result.message);
          resetForm();
        }

        setFormSubmitting(false);
      })
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
    <main className="min-h-screen flex items-center justify-center">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form
            noValidate
            className="flex flex-col gap-2 p-4 border border-zinc-300 rounded min-w-[300px] bg-white"
          >
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
              text={isFormSubmitting ? "Carregando..." : "Inscrever-se"}
              disabled={isFormSubmitting}
              className="bg-blue-600 text-white rounded p-2 cursor-pointer"
            />
            {!values.nome && !values.email && !values.password && error && (
              <span className="text-red-500 text-sm text-center">{error}</span>
            )}
            <span className="text-xs text-zinc-500">
              Já possui conta?
              <strong className="text-zinc-700 cursor-pointer">
                <Link href="/login"> Fazer login</Link>
              </strong>
            </span>
          </Form>
        )}
      </Formik>
    </main>
  );
}