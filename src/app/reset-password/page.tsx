"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import { useState, Suspense } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const formSchema = z
  .object({
    new_password: z.string().min(8, "Password must be at least 8 characters."),
    confirm_password: z
      .string()
      .min(8, "Password must be at least 8 characters."),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type ResetPasswordForm = z.infer<typeof formSchema>;

function ResetPasswordPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const searchParams = useSearchParams();
  const [shownewpassword, setShownewpassword] = useState(false);
  const [showconfirmpassword, setShowconfirmpassword] = useState(false);

  const uid = searchParams.get("uid");
  const token = searchParams.get("token");
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: ResetPasswordForm) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/startup/auth/password-reset/${uid}/${token}/`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Password reset successful");
        logout();
        router.push("/login");
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

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-pink-50">
      <div className="w-full max-w-md bg-white border border-pink-100 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-4">
          Reset Password
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-pink-500">
                    New Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={shownewpassword ? "text" : "password"}
                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-400"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500"
                      onClick={() => setShownewpassword(!shownewpassword)}
                    >
                      {shownewpassword ? (
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
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-pink-500">
                    Confirm Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showconfirmpassword ? "text" : "password"}
                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-400"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500"
                      onClick={() =>
                        setShowconfirmpassword(!showconfirmpassword)
                      }
                    >
                      {showconfirmpassword ? (
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
              className="w-full rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold"
            >
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default function Forgetpassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
