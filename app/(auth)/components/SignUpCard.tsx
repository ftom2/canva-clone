"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BaseCard } from "./BaseCard";
import { CardFooter } from "./CardFooter";

type Props = {};
export function SignUpCard({}: Props) {
  function onProviderSignUp(provider: "google" | "github") {
    signIn(provider, { callbackUrl: "/" });
  }
  return (
    <BaseCard title="Create an account">
      <Button
        className="gap-2"
        variant="outline"
        size="lg"
        onClick={() => onProviderSignUp("github")}
      >
        <FaGithub />
        Log in with GitHub
      </Button>
      <Button
        className="gap-2"
        variant="outline"
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
