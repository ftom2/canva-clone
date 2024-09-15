import { Hint } from "@/components/Hint";
import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  icon: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};
export default function NavbarActionItem({
  label,
  icon,
  className,
  disabled,
  onClick,
}: Props) {
  return (
    <Hint label={label} side="bottom" sideOffset={10}>
      <Button
        disabled={disabled}
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
