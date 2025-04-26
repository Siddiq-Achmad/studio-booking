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
import { LogOut, MoveDownLeft, MoveUpRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TableData from "@/app/components/TableData";
import TableUser from "@/app/components/TableUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "@/components/LogoutButton";
import TableBooking from "@/app/components/TableBooking";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { user, loading } = useAuth();
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="lg"
                  variant="ghost"
                  aria-label="Open account menu"
                  className="w-fit h-fit flex justify-between items-center gap-4"
                >
                  <div className="grid flex-1 text-right text-sm leading-tight">
                    <span className="truncate font-normal">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                  <Avatar>
                    <AvatarImage src={user?.image} alt={user?.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-w-64">
                <DropdownMenuLabel className="flex flex-col ">
                  <span>{user?.name}</span>
                  <span className="text-xs font-normal text-foreground">
                    {user?.email}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Option 1</DropdownMenuItem>
                  <DropdownMenuItem>Option 2</DropdownMenuItem>
                  <DropdownMenuItem>Option 3</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Card className="bg-neutral-100/50 rounded-xl">
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <Avatar>
                  <AvatarImage src={user?.image} alt={user?.name} />
                </Avatar>
                <p>Welcome, {user?.name}!</p>
                <p>Email : {user?.email}</p>
                <p>Your ID : {user?.id}</p>
                <p>Roles : {user?.role}</p>
                <p>
                  Expired At :{" "}
                  {moment(session?.expires).format(" DD-MM-YYYY HH:mm:ss")}
                </p>
              </CardContent>
            </Card>

            <div className=" col-span-2 rounded-xl ">
              <div className="w-full">
                <div className="flex justify-center items-center">
                  <div className="grid text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full gap-2">
                    <div className="flex gap-0 flex-col justify-between p-6 border rounded-md">
                      <MoveUpRight className="w-4 h-4 mb-10 text-primary" />
                      <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
                        500.000
                        <span className="text-muted-foreground text-sm tracking-normal">
                          +20.1%
                        </span>
                      </h2>
                      <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                        Monthly active users
                      </p>
                    </div>
                    <div className="flex gap-0 flex-col justify-between p-6 border rounded-md">
                      <MoveDownLeft className="w-4 h-4 mb-10 text-destructive" />
                      <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
                        20.105
                        <span className="text-muted-foreground text-sm tracking-normal">
                          -2%
                        </span>
                      </h2>
                      <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                        Daily active users
                      </p>
                    </div>
                    <div className="flex gap-0 flex-col justify-between p-6 border rounded-md">
                      <MoveUpRight className="w-4 h-4 mb-10 text-primary" />
                      <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
                        $523.520
                        <span className="text-muted-foreground text-sm tracking-normal">
                          +8%
                        </span>
                      </h2>
                      <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                        Monthly recurring revenue
                      </p>
                    </div>
                    <div className="flex gap-0 flex-col justify-between p-6 border rounded-md">
                      <MoveUpRight className="w-4 h-4 mb-10 text-primary" />
                      <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
                        $1052
                        <span className="text-muted-foreground text-sm tracking-normal">
                          +2%
                        </span>
                      </h2>
                      <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                        Cost per acquisition
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-neutral-100/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-4 ">
            <TableUser />
          </div>
          <div className="bg-neutral-100/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-4 ">
            <TableBooking />
          </div>
          <div className="bg-neutral-100/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-4 ">
            <TableData />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
