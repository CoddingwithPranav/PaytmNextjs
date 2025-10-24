"use client";

import { useState, useRef } from "react";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/components/ui/card";
import { Edit, ChevronLeft, Upload } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Back Button */}
      <div className="flex justify-start">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 rounded-full hover-scale"
          asChild
        >
          <Link href="/dashboard">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-sm text-muted-foreground">Update your photo and personal details</p>
      </div>

      {/* Profile Card */}
      <Card className="rounded-2xl border-0 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-br from-primary/5 to-accent/5 pb-6">
          <div className="flex items-center gap-4">
            {/* Avatar with Upload */}
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent p-0.5">
                <div className="h-full w-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                  {avatarPreview ? (
                    <Image
                      src={avatarPreview}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold text-primary-foreground">
                      {firstName[0]}{lastName[0]}
                    </span>
                  )}
                </div>
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {/* Upload Button */}
              <button
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:scale-105 transition-transform"
              >
                <Upload className="h-4 w-4" />
              </button>
            </div>

            {/* Name */}
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {firstName} {lastName}
              </h2>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Form */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="rounded-xl h-12"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl h-12"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-xl h-12"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button
              className="w-full sm:w-auto rounded-full h-12 px-8 text-base font-semibold bg-primary hover:to-accent/90 text-white shadow-md transition-all hover:shadow-lg"
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}