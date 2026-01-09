import React from "react";
import { Card, CardContent } from "./ui/card";
import { MOCK_PAGES, MOCK_CAMPAIGNS } from "../constants";
import { PageStatus } from "../types";

import { Badge } from "./ui/badge";

const MetricCard: React.FC<{
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
}> = ({ title, value, change, trend }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent className="p-6">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
        {title}
      </p>
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-bold text-foreground font-sans">
          {value}
        </h2>
        {change && (
          <Badge
            variant={
              trend === "up"
                ? "success"
                : trend === "down"
                ? "destructive"
                : "secondary"
            }
            className="px-2 py-1 text-xs"
          >
            {trend === "up" && "↑"} {trend === "down" && "↓"} {change}
          </Badge>
        )}
      </div>
    </CardContent>
  </Card>
);

export const Dashboard: React.FC = () => {
  return (
    <>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between pt-4">
          <h1 className="text-2xl font-bold font-display text-foreground">
            Overview
          </h1>
          <div className="text-sm text-muted-foreground">
            Last updated: Just now
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Landing Pages"
            value={MOCK_PAGES.length}
            change="+12.5%"
            trend="up"
          />
          <MetricCard
            title="Active Campaigns"
            value={
              MOCK_CAMPAIGNS.filter((c) => c.status === "Published").length
            }
            change="Stable"
            trend="neutral"
          />
          <MetricCard
            title="Total Visitors"
            value="12.2k"
            change="+19.2%"
            trend="up"
          />
          <MetricCard
            title="Pending Forms"
            value="5"
            change="-2"
            trend="down"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity Feed */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardContent className="p-0">
                <div className="p-6 border-b">
                  <h3 className="font-semibold text-lg font-display">
                    Recent Activity
                  </h3>
                </div>
                <div className="divide-y">
                  {MOCK_PAGES.slice(0, 3).map((page) => (
                    <div
                      key={page.id}
                      className="p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            page.status === PageStatus.PUBLISHED
                              ? "bg-green-500"
                              : page.status === PageStatus.DRAFT
                              ? "bg-gray-300"
                              : "bg-amber-500"
                          }`}
                        ></div>
                        <div>
                          <p className="font-medium text-foreground">
                            {page.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(page.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          page.status === PageStatus.PUBLISHED
                            ? "success"
                            : "secondary"
                        }
                      >
                        {page.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t text-center">
                  <button className="text-sm text-primary hover:underline font-medium">
                    View all activity
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions / Tips */}
          <div>
            <Card className="h-full bg-primary text-primary-foreground border-none">
              <CardContent className="p-6 flex flex-col justify-between h-full space-y-6">
                <div>
                  <h3 className="font-bold text-xl font-display mb-2">
                    Pro Tip
                  </h3>
                  <p className="text-primary-foreground/90 text-sm leading-relaxed">
                    Did you know you can schedule your campaigns in advance? Set
                    a publish date in the page editor to automate your launch.
                  </p>
                </div>
                <button className="w-full bg-white text-primary px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-100 transition-colors">
                  Learn more
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
