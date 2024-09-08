"use client";
import { QueryProvider } from "./QueryProvider";

type Props = {
  children: React.ReactNode;
};
export function Providers({ children }: Props) {
  return <QueryProvider>{children}</QueryProvider>;
}
