"use client";

import { useForm } from "react-hook-form";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import * as z from "zod";
import clsx from "clsx";
import { useEffect } from "react";

const schema = z.object({
  height: z.number().min(1, "Height is required"),
  body_type: z.string().nonempty("Body type is required"),
});

type FormData = z.infer<typeof schema>;

const Step2PhysicalInfo = ({ isEditing = false }: { isEditing?: boolean }) => {
  const { updateData, data } = useOnboardingStore();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      height: data.height || 0,
      body_type: data.body_type || "",
    },
  });

  const onSubmit = (values: FormData) => {
    updateData(values);
    document
      .querySelector(".swiper-button-next")
      ?.dispatchEvent(new Event("click"));
  };

  useEffect(() => {
    if (isEditing && data) {
      reset({
        height: data.height || 0,
        body_type: data.body_type || "",
      });
    }
  }, [isEditing, data, reset]);

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6 rounded-3xl p-8 bg-white/10 backdrop-blur-md border border-white/20 z-20 shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Step Heading */}
        <div className="space-y-1">
          <p className="text-xs text-white text-center">Step 2 of 6</p>
          <h2 className="text-xl font-bold text-center text-white">
            Physical Details
          </h2>
        </div>

        {/* Height */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Height (in cm)
          </label>
          <input
            type="number"
            {...register("height", { valueAsNumber: true })}
            className={clsx(
              "w-full p-3 rounded-xl border text-sm text-white cursor cursor-pointer",
              errors.height ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.height && (
            <p className="text-sm text-red-500 mt-1">{errors.height.message}</p>
          )}
        </div>

        {/* Body Type */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Body Type
          </label>
          <select
            {...register("body_type")}
            className={clsx(
              "w-full p-3 rounded-xl border text-sm text-white cursor cursor-pointer",
              errors.body_type ? "border-red-500" : "border-gray-300"
            )}
          >
            <option value="" className="text-gray-500">Select</option>
            <option value="slim" className="text-gray-500">
              Slim
            </option>
            <option value="average" className="text-gray-500">
              Average
            </option>
            <option value="athletic" className="text-gray-500">
              Athletic
            </option>
            <option value="curvy" className="text-gray-500">
              Curvy
            </option>
          </select>
          {errors.body_type && (
            <p className="text-sm text-red-500 mt-1">
              {errors.body_type.message}
            </p>
          )}
        </div>

        {/* Continue Button */}
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

export default Step2PhysicalInfo;
