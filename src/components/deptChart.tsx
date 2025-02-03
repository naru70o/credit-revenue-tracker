"use client";

import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartConfig = {
  paid: {
    label: "paid",
    color: "hsl(var(--chart-1))",
  },
  unpaid: {
    label: "unPiad",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface ChartData {
  credits: "paid" | "unpaid";
  value: number;
  fill: string;
}

export function DeptChart({ chartData }: { chartData: ChartData }) {
  return (
    <Card className="flex flex-col bg-transparent shadow-none w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Dashboard Credits</CardTitle>
        <CardDescription className="mb-4">Last month</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="credits"
              fill="fill"
              label
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="credits" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
