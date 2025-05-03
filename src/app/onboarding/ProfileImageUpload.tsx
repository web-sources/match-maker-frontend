// components/ProfileImageUpload.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { compressImage } from "@/lib/image-utils";
import { Camera, Upload, Loader2, Webcam } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProfileImageUploadProps {
  initialImage?: string | File | null;
  onImageChange: (file: File | null) => void;
  className?: string;
  disabled?: boolean;
}

export function ProfileImageUpload({
  initialImage,
  onImageChange,
  className,
  disabled = false,
}: ProfileImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Initialize with any existing image
  useEffect(() => {
    if (!initialImage) {
      setPreviewImage(null);
      return;
    }

    if (typeof initialImage === "string") {
      setPreviewImage(initialImage);
    } else if (initialImage instanceof File) {
      const url = URL.createObjectURL(initialImage);
      setPreviewImage(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [initialImage]);

  // Start camera stream when modal opens
  useEffect(() => {
    if (showCameraModal) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [showCameraModal]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please check permissions.");
      setShowCameraModal(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob and then to File
    canvas.toBlob(async (blob) => {
      if (!blob) return;

      try {
        setIsUploading(true);
        const file = new File([blob], "profile-photo.jpg", {
          type: "image/jpeg",
        });

        // Compress the captured image
        const compressedFile = await compressImage(file, {
          quality: 0.8,
          maxWidth: 800,
          maxHeight: 800,
        });

        const previewUrl = URL.createObjectURL(compressedFile);
        setPreviewImage(previewUrl);
        onImageChange(compressedFile);
        setShowCameraModal(false);
      } catch (error) {
        console.error("Error processing image:", error);
      } finally {
        setIsUploading(false);
      }
    }, "image/jpeg", 0.8);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      try {
        const file = e.target.files[0];
        const compressedFile = await compressImage(file, {
          quality: 0.8,
          maxWidth: 800,
          maxHeight: 800,
        });

        const previewUrl = URL.createObjectURL(compressedFile);
        setPreviewImage(previewUrl);
        onImageChange(compressedFile);
      } catch (error) {
        console.error("Error processing image:", error);
        onImageChange(null);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const triggerFileInput = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    if (disabled) return;
    setPreviewImage(null);
    onImageChange(null);
  };

  return (
    <div className={cn("flex flex-col items-center space-y-3", className)}>
      {/* Image Preview/Upload Area */}
      <div
        onClick={triggerFileInput}
        className={cn(
          "relative w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center cursor-pointer overflow-hidden group",
          disabled && "cursor-not-allowed opacity-70",
          !disabled && "hover:border-primary"
        )}
      >
        {previewImage ? (
          <>
            <Image
              src={previewImage}
              alt="Profile preview"
              fill
              className="object-cover"
              sizes="128px"
            />
            {!disabled && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            {isUploading ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
              <>
                <Upload className="w-6 h-6 mb-1" />
                <span className="text-sm">Upload Photo</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* File Input (hidden) */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
        disabled={disabled}
      />

      {/* Camera Capture Modal */}
      <Dialog open={showCameraModal} onOpenChange={setShowCameraModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Take a photo</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-full aspect-square bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>
            <Button onClick={captureImage} className="w-full">
              Capture Photo
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCameraModal(true)}
          disabled={disabled}
        >
          <Webcam className="w-4 h-4 mr-2" />
          Take Photo
        </Button>
        {previewImage && !disabled && (
          <Button
            variant="outline"
            size="sm"
            onClick={removeImage}
            className="text-red-500 hover:text-red-600"
          >
            Remove
          </Button>
        )}
      </div>

      {/* Help Text */}
      {!previewImage && !isUploading && (
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          JPG, PNG (Max 5MB) or take a photo
        </p>
      )}
    </div>
  );
}