"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Step1BasicInfo from "@/app/onboarding/Step1BasicInfo";
import Step3Preferences from "@/app/onboarding/Step3Preferences";
import Step5Intimacy from "@/app/onboarding/Step5Intimacy";
import Step7ReviewSubmit from "@/app/onboarding/Step7ReviewSubmit";
import Step2PhysicalInfo from "@/app/onboarding/Step2PhysicalInfo";
import Step4Languages from "@/app/onboarding/Step4Languages";
import Step6ProfileImage from "@/app/onboarding/Step6ProfileImage";

const ProfileSliderWrapper = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto min-h-screen overflow-hidden mt-10">
      <Swiper
        navigation
        allowTouchMove={false}
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        className="h-full"
      >
        <SwiperSlide>
          <Step6ProfileImage isEditing={true} />
        </SwiperSlide>
        <SwiperSlide>
          <Step1BasicInfo />
        </SwiperSlide>
        <SwiperSlide>
          <Step2PhysicalInfo isEditing={true} />
        </SwiperSlide>
        <SwiperSlide>
          <Step3Preferences isEditing={true} />
        </SwiperSlide>
        <SwiperSlide>
          <Step4Languages isEditing={true} />
        </SwiperSlide>
        <SwiperSlide>
          <Step5Intimacy isEditing={true} />
        </SwiperSlide>
        <SwiperSlide>
          <Step7ReviewSubmit isEditing={true} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProfileSliderWrapper;
