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

export const Dashboard: React.FC = () => {
  // Calculate aggregate metrics
  const totalPages = MOCK_PAGES.length;
  const activeCampaigns = MOCK_CAMPAIGNS.filter(
    (c) => c.status === "Published"
  ).length;
  const pendingForms = MOCK_FORMS.filter((f) => f.status === "Draft").length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex items-center justify-between space-y-2">
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
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPages}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+12.5%</span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Campaigns
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCampaigns}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <Minus className="h-3 w-3 mr-1 text-yellow-500" />
              <span className="text-yellow-500 font-medium">Stable</span>
              <span className="ml-1">since last week</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Visitors
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.2k</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+19.2%</span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Forms</CardTitle>
            <FileInput className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingForms}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">-2</span>
              <span className="ml-1">from yesterday</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
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
