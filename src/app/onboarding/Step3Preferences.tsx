"use client";

import { useForm } from "react-hook-form";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import * as z from "zod";
import clsx from "clsx";
import { useEffect, useState } from "react";

const schema = z.object({
  relationship_goal: z.string().nonempty("Please select a goal"),
  smoking: z.coerce.boolean({ required_error: "Please select an option" }),
  drinking: z.coerce.boolean({ required_error: "Please select an option" }),
  languages_spoken: z
    .array(z.string())
    .min(1, "Please select at least one language"),
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

const Step3Preferences = ({ isEditing = false }: { isEditing?: boolean }) => {
  const { updateData, data } = useOnboardingStore();
  const [search, setSearch] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      relationship_goal: data.relationship_goal || "",
      smoking: typeof data.smoking === "boolean" ? data.smoking : undefined,
      drinking: typeof data.drinking === "boolean" ? data.drinking : undefined,
      languages_spoken: data.languages
        ? data.languages.split(",").map((l) => l.trim())
        : [],
    },
  });

  useEffect(() => {
    if (isEditing && data) {
      reset({
        relationship_goal: data.relationship_goal || "",
        smoking: typeof data.smoking === "boolean" ? data.smoking : undefined,
        drinking:
          typeof data.drinking === "boolean" ? data.drinking : undefined,
        languages_spoken: data.languages
          ? data.languages.split(",").map((l) => l.trim())
          : [],
      });
    }
  }, [isEditing, data, reset]);

  const onSubmit = (values: FormData) => {
    const { languages_spoken, ...rest } = values;

    const payload = {
      ...rest,
      languages_spoken: languages_spoken.join(", "),
    };

    console.log(payload, "values from step 3");
    updateData(payload);
    document
      .querySelector(".swiper-button-next")
      ?.dispatchEvent(new Event("click"));
  };

  const selected = watch("languages_spoken");
  const filteredLanguages = LANGUAGES.filter((lang) =>
    lang.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4 lg:px-8">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl space-y-6 bg-white shadow-xl rounded-3xl p-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="space-y-1 text-center">
          <p className="text-xs text-gray-400">
            {isEditing ? "Edit Profile" : "Step 2 of 4"}
          </p>
          <h2 className="text-2xl font-bold text-gray-800">
            Preferences + Languages You Speak
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Relationship Goal
            </label>
            <select
              {...register("relationship_goal")}
              className={clsx(
                "w-full p-3 rounded-xl border text-sm bg-white",
                errors.relationship_goal ? "border-red-500" : "border-gray-300"
              )}
            >
              <option value="">Select</option>
              <option value="hookup">Casual / Hookup</option>
              <option value="dating">Long-term Dating</option>
              <option value="friends">Just Friends</option>
              <option value="open">Open Relationship</option>
              <option value="fun">Fun & Explore</option>
            </select>
            {errors.relationship_goal && (
              <p className="text-sm text-red-500 mt-1">
                {errors.relationship_goal.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Do you smoke?
            </label>
            <select
              {...register("smoking")}
              className={clsx(
                "w-full p-3 rounded-xl border text-sm bg-white",
                errors.smoking ? "border-red-500" : "border-gray-300"
              )}
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors.smoking && (
              <p className="text-sm text-red-500 mt-1">
                {errors.smoking.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Do you drink?
            </label>
            <select
              {...register("drinking")}
              className={clsx(
                "w-full p-3 rounded-xl border text-sm bg-white",
                errors.drinking ? "border-red-500" : "border-gray-300"
              )}
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors.drinking && (
              <p className="text-sm text-red-500 mt-1">
                {errors.drinking.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Languages
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search languages..."
              className="w-full p-3 rounded-xl border border-gray-300 text-sm"
            />
          </div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Languages You Speak
          </label>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => (
                <label
                  key={lang}
                  className={clsx(
                    "flex items-center gap-3 p-3 rounded-xl border cursor-pointer text-sm",
                    selected?.includes(lang)
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-300 bg-white"
                  )}
                >
                  <input
                    type="checkbox"
                    value={lang}
                    {...register("languages_spoken")}
                    className="form-checkbox accent-pink-600"
                  />
                  {lang}
                </label>
              ))
            ) : (
              <p className="text-sm text-gray-500">No languages found</p>
            )}
          </div>
          {errors.languages_spoken && (
            <p className="text-sm text-red-500 mt-1">
              {errors.languages_spoken.message}
            </p>
          )}
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

export default Step3Preferences;
