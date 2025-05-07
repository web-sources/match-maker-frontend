"use client";

import { useForm } from "react-hook-form";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import * as z from "zod";
import clsx from "clsx";
import { useEffect } from "react";

const schema = z.object({
  relationship_goal: z.string().nonempty("Please select a goal"),
  smoking: z.coerce.boolean({ required_error: "Please select an option" }),
  drinking: z.coerce.boolean({ required_error: "Please select an option" }),
  love_language: z.string().min(1, "Please select a love language"),
});

type FormData = z.infer<typeof schema>;

const LOVE_LANGUAGES = ["words", "touch", "gifts", "time", "acts"];

const Step3Preferences = ({ isEditing = false }: { isEditing?: boolean }) => {
  const { updateData, data } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      relationship_goal: data.relationship_goal || "",
      smoking: typeof data.smoking === "boolean" ? data.smoking : undefined,
      drinking: typeof data.drinking === "boolean" ? data.drinking : undefined,
      love_language: data.love_language || "",
    },
  });

  useEffect(() => {
    if (isEditing && data) {
      reset({
        relationship_goal: data.relationship_goal || "",
        smoking: typeof data.smoking === "boolean" ? data.smoking : undefined,
        drinking:
          typeof data.drinking === "boolean" ? data.drinking : undefined,
        love_language: data.love_language || "",
      });
    }
  }, [isEditing, data, reset]);

  const onSubmit = (values: FormData) => {
    const { ...rest } = values;

    const payload = {
      ...rest,
    };

    updateData(payload);
    document
      .querySelector(".swiper-button-next")
      ?.dispatchEvent(new Event("click"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4 lg:px-8">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl space-y-6  rounded-3xl p-10 bg-white/10 backdrop-blur-md border border-white/20 z-20 shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="space-y-1 text-center">
          <p className="text-xs text-white">
            {isEditing ? "Edit Profile" : "Step 3 of 6"}
          </p>
          <h2 className="text-2xl font-bold text-white">Preferences</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Relationship Goal
            </label>
            <select
              {...register("relationship_goal")}
              className={clsx(
                "w-full p-3 rounded-xl border text-sm text-white cursor-pointer",
                errors.relationship_goal ? "border-red-500" : "border-gray-300"
              )}
            >
              <option value="" className="text-gray-500">Select</option>
              <option value="hookup" className="text-gray-500">
                Casual / Hookup
              </option>
              <option value="dating" className="text-gray-500">
                Long-term Dating
              </option>
              <option value="friends" className="text-gray-500">
                Just Friends
              </option>
              <option value="open" className="text-gray-500">
                Open Relationship
              </option>
              <option value="fun" className="text-gray-500">
                Fun & Explore
              </option>
            </select>
            {errors.relationship_goal && (
              <p className="text-sm text-red-500 mt-1">
                {errors.relationship_goal.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Do you smoke?
            </label>
            <select
              {...register("smoking")}
              className={clsx(
                "w-full p-3 rounded-xl border text-sm text-white cursor-pointer",
                errors.smoking ? "border-red-500" : "border-gray-300"
              )}
            >
              <option value="" className="text-gray-500">Select</option>
              <option value="true" className="text-gray-500">
                Yes
              </option>
              <option value="false" className="text-gray-500">
                No
              </option>
            </select>
            {errors.smoking && (
              <p className="text-sm text-red-500 mt-1">
                {errors.smoking.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Do you drink?
            </label>
            <select
              {...register("drinking")}
              className={clsx(
                "w-full p-3 rounded-xl border text-sm text-white cursor-pointer",
                errors.drinking ? "border-red-500" : "border-gray-300"
              )}
            >
              <option value="">Select</option>
              <option value="true" className="text-gray-500">
                Yes
              </option>
              <option value="false" className="text-gray-500">
                No
              </option>
            </select>
            {errors.drinking && (
              <p className="text-sm text-red-500 mt-1">
                {errors.drinking.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Love Language
            </label>
            <select
              {...register("love_language")}
              className="mt-1 w-full border-2 border-gray-300 rounded-xl p-3 cursor-pointer text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="" >Select love language</option>
              {LOVE_LANGUAGES.map((lang) => (
                <option key={lang} value={lang} className="text-gray-500 cursor-pointer">
                  {lang}
                </option>
              ))}
            </select>
            {errors.love_language && (
              <p className="text-sm text-red-500 mt-1">
                {errors.love_language.message}
              </p>
            )}
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition cursor-pointer"
          >
            Continue →
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default Step3Preferences;
