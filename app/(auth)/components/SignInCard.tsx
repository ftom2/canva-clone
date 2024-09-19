"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BaseCard } from "./BaseCard";
import { CardFooter } from "./CardFooter";

type Props = {};
export function SignInCard({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const params = useSearchParams();

  const error = params.get("error");

  function onSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  }
  function onProviderSignIn(provider: "google" | "github") {
    signIn(provider, { callbackUrl: "/" });
  }
  return (
    <BaseCard title="Login">
      {!!error && (
        <div className="text-red-500 text-sm bg-red-100 p-2 rounded flex gap-2 items-center">
          <BsExclamationCircle />
          Invalid Email or Password
        </div>
      )}
      <form onSubmit={onSignIn} className="space-y-2.5">
        <Input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white text-gray-900"
        />
        <Input
          required
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white text-gray-900"
        />
        <Button type="submit" size="lg" className="w-full">
          Sign In
        </Button>
      </form>
      <Separator className="bg-gray-200/10 my-2" />
      <Button
        className="gap-2"
        size="lg"
        onClick={() => onProviderSignIn("github")}
      >
        <FaGithub />
        Log in with GitHub
      </Button>
      <Button
        className="gap-2"
        size="lg"
        onClick={() => onProviderSignIn("google")}
      >
        <FcGoogle />
        Log in with Google
      </Button>
      <CardFooter
        text="Don't have an account?"
        href="/sign-up"
        buttonText="Sign up"
      />
    </BaseCard>
  );
}
