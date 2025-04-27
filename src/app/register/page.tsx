"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Heart, ArrowRight } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HeartsBackground } from "../componets/HeartsBackground";

const formSchema = z
  .object({
    first_name: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    last_name: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords don't match",
    path: ["password2"],
  });

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password2: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/startup/auth/register/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.data || "Registration successful!");
        router.push("/login");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.error || "An error occurred. Please try again."
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex p-4 justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg-overlay/bg-ol-12.jpg"
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
        className="pointer-events-none z-10" // This allows clicks to pass through
      />
      <div className="relative mt-16 z-20 w-full max-w-md">
        <Card className="w-full max-w-md overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 z-20 shadow-2xl">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 h-1 w-full"></div>

          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-rose-100 rounded-full shadow-md animate-pulse">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              </div>
            </div>
            <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 bg-clip-text text-transparent drop-shadow-md">
              Find Your Perfect Match
            </CardTitle>
            <p className="text-base text-white italic">
              Join our community and start your love story today
            </p>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your first name"
                            {...field}
                            className="focus:ring-2 focus:ring-rose-300 bg-white/70 border-gray-300 rounded-lg py-5 px-4 text-gray-700 placeholder-gray-400 transition-all hover:border-rose-300 focus:border-rose-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your last name"
                            {...field}
                            className="focus:ring-2 focus:ring-rose-300 bg-white/70 border-gray-300 rounded-lg py-5 px-4 text-gray-700 placeholder-gray-400 transition-all hover:border-rose-300 focus:border-rose-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                            className="focus:ring-2 focus:ring-rose-300 bg-white/70 border-gray-300 rounded-lg py-5 px-4 text-gray-700 placeholder-gray-400 transition-all hover:border-rose-300 focus:border-rose-400"
                          />
                        </FormControl>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
                          <button
                            type="button"
                            className="text-gray-400 hover:text-rose-500 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
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

                <FormField
                  control={form.control}
                  name="password2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Confirm Password
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                            className="focus:ring-2 focus:ring-rose-300 bg-white/70 border-gray-300 rounded-lg py-5 px-4 text-gray-700 placeholder-gray-400 transition-all hover:border-rose-300 focus:border-rose-400"
                          />
                        </FormControl>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
                          <button
                            type="button"
                            className="text-gray-400 hover:text-rose-500 transition-colors"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5 cursor cursor-pointer" />
                            ) : (
                              <Eye className="h-5 w-5 cursor cursor-pointer" />
                            )}
                          </button>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg cursor cursor-pointer"
                >
                  Create Account <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="text-center text-sm text-gray-600 mt-4">
                  <span className="text-white">Already have an account?</span>{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="font-medium text-white hover:text-rose-600 cursor cursor-pointer"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
