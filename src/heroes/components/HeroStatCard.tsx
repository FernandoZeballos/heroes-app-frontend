import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props extends React.PropsWithChildren {
  title: string;
  icon: React.ReactNode;
}

export const HeroStatCard = ({ title, icon, children }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {/* <Zap className="h-4 w-4 text-muted-foreground" /> */}
        {icon}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
