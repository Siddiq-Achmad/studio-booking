"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import moment from "moment";
import { LogOut } from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]); // Dependencies ensure logic runs when status changes

  if (status === "loading") {
    return <Skeleton className="w-full h-40" />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-4 px-4">
            <p>{session?.user?.name}</p>
            <Button onClick={() => signOut({ callbackUrl: "/login" })}>
              <LogOut size={18} /> Logout
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Card className="bg-neutral-100/50 aspect-video rounded-xl">
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Welcome, {session?.user?.name}!</p>
                <p>Email : {session?.user?.email}</p>
                <p>Your ID : {session?.user?.id}</p>
                <p>
                  Expired At :{" "}
                  {moment(session?.expires).format(" DD-MM-YYYY HH:mm:ss")}
                </p>
              </CardContent>
            </Card>

            <div className="bg-neutral-100/50 aspect-video rounded-xl " />
            <div className="bg-neutral-100/50 aspect-video rounded-xl " />
          </div>
          <div className="bg-neutral-100/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min " />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
