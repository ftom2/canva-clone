import Link from "next/link";

type Props = {
  text: string;
  href: string;
  buttonText: string;
};

export function CardFooter({ text, href, buttonText }: Props) {
  return (
    <p className="flex gap-1 text-xs text-foreground">
      {text}
      <Link href={href}>
        <span className="text-sky-300 hover:underline">{buttonText}</span>
      </Link>
    </p>
  );
}
