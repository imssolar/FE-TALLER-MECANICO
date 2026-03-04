import { useQuery } from "@tanstack/react-query";
import { busService } from "@/services/bus.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";
import { Bus as BusIcon, Wrench, AlertTriangle, CheckCircle } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Bus } from "@/types/bus";

const STATUS_COLORS = {
  Operativos: "#22c55e",
  "En Mantención": "#f59e0b",
  Inactivos: "#ef4444",
};

function buildStatusData(stats: { operativos: number; enMantencion: number; inactivos: number } | undefined) {
  if (!stats) return [];
  return [
    { name: "Operativos", value: stats.operativos },
    { name: "En Mantención", value: stats.enMantencion },
    { name: "Inactivos", value: stats.inactivos },
  ].filter((d) => d.value > 0);
}

function buildTerminalData(buses: Bus[]) {
  const counts: Record<string, number> = {};
  for (const bus of buses) {
    const name = bus.terminal?.terminal ?? "Sin terminal";
    counts[name] = (counts[name] || 0) + 1;
  }
  return Object.entries(counts).map(([name, cantidad]) => ({ name, cantidad }));
}

export default function Dashboard() {
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["bus-estadisticas"],
    queryFn: busService.getEstadisticas,
  });

  const { data: busesData, isLoading: isLoadingBuses } = useQuery({
    queryKey: ["buses"],
    queryFn: busService.getAll,
  });
  const buses = Array.isArray(busesData) ? busesData : [];

  const statusData = buildStatusData(stats);
  const terminalData = buildTerminalData(buses);

  const cards = [
    {
      title: "Total Buses",
      value: stats?.totalBuses ?? 0,
      icon: BusIcon,
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
              {isLoadingStats ? (
                <div className="h-8 w-16 animate-pulse rounded bg-muted" />
              ) : (
                <p className="text-3xl font-bold">{card.value}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Estado de la flota</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingStats ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-24 animate-pulse rounded bg-muted" />
              </div>
            ) : statusData.length === 0 ? (
              <div className="flex h-64 items-center justify-center text-muted-foreground">
                Sin datos disponibles
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {statusData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Buses por terminal</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingBuses ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-24 animate-pulse rounded bg-muted" />
              </div>
            ) : terminalData.length === 0 ? (
              <div className="flex h-64 items-center justify-center text-muted-foreground">
                Sin datos disponibles
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={terminalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="cantidad" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
