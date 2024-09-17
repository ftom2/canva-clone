import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SignInCard } from "../components/SignInCard";

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return <SignInCard />;
}
