import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { protectServer } from "./(auth)/utils";

export default async function Home() {
  await protectServer();
  const session = await auth();
  return (
    <div>
      You are logged in
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
