"use client";

import { useAuth } from "@/context/AuthContext";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Step 7: Review and Submit (with Terms and Conditions)
const Step7ReviewSubmit = ({ isEditing = false }: { isEditing?: boolean }) => {
  console.log(isEditing, "isEditing");
  const { resetData, data } = useOnboardingStore();
  const { accessToken, login } = useAuth();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  const handleSubmit = async () => {
    if (isEditing) {
      try {
        const response = await axios.put(
          `${BASE_URL}/api/v1/startup/fun/profile/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        console.log(response, "response from api");

        if (response.status === 200) {
          toast.success(response.data.data || "Profile Updated Succesfully!");
          router.push("/settings");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.error || "Profile Failed ! Try Aftersometime"
          );
        } else {
          console.log(error);
        }
      }
    } else {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/v1/startup/fun/profile/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        console.log(response, "response from api");

        if (response.status === 201) {
          toast.success(response.data.data || "Profile Created Succesfully!");
          login(
            accessToken,
            false,
            response.data.is_profile_created,
            false,
            true
          );
          router.push("/");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.error || "Profile Failed ! Try Aftersometime"
          );
        } else {
          console.log(error);
        }
      }
    }

    resetData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md space-y-6 bg-white shadow-xl rounded-3xl p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="space-y-1">
          <p className="text-xs text-gray-400 text-center">Step 7 of 7</p>
          <h2 className="text-xl font-bold text-center text-gray-800">
            Terms and Conditions
          </h2>
        </div>

        <div className="space-y-3">
          {/* Terms and Conditions Text */}
          <p className="text-sm text-gray-700">
            By submitting your profile, you agree to our{" "}
            <a href="/terms" className="text-pink-600 hover:underline">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="text-pink-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>

          {/* Permission Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agree"
              className="form-checkbox accent-pink-600"
              required
            />
            <label htmlFor="agree" className="text-sm text-gray-700">
              I agree to the terms and conditions
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Submit
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step7ReviewSubmit;
