import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CiFileOn } from "react-icons/ci";
import { EXPORT_MENU_ITEMS } from "../../constants";

type Item = (typeof EXPORT_MENU_ITEMS)[0];
type Props = {
  item: Item;
};
export default function NavbarDropdownItem({ item }: Props) {
  return (
    <DropdownMenuItem className="flex items-center gap-2">
      <CiFileOn className="size-8" />
      <div>
        <p>{item.label}</p>
        <p className="text-xs text-muted-foreground">{item.description}</p>
      </div>
    </DropdownMenuItem>
  );
}
