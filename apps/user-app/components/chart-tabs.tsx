"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@repo/ui/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { BarChart, LineChart, PieChart } from "./charts"

export function ChartTabs() {
  const [interval, setInterval]:any = useState("monthly")

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>Track your income and expenses</CardDescription>
          </div>
          <Tabs defaultValue="monthly" value={interval} onValueChange={setInterval} className="w-[240px]">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar">
          <div className="flex justify-center mb-4">
            <TabsList>
              <TabsTrigger value="bar">Bar</TabsTrigger>
              <TabsTrigger value="line">Line</TabsTrigger>
              <TabsTrigger value="pie">Pie</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="bar" className="h-[300px]">
            <BarChart interval={interval} />
          </TabsContent>
          <TabsContent value="line" className="h-[300px]">
            <LineChart interval={interval} />
          </TabsContent>
          <TabsContent value="pie" className="h-[300px]">
            <PieChart />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

