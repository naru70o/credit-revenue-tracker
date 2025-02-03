"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";

interface RevenueChart {
  month: string;
  revenue: number;
}


const chartConfig = {
  desktop: {
    label: "revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function RevenueChart({ chartData }: { chartData: RevenueChart[] }) {
  const [message, setMessage] = useState("");
  const [percentageChange, setPercentageChange] = useState<number>(0);

  console.log(chartData);

  useEffect(() => {
    if (chartData.length >= 2) {
      const [previousMonth, lastMonth] = chartData.slice(-2);
      const revenueDifference = lastMonth.revenue - previousMonth.revenue;

      // Calculate the percentage change (to display in another state)
      const percentageChange = (
        (revenueDifference / previousMonth.revenue) *
        100
      ).toFixed(0);
      setPercentageChange(parseFloat(percentageChange));

      if (revenueDifference > 0) {
        // Message for increase
        setMessage(
          `Macaamiil qaaliga ah, waxaad kordhisay ${revenueDifference.toLocaleString()} bishan marka la barbardhigo ${
            previousMonth.month
          }. 🚀`
        );
      } else if (revenueDifference < 0) {
        // Message for decrease
        setMessage(
          `Macaamiil qaaliga ah, waxa kugu yimid hoos u dhac dhan ${Math.abs(
            revenueDifference
          ).toLocaleString()} markaan barbar dhigno ${previousMonth.month}. 🔻`
        );
      } else {
        // Message for no change
        setMessage(
          `Macaamiil qaaliga ah, dakhligaagu wuxuu joogaa isla halkii ${previousMonth.month}. 📊`
        );
      }
    } else {
      setMessage(
        `Dakhligaaga dhaqaale ee bishani waa ${lastMonth.revenue.toLocaleString()}`
      );
    }
  }, [chartData]);

  return (
    <Card className="bg-transparent mb-5 w-full shadow-none">
      <CardHeader>
        <CardTitle>Your Monthly</CardTitle>
        <CardDescription>Revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="revenue" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {percentageChange > 0 ? "Kor u kac dhan " : "Hoos u dhaca dhan"}
          {Math.abs(percentageChange)}% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">{message}</div>
      </CardFooter>
    </Card>
  );
}
