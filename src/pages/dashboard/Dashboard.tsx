import { useQuery } from "@tanstack/react-query";
import { busService } from "@/services/bus.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";
import { Bus, Wrench, AlertTriangle, CheckCircle } from "lucide-react";

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["bus-estadisticas"],
    queryFn: busService.getEstadisticas,
  });

  const cards = [
    {
      title: "Total Buses",
      value: stats?.totalBuses ?? 0,
      icon: Bus,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Operativos",
      value: stats?.operativos ?? 0,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "En Mantención",
      value: stats?.enMantencion ?? 0,
      icon: Wrench,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Inactivos",
      value: stats?.inactivos ?? 0,
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <>
      <PageHeader title="Dashboard" description="Resumen general del taller" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`rounded-md p-2 ${card.bg}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-8 w-16 animate-pulse rounded bg-muted" />
              ) : (
                <p className="text-3xl font-bold">{card.value}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
