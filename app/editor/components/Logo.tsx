import Image from "next/image";
import Link from "next/link";

type Props = {};
export default function Logo({}: Props) {
  return (
    <Link href="/">
      <div className="relative size-8 shrink-0">
        <Image
          src="/logo.svg"
          alt="Canva Clone"
          fill
          objectFit="contain"
          className="shrink-0 hover:opacity-75 transition"
        />
      </div>
    </Link>
  );
}
