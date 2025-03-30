"use client"

import { useTheme } from "next-themes"
import { Bar, Line, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

// Sample data
const getWeeklyData = () => ({
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  income: [1200, 1900, 800, 1600, 2000, 700, 500],
  expenses: [700, 1200, 900, 1100, 800, 1500, 400],
})

const getMonthlyData = () => ({
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  income: [5000, 6200, 7800, 5500, 6800, 7200, 8000, 7500, 9000, 8200, 7800, 9500],
  expenses: [4200, 4800, 5100, 4700, 5200, 5800, 6100, 5900, 6300, 5500, 6000, 7000],
})

const getYearlyData = () => ({
  labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
  income: [42000, 48000, 52000, 58000, 65000, 72000],
  expenses: [38000, 42000, 45000, 49000, 55000, 62000],
})

const getPieData = () => ({
  labels: ["Housing", "Food", "Transport", "Entertainment", "Utilities", "Savings"],
  data: [35, 20, 15, 10, 10, 10],
})

interface ChartProps {
  interval?: "weekly" | "monthly" | "yearly"
}

export function BarChart({ interval = "monthly" }: ChartProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  let data
  switch (interval) {
    case "weekly":
      data = getWeeklyData()
      break
    case "yearly":
      data = getYearlyData()
      break
    default:
      data = getMonthlyData()
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Income",
        data: data.income,
        backgroundColor: "hsl(108, 100%, 47%, 0.7)",
        borderColor: "hsl(108, 100%, 47%)",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: data.expenses,
        backgroundColor: "hsl(267, 75%, 50%, 0.7)",
        borderColor: "hsl(267, 75%, 50%)",
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
        },
      },
    },
  }

  return <Bar data={chartData} options={options} />
}

export function LineChart({ interval = "monthly" }: ChartProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  let data
  switch (interval) {
    case "weekly":
      data = getWeeklyData()
      break
    case "yearly":
      data = getYearlyData()
      break
    default:
      data = getMonthlyData()
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Income",
        data: data.income,
        borderColor: "hsl(108, 100%, 47%)",
        backgroundColor: "hsl(108, 100%, 47%, 0.1)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Expenses",
        data: data.expenses,
        borderColor: "hsl(267, 75%, 50%)",
        backgroundColor: "hsl(267, 75%, 50%, 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
        },
      },
    },
  }

  return <Line data={chartData} options={options} />
}

export function PieChart() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const pieData = getPieData()

  const chartData = {
    labels: pieData.labels,
    datasets: [
      {
        data: pieData.data,
        backgroundColor: [
          "hsl(267, 75%, 50%, 0.7)",
          "hsl(108, 100%, 47%, 0.7)",
          "hsl(142, 70%, 45%, 0.7)",
          "hsl(200, 70%, 50%, 0.7)",
          "hsl(30, 70%, 50%, 0.7)",
          "hsl(300, 70%, 50%, 0.7)",
        ],
        borderColor: [
          "hsl(267, 75%, 50%)",
          "hsl(108, 100%, 47%)",
          "hsl(142, 70%, 45%)",
          "hsl(200, 70%, 50%)",
          "hsl(30, 70%, 50%)",
          "hsl(300, 70%, 50%)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
        },
      },
    },
  }

  return <Pie data={chartData} options={options} />
}

