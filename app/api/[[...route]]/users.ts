import { db } from "@/app/db/drizzle";
import { users } from "@/app/db/schema";
import { zValidator } from "@hono/zod-validator";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(3).max(20),
    })
  ),
  async ({ req, json }) => {
    const { name, email, password } = req.valid("json");

    const hashedPassword = await bcrypt.hash(password, 12);

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser && existingUser.length) {
      console.log({ existingUser });
      return json({ error: "User with this email already exists" }, 400);
    }

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    return json(null, 200);
  }
);

export default app;
