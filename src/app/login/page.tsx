"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Eye, EyeOff, Heart, ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ForgotPasswordModal from "./ForgotPassowordModel";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { HeartsBackground } from "../componets/HeartsBackground";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function LoginPage() {
  const [showpassword, setShowpassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const { login, accessToken, isprofile_complete, loading } = useAuth();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { isSubmitting } = form.formState;

  useEffect(() => {
    if (accessToken) {
      if (!isprofile_complete) {
        router.push("/onboarding");
      } else {
        router.push("/");
      }
    }
  }, [accessToken, router, isprofile_complete]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/startup/auth/login/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        const access_token = response?.data?.token?.access;
        const { is_admin, is_vip, is_profile, is_user, user_id } =
          response?.data;
        login(access_token, is_admin, is_profile, is_vip, is_user, user_id);

        if (!is_profile) {
          router.push("/onboarding");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.error || "Login failed. Please try again."
        );
      } else {
        console.log(error);
      }
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center py-10">
        <div className="flex flex-col items-center">
          <div className="relative h-12 w-12 mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 absolute top-0 left-0" />
            <Heart className="h-5 w-5 text-pink-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="text-pink-500 text-sm font-medium">
            Loading Profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex p-2 justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg-overlay/bg-oll-2.jpg"
          alt="Happy couple background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>
      <HeartsBackground
        color="text-rose-300"
        className="pointer-events-none z-10"
      />

      <div className="relative mt-16 z-20 w-full max-w-md">
        <Card className="flex flex-col w-full max-h-[90vh] backdrop-blur-md bg-white/10 rounded-2xl max-w-md border border-white/20 z-20 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 h-1 w-full"></div>

          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="p-3 bg-rose-100 rounded-full shadow-md animate-pulse">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              </div>
            </div>
            <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 bg-clip-text text-transparent drop-shadow-md">
              Welcome Back to LoveLink
            </CardTitle>
            <p className="text-base text-white italic">
              Continue your beautiful journey of connection
            </p>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="your@email.com"
                            {...field}
                            type="email"
                            autoComplete="username"
                            className="focus:ring-2 focus:ring-rose-300 bg-white/70 border-gray-300 rounded-lg py-5 px-4 text-gray-700 placeholder-gray-400 transition-all hover:border-rose-300 focus:border-rose-400"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-rose-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-rose-500 text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">
                        Password
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showpassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                            className="focus:ring-2 focus:ring-rose-300 bg-white/70 border-gray-300 rounded-lg py-5 px-4 text-gray-700 placeholder-gray-400 transition-all hover:border-rose-300 focus:border-rose-400"
                          />
                        </FormControl>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
                          <button
                            type="button"
                            className="text-gray-400 hover:text-rose-500 transition-colors"
                            onClick={() => setShowpassword(!showpassword)}
                          >
                            {showpassword ? (
                              <EyeOff className="h-5 w-5 cursor cursor-pointer" />
                            ) : (
                              <Eye className="h-5 w-5 cursor cursor-pointer" />
                            )}
                          </button>
                        </div>
                      </div>
                      <FormMessage className="text-rose-500 text-sm" />
                    </FormItem>
                  )}
                />

                <div className="space-y-4 pt-2">
                  <Button
                    type="submit"
                    className="cursor cursor-pointer w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg transition-all hover:shadow-rose-300/50 py-6 text-lg font-semibold rounded-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      <>
                        Continue your journey{" "}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <Button
                      variant="link"
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-white hover:text-rose-600 text-sm px-0 font-medium cursor cursor-pointer underline underline-offset-4 transition-colors"
                    >
                      Forgot your password?
                    </Button>
                  </div>
                </div>
              </form>
            </Form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/70 px-3 text-rose-600 rounded-full">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                type="button"
                className="border-gray-300 bg-white/70 hover:bg-white rounded-lg py-5 text-gray-700 hover:border-rose-300 transition-colors"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    fill="#1877F2"
                  />
                </svg>
                Facebook
              </Button>
              <Button
                variant="outline"
                type="button"
                className="border-gray-300 bg-white/70 hover:bg-white rounded-lg py-5 text-gray-700 hover:border-rose-300 transition-colors"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              <span className="text-white">Don&apos;t have an account?</span>{" "}
              <Link
                href="/register"
                className="font-semibold text-white hover:text-rose-600 underline underline-offset-4 transition-colors"
              >
                Create one now
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <ForgotPasswordModal
        open={showForgotModal}
        onOpenChange={setShowForgotModal}
      />
    </div>
  );
}
