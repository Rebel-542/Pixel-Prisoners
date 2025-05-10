"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation"; // Added useSearchParams
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Loader2, LogIn, UserPlus } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

export function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Initialize useSearchParams
  const { signIn, signUp } = useAuth();
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);
  const [isSubmittingSignUp, setIsSubmittingSignUp] = useState(false);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const handleRedirect = () => {
    const redirectUrl = searchParams.get('redirect');
    router.push(redirectUrl || "/profile"); // Redirect to 'redirect' or '/profile'
  };

  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsSubmittingLogin(true);
    const user = await signIn(data.email, data.password);
    setIsSubmittingLogin(false);
    if (user) {
      handleRedirect();
    }
  };

  const onSignUpSubmit = async (data: SignUpFormValues) => {
    setIsSubmittingSignUp(true);
    const user = await signUp(data.email, data.password);
    setIsSubmittingSignUp(false);
    if (user) {
      handleRedirect();
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login"><LogIn className="mr-2 h-4 w-4" /> Login</TabsTrigger>
          <TabsTrigger value="signup"><UserPlus className="mr-2 h-4 w-4" /> Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Access your Guardian Angel account.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="login-email">Email</Label>
                      <FormControl>
                        <Input id="login-email" type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="login-password">Password</Label>
                      <FormControl>
                        <Input id="login-password" type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmittingLogin}>
                  {isSubmittingLogin && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </TabsContent>
        <TabsContent value="signup">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create a new Guardian Angel account.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...signUpForm}>
              <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-6">
                <FormField
                  control={signUpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="signup-email">Email</Label>
                      <FormControl>
                        <Input id="signup-email" type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="signup-password">Password</Label>
                      <FormControl>
                        <Input id="signup-password" type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                      <FormControl>
                        <Input id="signup-confirm-password" type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmittingSignUp}>
                  {isSubmittingSignUp && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign Up
                </Button>
              </form>
            </Form>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
