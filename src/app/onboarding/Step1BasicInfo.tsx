"use client";

import { useForm } from "react-hook-form";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect } from "react";

const schema = z.object({
  date_of_birth: z.string().nonempty("Date of birth is required"),
  gender: z.string().nonempty("Gender is required"),
  sexual_orientation: z.string().nonempty("Sexual orientation is required"),
  education_level: z.string().nonempty("Education level is required"),
  occupation: z.string().nonempty("Occupation is required"),
});

type FormData = z.infer<typeof schema>;

const Step1BasicInfo = ({ isEditing = false }: { isEditing?: boolean }) => {
  const { updateData, data } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date_of_birth: data.date_of_birth || "",
      gender: data.gender || "",
      sexual_orientation: data.sexual_orientation || "",
      education_level: data.education_level || "",
      occupation: data.occupation || "",
    },
  });

  useEffect(() => {
    if (isEditing && data) {
      reset({
        date_of_birth: data.date_of_birth || "",
        gender: data.gender || "",
        sexual_orientation: data.sexual_orientation || "",
        education_level: data.education_level || "",
        occupation: data.occupation || "",
      });
    }
  }, [isEditing, data, reset]);

  const onSubmit = (values: FormData) => {
    updateData(values);
    document
      .querySelector(".swiper-button-next")
      ?.dispatchEvent(new Event("click"));
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-[100vw] rounded-3xl  p-8 space-y-6 bg-white/10 backdrop-blur-md border border-white/20 z-20 shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center">
          <p className="text-xs text-white">
            {isEditing ? "Edit Profile" : "Step 1 of 6"}
          </p>
          <h2 className="text-2xl font-bold text-white mt-1">
            {"Basic Information"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-3 ">
          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              {...register("date_of_birth")}
              className={clsx(
                "w-full p-3 rounded-xl border text-sm text-white transition focus:outline-none focus:ring-2 focus:ring-pink-400 cursor cursor-pointer",
                errors.date_of_birth ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors.date_of_birth && (
              <p className="text-sm text-red-500 mt-1">
                {errors.date_of_birth.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Gender
            </label>
            <select
              {...register("gender")}
              className={clsx(
                "w-full p-3 rounded-xl border text-sm text-white transition focus:outline-none focus:ring-2 focus:ring-pink-400 cursor cursor-pointer",
                errors.gender ? "border-red-500" : "border-gray-300"
              )}
            >
              <option value="" className="text-gray-500">
                Select
              </option>
              <option value="male" className="text-gray-500">
                Male
              </option>
              <option value="female" className="text-gray-500">
                Female
              </option>
              <option value="other" className="text-gray-500">
                Other
              </option>
            </select>
            {errors.gender && (
              <p className="text-sm text-red-500 mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Sexual Orientation */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Sexual Orientation
            </label>
            <select
              {...register("sexual_orientation")}
              className={clsx(
                "w-full p-3 rounded-xl border text-sm text-white transition focus:outline-none focus:ring-2 focus:ring-pink-400 cursor-pointer",
                errors.sexual_orientation ? "border-red-500" : "border-gray-300"
              )}
            >
              <option value="" className="text-gray-500">
                Select
              </option>
              <option value="straight" className="text-gray-500">
                Straight
              </option>
              <option value="gay" className="text-gray-500">
                Gay
              </option>
              <option value="bisexual" className="text-gray-500">
                Bisexual
              </option>
              <option value="bisexual" className="text-gray-500">
                Other
              </option>
            </select>
            {errors.sexual_orientation && (
              <p className="text-sm text-red-500 mt-1">
                {errors.sexual_orientation.message}
              </p>
            )}
          </div>

          {/* Education Level */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Education Level
            </label>
            <select
              {...register("education_level")}
              className={clsx(
                "w-full p-3 rounded-xl border text-sm text-white transition focus:outline-none focus:ring-2 focus:ring-pink-400 cursor-pointer",
                errors.education_level ? "border-red-500" : "border-gray-300"
              )}
            >
              <option value="" className="text-gray-500">
                Select
              </option>
              <option value="high_school" className="text-gray-500">
                High School
              </option>
              <option value="bachelor" className="text-gray-500">
                Bachelor&apos;s
              </option>
              <option value="master" className="text-gray-500">
                Master&apos;s
              </option>
              <option value="phd" className="text-gray-500">
                Phd
              </option>
              <option value="phd" className="text-gray-500">
                Other
              </option>
            </select>
            {errors.education_level && (
              <p className="text-sm text-red-500 mt-1">
                {errors.education_level.message}
              </p>
            )}
          </div>

          {/* Occupation */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Occupation
            </label>
            <input
              type="text"
              {...register("occupation")}
              placeholder="e.g. Software Engineer"
              className={clsx(
                "w-full p-3 rounded-xl border text-sm text-white transition focus:outline-none focus:ring-2 focus:ring-pink-400 cursor-pointer",
                errors.occupation ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors.occupation && (
              <p className="text-sm text-red-500 mt-1">
                {errors.occupation.message}
              </p>
            )}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition cursor cursor-pointer"
          >
            Continue →
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default Step1BasicInfo;
