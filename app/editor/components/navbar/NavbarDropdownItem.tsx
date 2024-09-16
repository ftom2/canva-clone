import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CiFileOn } from "react-icons/ci";
import { getNavbarItems } from "@/app/editor/utils";

type Item = ReturnType<typeof getNavbarItems>[0];
type Props = {
  item: Item;
};
export default function NavbarDropdownItem({ item }: Props) {
  return (
    <DropdownMenuItem
      className="flex items-center gap-2"
      onClick={item.onClick}
    >
      <CiFileOn className="size-8" />
      <div>
        <p>{item.label}</p>
        <p className="text-xs text-muted-foreground">{item.description}</p>
      </div>
    </DropdownMenuItem>
  );
}
