"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  SlidersHorizontal,
  Heart,
  Globe,
  Languages,
  Wifi,
  MapPin,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "react-hot-toast";
import { useState } from "react";

// Define the schema for the filter form
const filterSchema = z.object({
  minAge: z.number().min(18).max(100),
  maxAge: z.number().min(18).max(100),
  gender: z.string().optional(),
  lookingFor: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  isOnline: z.boolean().optional(),
  interests: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  distanceFromUser: z.number().min(1).max(500).optional(),
});

const interestsList = [
  "Travel",
  "Music",
  "Sports",
  "Reading",
  "Cooking",
  "Photography",
  "Art",
  "Movies",
  "Dancing",
  "Hiking",
];

const languagesList = [
  "English",
  "Spanish",
  "French",
  "German",
  "Mandarin",
  "Hindi",
  "Arabic",
  "Portuguese",
  "Russian",
  "Japanese",
];

const countriesList = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "India",
  "France",
  "Germany",
  "Japan",
  "Brazil",
  "Spain",
];

export function MemberFilters({
  onApplyFilters,
}: {
  onApplyFilters: (filters: z.infer<typeof filterSchema>) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      minAge: 18,
      maxAge: 60,
      distanceFromUser: 50,
      isOnline: false,
      interests: [],
      languages: [],
    },
  });

  const { watch, reset, handleSubmit, control } = form;
  const currentFilters = watch();

  const onSubmit = (data: z.infer<typeof filterSchema>) => {
    onApplyFilters(data);
    setIsOpen(false);
    toast.success("Filters applied!");
  };

  const onReset = () => {
    reset({
      minAge: 18,
      maxAge: 60,
      distanceFromUser: 50,
      isOnline: false,
      interests: [],
      languages: [],
    });
    toast.success("Filters reset!");
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="gap-2 bg-white border-pink-200 hover:bg-pink-50 text-pink-600"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
        {Object.values(currentFilters).some((val) =>
          Array.isArray(val)
            ? val.length > 0
            : val !== undefined &&
              val !== false &&
              val !== 18 &&
              val !== 60 &&
              val !== 50
        ) && (
          <span className="ml-1 bg-pink-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
            {
              Object.values(currentFilters).filter((val) =>
                Array.isArray(val)
                  ? val.length > 0
                  : val !== undefined &&
                    val !== false &&
                    val !== 18 &&
                    val !== 60 &&
                    val !== 50
              ).length
            }
          </span>
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-pink-600">
              <SlidersHorizontal className="w-5 h-5" />
              Filter Members
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
              {/* Age Range */}
              <FormField
                control={control}
                name="minAge"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center mb-2">
                      <FormLabel className="flex items-center gap-2">
                        <User className="w-4 h-4 text-pink-500" />
                        Age Range
                      </FormLabel>
                      <span className="text-sm text-pink-600">
                        {watch("minAge")} - {watch("maxAge")}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormControl>
                        <Slider
                          min={18}
                          max={100}
                          value={[field.value]}
                          onValueChange={(val) => field.onChange(val[0])}
                        />
                      </FormControl>
                      <FormField
                        control={control}
                        name="maxAge"
                        render={({ field: maxAgeField }) => (
                          <FormControl>
                            <Slider
                              min={18}
                              max={100}
                              value={[maxAgeField.value]}
                              onValueChange={(val) =>
                                maxAgeField.onChange(val[0])
                              }
                            />
                          </FormControl>
                        )}
                      />
                    </div>
                  </FormItem>
                )}
              />

              {/* Gender & Looking For */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-pink-500" />
                        Gender
                      </FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Any gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="lookingFor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4 text-pink-500" />
                        Looking For
                      </FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Any preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="relationship">
                            Relationship
                          </SelectItem>
                          <SelectItem value="friendship">Friendship</SelectItem>
                          <SelectItem value="casual">Casual Dating</SelectItem>
                          <SelectItem value="networking">Networking</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              {/* Location */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 mb-2">
                        <Globe className="w-4 h-4 text-pink-500" />
                        Country
                      </FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Any country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countriesList.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-pink-500" />
                        City
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Any city" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Distance */}
              <FormField
                control={control}
                name="distanceFromUser"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center mb-2">
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-pink-500" />
                        Maximum Distance (km)
                      </FormLabel>
                      <span className="text-sm text-pink-600">
                        {field.value} km
                      </span>
                    </div>
                    <FormControl>
                      <Slider
                        min={1}
                        max={500}
                        value={[field.value || 50]}
                        onValueChange={(val) => field.onChange(val[0])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Online Now */}
              <FormField
                control={control}
                name="isOnline"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-pink-500" />
                      Online Now
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* Interests */}
              <FormField
                control={control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-pink-500" />
                      Interests
                    </FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {interestsList.map((interest) => (
                        <Button
                          key={interest}
                          type="button"
                          variant={
                            field.value?.includes(interest)
                              ? "default"
                              : "outline"
                          }
                          className={`rounded-full ${
                            field.value?.includes(interest)
                              ? "bg-pink-500 hover:bg-pink-600"
                              : "border-pink-200 hover:bg-pink-50"
                          }`}
                          size="sm"
                          onClick={() => {
                            const newInterests = field.value?.includes(interest)
                              ? field.value.filter((i) => i !== interest)
                              : [...(field.value || []), interest];
                            field.onChange(newInterests);
                          }}
                        >
                          {interest}
                        </Button>
                      ))}
                    </div>
                  </FormItem>
                )}
              />

              {/* Languages */}
              <FormField
                control={control}
                name="languages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 mb-2">
                      <Languages className="w-4 h-4 text-pink-500" />
                      Languages
                    </FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {languagesList.map((language) => (
                        <Button
                          key={language}
                          type="button"
                          variant={
                            field.value?.includes(language)
                              ? "default"
                              : "outline"
                          }
                          className={`rounded-full ${
                            field.value?.includes(language)
                              ? "bg-pink-500 hover:bg-pink-600"
                              : "border-pink-200 hover:bg-pink-50"
                          }`}
                          size="sm"
                          onClick={() => {
                            const newLanguages = field.value?.includes(language)
                              ? field.value.filter((l) => l !== language)
                              : [...(field.value || []), language];
                            field.onChange(newLanguages);
                          }}
                        >
                          {language}
                        </Button>
                      ))}
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onReset}
                  className="border-pink-200 text-pink-600 hover:bg-pink-50"
                >
                  Reset All
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                >
                  Apply Filters
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
