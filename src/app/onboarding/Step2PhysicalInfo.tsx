"use client";

import { useForm } from "react-hook-form";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import * as z from "zod";
import clsx from "clsx";

const schema = z.object({
  height: z.number().min(1, "Height is required"),
  body_type: z.string().nonempty("Body type is required"),
});

type FormData = z.infer<typeof schema>;

const Step2PhysicalInfo = () => {
  const { updateData, data } = useOnboardingStore();

  const {
    register,
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

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6 bg-white shadow-xl rounded-3xl p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Step Heading */}
        <div className="space-y-1">
          <p className="text-xs text-gray-400 text-center">Step 2 of 6</p>
          <h2 className="text-xl font-bold text-center text-gray-800">
            Physical Details
          </h2>
        </div>

        {/* Height */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height (in cm)
          </label>
          <input
            type="number"
            {...register("height", { valueAsNumber: true })}
            className={clsx(
              "w-full p-3 rounded-xl border text-sm",
              errors.height ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.height && (
            <p className="text-sm text-red-500 mt-1">{errors.height.message}</p>
          )}
        </div>

        {/* Body Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Body Type
          </label>
          <select
            {...register("body_type")}
            className={clsx(
              "w-full p-3 rounded-xl border text-sm bg-white",
              errors.body_type ? "border-red-500" : "border-gray-300"
            )}
          >
            <option value="">Select</option>
            <option value="slim">Slim</option>
            <option value="average">Average</option>
            <option value="athletic">Athletic</option>
            <option value="curvy">Curvy</option>
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
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Continue →
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default Step2PhysicalInfo;
