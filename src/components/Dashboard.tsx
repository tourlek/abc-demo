import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./ui/table";
import { MOCK_PAGES, MOCK_CAMPAIGNS, MOCK_FORMS } from "../constants";
import { PageStatus } from "../types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  FileText,
  Users,
  Target,
  FileInput,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "./ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

// Mock visitor data for charts
const visitorData = [
  { day: "Mon", visitors: 1240, unique: 890 },
  { day: "Tue", visitors: 1580, unique: 1120 },
  { day: "Wed", visitors: 1890, unique: 1350 },
  { day: "Thu", visitors: 2100, unique: 1580 },
  { day: "Fri", visitors: 1950, unique: 1420 },
  { day: "Sat", visitors: 1650, unique: 1180 },
  { day: "Sun", visitors: 1420, unique: 980 },
];

const sourceData = [
  { source: "Direct", views: 4250, fill: "var(--primary-700)" },
  { source: "Social", views: 3120, fill: "var(--primary-500)" },
  { source: "Referral", views: 2580, fill: "var(--primary-300)" },
  { source: "Search", views: 2280, fill: "var(--primary-200)" },
];

const visitorChartConfig: ChartConfig = {
  visitors: {
    label: "Total Visitors",
    color: "var(--primary-500)",
  },
  unique: {
    label: "Unique Visitors",
    color: "var(--primary-300)",
  },
};

const sourceChartConfig: ChartConfig = {
  views: {
    label: "Page Views",
    color: "var(--primary-500)",
  },
  Direct: {
    label: "Direct",
    color: "var(--primary-700)",
  },
  Social: {
    label: "Social",
    color: "var(--primary-500)",
  },
  Referral: {
    label: "Referral",
    color: "var(--primary-300)",
  },
  Search: {
    label: "Search",
    color: "var(--primary-200)",
  },
};

export const Dashboard: React.FC = () => {
  // Calculate aggregate metrics
  const totalPages = MOCK_PAGES.length;
  const activeCampaigns = MOCK_CAMPAIGNS.filter(
    (c) => c.status === "Published",
  ).length;
  const pendingForms = MOCK_FORMS.filter((f) => f.status === "Draft").length;

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="mt-4">
          <h2 className="tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your system performance and recent activities.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {/* Placeholder for future date range picker or actions */}
          <Button>Download Report</Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Landing Pages
            </CardTitle>
            <div className="p-2 bg-blue-50 rounded-full dark:bg-blue-900/20">
              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPages}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600 font-medium">+12.5%</span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Campaigns
            </CardTitle>
            <div className="p-2 bg-purple-50 rounded-full dark:bg-purple-900/20">
              <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCampaigns}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <Minus className="h-3 w-3 mr-1 text-yellow-600" />
              <span className="text-yellow-600 font-medium">Stable</span>
              <span className="ml-1">since last week</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Visitors
            </CardTitle>
            <div className="p-2 bg-green-50 rounded-full dark:bg-green-900/20">
              <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.2k</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600 font-medium">+19.2%</span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Forms</CardTitle>
            <div className="p-2 bg-orange-50 rounded-full dark:bg-orange-900/20">
              <FileInput className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingForms}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
              <span className="text-red-600 font-medium">-2</span>
              <span className="ml-1">from yesterday</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Visitor Traffic Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Visitor Traffic</CardTitle>
            <CardDescription>
              Daily visitors over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={visitorChartConfig} className="h-64 w-full">
              <AreaChart
                data={visitorData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorVisitors"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--color-visitors)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-visitors)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-unique)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-unique)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  className="stroke-muted"
                />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={40}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="var(--color-visitors)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorVisitors)"
                />
                <Area
                  type="monotone"
                  dataKey="unique"
                  stroke="var(--color-unique)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorUnique)"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Traffic Sources Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Page views breakdown by source</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={sourceChartConfig} className="h-64 w-full">
              <BarChart
                data={sourceData}
                layout="vertical"
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  horizontal={false}
                  strokeDasharray="3 3"
                  className="stroke-muted"
                />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  dataKey="source"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={60}
                />
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="source" />}
                />
                <Bar dataKey="views" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {/* Recent Activity Feed (Main Column) */}
        <Card className="col-span-1 lg:col-span-4 border-border">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates across your pages and campaigns.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Item</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right pr-6">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_PAGES.slice(0, 5).map((page) => (
                    <TableRow key={page.id} className="group">
                      <TableCell className="pl-6 font-medium">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-md text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                            <FileText className="h-4 w-4" />
                          </div>
                          <span
                            className="truncate max-w-[180px]"
                            title={page.content.th.title}
                          >
                            {page.content.th.title}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        Landing Page
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            page.status === PageStatus.PUBLISHED
                              ? "success"
                              : page.status === PageStatus.DRAFT
                                ? "secondary"
                                : "warning"
                          }
                          className="rounded-sm"
                        >
                          {page.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6 text-muted-foreground text-sm">
                        {new Date(page.updatedAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="pt-4 border-t flex justify-center">
              <Link to="/pages">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                >
                  View all activity <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions / Side Column */}
        <div className="col-span-1 lg:col-span-3 space-y-6">
          {/* Tips Card */}
          <Card className="bg-primary text-primary-foreground border-none relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target className="h-32 w-32 -mr-8 -mt-8" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Activity className="h-5 w-5" />
                Pro Tip
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <p className="text-primary-foreground/90 leading-relaxed">
                Did you know you can schedule your campaigns in advance? Set a
                publish date in the page editor to automate your launch.
              </p>
              <Button
                variant="secondary"
                className="w-full font-semibold"
                size="sm"
              >
                Learn more
              </Button>
            </CardContent>
          </Card>

          {/* Quick Links Card */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Link to="/pages/new">
                <Button
                  variant="outline"
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                >
                  <FileText className="mr-2 h-4 w-4" /> Create New Page
                </Button>
              </Link>
              <Link to="/campaigns/new">
                <Button
                  variant="outline"
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                >
                  <Target className="mr-2 h-4 w-4" /> Create Campaign
                </Button>
              </Link>
              <Link to="/users">
                <Button
                  variant="outline"
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                >
                  <Users className="mr-2 h-4 w-4" /> Manage Users
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
