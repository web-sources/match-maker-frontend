"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    password2: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords don't match",
    path: ["password2"],
  });

type PasswordFormType = z.infer<typeof passwordSchema>;

const ChangePassword = () => {
  const [showpassword, setShowpassword] = useState(false);
  const [showpassword2, setShowpassword2] = useState(false);
  const { accessToken, logout } = useAuth();
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const form = useForm<PasswordFormType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      password2: "",
    },
  });

  const onSubmit = async (values: PasswordFormType) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/startup/auth/change-password/`,
        values,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.data || "Password changed successfully!");
        logout();
        router.push("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred.");
      } else {
        toast.error("An error occurred.");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-15">
      <div className="bg-white border border-pink-100 rounded-2xl shadow-xl p-8">
        <h2 className="text-xl font-semibold text-pink-600 mb-6">
          Change Password
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-pink-500">
                    New Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showpassword ? "text" : "password"}
                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-400"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500"
                      onClick={() => setShowpassword(!showpassword)}
                    >
                      {showpassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-pink-500">
                    Confirm New Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showpassword2 ? "text" : "password"}
                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-400"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500"
                      onClick={() => setShowpassword2(!showpassword2)}
                    >
                      {showpassword2 ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold cursor cursor-pointer"
            >
              Update Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
