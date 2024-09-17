"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BaseCard } from "./BaseCard";
import { CardFooter } from "./CardFooter";

type Props = {};
export function SignInCard({}: Props) {
  function onProviderSignIn(provider: "google" | "github") {
    signIn(provider, { callbackUrl: "/" });
  }
  return (
    <BaseCard title="Login">
      <Button
        className="gap-2"
        variant="outline"
        size="lg"
        onClick={() => onProviderSignIn("github")}
      >
        <FaGithub />
        Log in with GitHub
      </Button>
      <Button
        className="gap-2"
        variant="outline"
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
