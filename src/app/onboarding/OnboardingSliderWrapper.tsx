"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Step1BasicInfo from "./Step1BasicInfo";
import Step3Preferences from "./Step3Preferences";
import Step5Intimacy from "./Step5Intimacy";
import Step7ReviewSubmit from "./Step7ReviewSubmit";

const OnboardingSliderWrapper = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto min-h-screen overflow-hidden bg-gradient-to-b from-pink-50 via-white to-blue-50">
      {/* Main content with higher z-index */}
      <div className="relative z-10">
        <Swiper
          navigation
          allowTouchMove={false}
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          className="h-full"
        >
          <SwiperSlide>
            <Step1BasicInfo />
          </SwiperSlide>
          <SwiperSlide>
            <Step3Preferences />
          </SwiperSlide>
          <SwiperSlide>
            <Step5Intimacy />
          </SwiperSlide>
          <SwiperSlide>
            <Step7ReviewSubmit />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default OnboardingSliderWrapper;
