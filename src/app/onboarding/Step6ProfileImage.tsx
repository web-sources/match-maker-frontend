"use client";

import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { motion } from "framer-motion";
import { ProfileImageUpload } from "@/app/onboarding/ProfileImageUpload";
import { Button } from "@/components/ui/button";

const Step6ProfileImage = ({ isEditing = false }: { isEditing?: boolean }) => {
  const { data, updateData } = useOnboardingStore();

  const handleImageChange = (file: File | null) => {
    updateData({ profile_picture: file || undefined });
  };

  const handleContinue = () => {
    document
      .querySelector(".swiper-button-next")
      ?.dispatchEvent(new Event("click"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md space-y-6 rounded-3xl p-8 bg-white/10 backdrop-blur-md border border-white/20 z-20 shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Step Heading */}
        <div className="space-y-1">
          <p className="text-xs text-white text-center">
            {isEditing ? "Update Your" : "Step 1 of 7"}
          </p>
          <h2 className="text-xl font-bold text-center text-white">
            {isEditing ? "Profile Photo" : "Add Your Profile Photo"}
          </h2>
          <p className="text-sm text-white/70 text-center">
            {isEditing
              ? "Update your profile picture to keep your profile fresh"
              : "Add a clear photo of yourself to increase your matches"}
          </p>
        </div>

        {/* Profile Image Upload */}
        <div className="flex justify-center py-4">
          <ProfileImageUpload
            initialImage={data.profile_picture}
            onImageChange={handleImageChange}
          />
        </div>

        {/* Tips - Only show during onboarding */}
        {!isEditing && (
          <div className="mt-6 space-y-2 text-sm text-white/80">
            <h3 className="font-medium text-white text-center mb-2">
              Photo Tips:
            </h3>
            <ul className="space-y-1 list-disc list-inside">
              <li>Use a high-quality, recent photo</li>
              <li>Show your face clearly</li>
              <li>Smile and look approachable</li>
              <li>Avoid group photos or sunglasses</li>
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4">
          <Button
            className="w-full bg-pink-600 hover:bg-pink-700"
            onClick={handleContinue}
          >
            Continue →
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step6ProfileImage;
