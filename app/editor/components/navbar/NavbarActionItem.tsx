import { Hint } from "@/components/Hint";
import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
};
export default function NavbarActionItem({
  label,
  icon,
  className,
  onClick,
}: Props) {
  return (
    <Hint label={label} side="bottom" sideOffset={10}>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className={className}
      >
        {icon}
      </Button>
    </Hint>
  );
}
