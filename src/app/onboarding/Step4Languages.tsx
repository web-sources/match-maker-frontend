"use client";

import { useForm } from "react-hook-form";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import * as z from "zod";
import clsx from "clsx";
import { useEffect, useState } from "react";

// Validation schema
const schema = z.object({
  languages: z.array(z.string()).min(1, "Please select at least one language"),
});

type FormData = z.infer<typeof schema>;

const LANGUAGES = [
  "Akan",
  "Amharic",
  "Arabic",
  "Assamese",
  "Awadhi",
  "Azerbaijani",
  "Balochi",
  "Belarusian",
  "Bengali",
  "Bhojpuri",
  "Burmese",
  "Cebuano (Visayan)",
  "Chewa",
  "Chhattisgarhi",
  "Chittagonian",
  "Czech",
  "Deccan",
  "Dhundhari",
  "Dutch",
  "Eastern Min",
  "English",
  "French",
  "Fula",
  "Gan Chinese",
  "German",
  "Greek",
  "Gujarati",
  "Haitian Creole",
  "Hakka",
  "Haryanvi",
  "Hausa",
  "Hiligaynon",
  "Hindi",
  "Hmong",
  "Hungarian",
  "Igbo",
  "Ilocano",
  "Italian",
  "Japanese",
  "Javanese",
  "Jin",
  "Kannada",
  "Kazakh",
  "Khmer",
  "Kinyarwanda",
  "Kirundi",
  "Konkani",
  "Korean",
  "Kurdish",
  "Madurese",
  "Magahi",
  "Maithili",
  "Malagasy",
  "Malay/Indonesian",
  "Malayalam",
  "Mandarin",
  "Marathi",
  "Marwari",
  "Mossi",
  "Nepali",
  "Northern Min",
  "Odia (Oriya)",
  "Oromo",
  "Pashto",
  "Persian",
  "Polish",
  "Portuguese",
  "Punjabi",
  "Quechua",
  "Romanian",
  "Russian",
  "Saraiki",
  "Serbo-Croatian",
  "Shona",
  "Sindhi",
  "Sinhalese",
  "Somali",
  "Southern Min",
  "Spanish",
  "Sundanese",
  "Swedish",
  "Sylheti",
  "Tagalog",
  "Tamil",
  "Telugu",
  "Thai",
  "Turkish",
  "Turkmen",
  "Ukrainian",
  "Urdu",
  "Uyghur",
  "Uzbek",
  "Vietnamese",
  "Wu (inc. Shanghainese)",
  "Xhosa",
  "Xiang (Hunnanese)",
  "Yoruba",
  "Yue (Cantonese)",
  "Zhuang",
  "Zulu",
  "other",
];

const Step4Languages = ({ isEditing = false }: { isEditing?: boolean }) => {
  const { updateData, data } = useOnboardingStore();
  const [search, setSearch] = useState("");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      languages: data.languages
        ? data.languages.split(",").map((l) => l.trim())
        : [],
    },
  });

  useEffect(() => {
    if (isEditing && data) {
      reset({
        languages: data.languages
          ? data.languages.split(",").map((l) => l.trim())
          : [],
      });
    }
  }, [isEditing, data, reset]);

  const onSubmit = (values: FormData) => {
    const payload = {
      ...values,
      languages: values.languages.join(", "),
    };

    updateData(payload);
    document
      .querySelector(".swiper-button-next")
      ?.dispatchEvent(new Event("click"));
  };

  const selected = watch("languages");

  const filteredLanguages = LANGUAGES.filter((lang) =>
    lang.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6 rounded-3xl p-8 bg-white/10 backdrop-blur-md border border-white/20 z-20 shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="space-y-1">
          <p className="text-xs text-white text-center">Step 4 of 6</p>
          <h2 className="text-xl font-bold text-center text-white">
            Languages You Speak
          </h2>
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search languages..."
          className="w-full p-3 rounded-xl border text-white border-gray-300 text-sm"
        />

        {/* Scrollable List */}
        <div className="space-y-3 max-h-72 overflow-y-auto pr-1 ">
          {filteredLanguages.length > 0 ? (
            filteredLanguages.map((lang) => (
              <label
                key={lang}
                className={clsx(
                  "flex items-center gap-3 p-3 rounded-xl border cursor-pointer text-sm",
                  selected?.includes(lang)
                    ? "border-pink-500 bg-pink-50"
                    : "border-gray-300 text-white"
                )}
              >
                <input
                  type="checkbox"
                  value={lang}
                  {...register("languages")}
                  className="form-checkbox accent-pink-600 "
                />
                {lang}
              </label>
            ))
          ) : (
            <p className="text-sm text-white">No languages found</p>
          )}
        </div>

        {errors.languages && (
          <p className="text-sm text-red-500 mt-1">
            {errors.languages.message}
          </p>
        )}

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

export default Step4Languages;
