"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      setLoading(false);

      if (res?.ok) {
        toast.success("Login Success!", {
          description: `Welcome back, ${formData.email}!`,
        });
        setTimeout(() => {
          window.location.href = "/dashboard"; // Redirect ke dashboard setelah login
        }, 1500);
      } else {
        throw new Error(res?.error ? res.error : "Login Failed!");
      }
    } catch (error: any) {
      toast.error("Login Failed!", {
        description: error.message,
        action: {
          label: "Try Again",
          onClick: () => console.log("User mencoba login lagi"),
        },
        className: "destructive", // Menggunakan gaya error
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-4">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p>
          Don't have an account?{" "}
          <a href="/register" className="text-primary hover:underline">
            Register here
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
