"use client";

import { useForm } from "react-hook-form";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import * as z from "zod";
import { useEffect } from "react";

// Validation schema
const schema = z.object({
  turn_ons: z.string().min(1, "Please list at least one turn-on"),
  turn_offs: z.string().min(1, "Please list at least one turn-off"),
  kinks: z.string().min(1, "Please list at least one kink"),
  ideal_first_date: z.string().min(1, "Please provide your ideal first date"),
  love_language: z.string().min(1, "Please select a love language"),
});

type FormData = z.infer<typeof schema>;

const LOVE_LANGUAGES = ["words", "touch", "gifts", "time", "acts"];

const Step5Intimacy = ({ isEditing = false }: { isEditing?: boolean }) => {
  const { updateData, data } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      turn_ons: data.turn_ons || "",
      turn_offs: data.turn_offs || "",
      kinks: data.kinks || "",
      ideal_first_date: data.ideal_first_date || "",
      love_language: data.love_language || "",
    },
  });

  useEffect(() => {
    if (isEditing && data) {
      reset({
        turn_ons: data.turn_ons || "",
        turn_offs: data.turn_offs || "",
        kinks: data.kinks || "",
        ideal_first_date: data.ideal_first_date || "",
        love_language: data.love_language || "",
      });
    }
  }, [isEditing, data, reset]);

  const onSubmit = (values: FormData) => {
    updateData(values);
    console.log(values, "values from step 5");
    document
      .querySelector(".swiper-button-next")
      ?.dispatchEvent(new Event("click"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6 bg-white shadow-xl rounded-3xl p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="space-y-1">
          <p className="text-xs text-gray-400 text-center">
            {isEditing ? "Edit Profile" : "Step 3 of 4"}
          </p>
          <h2 className="text-xl font-bold text-center text-gray-800">
            Intimacy Preferences
          </h2>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Turn-Ons
            </label>
            <textarea
              {...register("turn_ons")}
              rows={3}
              className="mt-1 w-full border-2 border-gray-300 rounded-xl p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Describe your turn-ons"
            />
            {errors.turn_ons && (
              <p className="text-sm text-red-500 mt-1">
                {errors.turn_ons.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Turn-Offs
            </label>
            <textarea
              {...register("turn_offs")}
              rows={3}
              className="mt-1 w-full border-2 border-gray-300 rounded-xl p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Describe your turn-offs"
            />
            {errors.turn_offs && (
              <p className="text-sm text-red-500 mt-1">
                {errors.turn_offs.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kinks
            </label>
            <textarea
              {...register("kinks")}
              rows={3}
              className="mt-1 w-full border-2 border-gray-300 rounded-xl p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Describe your kinks"
            />
            {errors.kinks && (
              <p className="text-sm text-red-500 mt-1">
                {errors.kinks.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ideal First Date
            </label>
            <textarea
              {...register("ideal_first_date")}
              rows={3}
              className="mt-1 w-full border-2 border-gray-300 rounded-xl p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="What is your ideal first date?"
            />
            {errors.ideal_first_date && (
              <p className="text-sm text-red-500 mt-1">
                {errors.ideal_first_date.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Love Language
            </label>
            <select
              {...register("love_language")}
              className="mt-1 w-full border-2 border-gray-300 rounded-xl p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">Select your love language</option>
              {LOVE_LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
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
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Continue →
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default Step5Intimacy;
