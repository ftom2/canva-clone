import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function protectServer() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }
}
