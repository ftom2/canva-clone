import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SignInCard } from "../components/SignInCard";
import { SignUpCard } from "../components/SignUpCard";

export default async function SignUpPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return <SignUpCard />;
}
