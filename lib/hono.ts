import { AppType } from "./../app/api/[[...route]]/route";
import { hc } from "hono/client";

const URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
export const client = hc<AppType>(URL);
