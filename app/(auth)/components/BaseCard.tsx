import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title: string;
  children: React.ReactNode;
};
export function BaseCard({ title, children }: Props) {
  return (
    <Card className="dark min-w-96 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-none">
      <CardHeader>
        <CardTitle className="text-center ">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2.5">{children}</CardContent>
    </Card>
  );
}
