"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useSignUp } from "../hooks/useSignUp";
import { BaseCard } from "./BaseCard";
import { CardFooter } from "./CardFooter";

type Props = {};
export function SignUpCard({}: Props) {
  const { mutate, isPending, error } = useSignUp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    mutate(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          signIn("credentials", { email, password, redirectTo: "/" });
        },
      }
    );
  }

  function onProviderSignUp(provider: "google" | "github") {
    signIn(provider, { callbackUrl: "/" });
  }
  return (
    <BaseCard title="Create an account">
      {!!error && (
        <div className="text-red-500 text-sm bg-red-100 p-2 rounded flex gap-2 items-center">
          <BsExclamationCircle />
          {error.message}
        </div>
      )}
      <form onSubmit={onSignUp} className="space-y-2.5">
        <Input
          disabled={isPending}
          type="text"
          value={name}
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-white text-gray-900"
        />
        <Input
          disabled={isPending}
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white text-gray-900"
        />
        <Input
          disabled={isPending}
          required
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white text-gray-900"
          minLength={3}
          maxLength={20}
        />
        <Button disabled={isPending} type="submit" size="lg" className="w-full">
          Sign Up
        </Button>
      </form>
      <Separator className="bg-gray-200/10 my-2" />
      <Button
        disabled={isPending}
        className="gap-2"
        size="lg"
        onClick={() => onProviderSignUp("github")}
      >
        <FaGithub />
        Log in with GitHub
      </Button>
      <Button
        disabled={isPending}
        className="gap-2"
        size="lg"
        onClick={() => onProviderSignUp("google")}
      >
        <FcGoogle />
        Log in with Google
      </Button>

      <CardFooter
        text="Already have an account?"
        href="/sign-in"
        buttonText="Sign in"
      />
    </BaseCard>
  );
}
