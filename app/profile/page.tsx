"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Briefcase,
  Calendar,
  Edit2,
  Save,
  X,
  ArrowLeft,
  Loader2,
  Shield,
  Clock,
  GraduationCap,
} from "lucide-react";
import useGetProfile from "@/hooks/profile/use-get-profile";
import useUpdateProfile from "@/hooks/profile/use-update-profile";
import useGetUser from "@/hooks/auth/use-get-user";
import { useLanguage } from "@/lib/language-context";

export default function ProfilePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { data: authUser, hasLoggedin, isLoading: authLoading } = useGetUser();
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const [tab, setTab] = useState("info");
  const {
    updateProfile,
    isLoading: isUpdating,
    isEditing,
    setIsEditing,
  } = useUpdateProfile();

  const [editData, setEditData] = useState({
    username: "",
    phone: "",
    bio: "",
    address: "",
    city: "",
    province: "",
    postal_code: "",
    occupation: "",
    institution: "",
    date_of_birth: "",
  });

  useEffect(() => {
    if (profile) {
      setEditData({
        username: profile.username || "",
        phone: profile.phone || "",
        bio: profile.bio || "",
        address: profile.address || "",
        city: profile.city || "",
        province: profile.province || "",
        postal_code: profile.postal_code || "",
        occupation: profile.occupation || "",
        institution: profile.institution || "",
        date_of_birth: profile.date_of_birth
          ? new Date(profile.date_of_birth).toISOString().split("T")[0]
          : "",
      });
    }
  }, [profile]);

  const isLoading = authLoading || profileLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  if (!hasLoggedin || !authUser) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50">
        <p className="text-slate-600">{t("Anda harus login untuk melihat profil.", "You must log in to view your profile.")}</p>
        <Link href="/login">
          <Button>{t("Masuk", "Log In")}</Button>
        </Link>
      </div>
    );
  }

  const handleSave = () => {
    const payload: Record<string, string> = {};
    if (editData.username && editData.username !== profile?.username)
      payload.username = editData.username;
    if (editData.phone !== (profile?.phone || ""))
      payload.phone = editData.phone;
    if (editData.bio !== (profile?.bio || "")) payload.bio = editData.bio;
    if (editData.address !== (profile?.address || ""))
      payload.address = editData.address;
    if (editData.city !== (profile?.city || "")) payload.city = editData.city;
    if (editData.province !== (profile?.province || ""))
      payload.province = editData.province;
    if (editData.postal_code !== (profile?.postal_code || ""))
      payload.postal_code = editData.postal_code;
    if (editData.occupation !== (profile?.occupation || ""))
      payload.occupation = editData.occupation;
    if (editData.institution !== (profile?.institution || ""))
      payload.institution = editData.institution;
    if (
      editData.date_of_birth !==
      (profile?.date_of_birth
        ? new Date(profile.date_of_birth).toISOString().split("T")[0]
        : "")
    )
      payload.date_of_birth = editData.date_of_birth;

    if (Object.keys(payload).length > 0) {
      updateProfile(payload);
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setEditData({
        username: profile.username || "",
        phone: profile.phone || "",
        bio: profile.bio || "",
        address: profile.address || "",
        city: profile.city || "",
        province: profile.province || "",
        postal_code: profile.postal_code || "",
        occupation: profile.occupation || "",
        institution: profile.institution || "",
        date_of_birth: profile.date_of_birth
          ? new Date(profile.date_of_birth).toISOString().split("T")[0]
          : "",
      });
    }
    setIsEditing(false);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-linear-to-r from-teal-600 to-teal-700">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="mb-4 flex items-center gap-1 text-sm text-teal-100 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("Kembali", "Back")}
          </button>

          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            {/* Avatar */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-4xl font-bold text-white ring-4 ring-white/30">
              {profile?.username?.charAt(0).toUpperCase() || "U"}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">
                {profile?.username || "User"}
              </h1>
              <p className="mt-1 text-teal-100">{profile?.email}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge className="border-teal-400 bg-teal-500/30 text-white">
                  <Shield className="mr-1 h-3 w-3" />
                  {profile?.role === "admin" ? "Admin" : "Member"}
                </Badge>
                {profile?.occupation && (
                  <Badge
                    variant="outline"
                    className="border-teal-400 text-teal-100"
                  >
                    <Briefcase className="mr-1 h-3 w-3" />
                    {profile.occupation}
                  </Badge>
                )}
                {profile?.institution && (
                  <Badge
                    variant="outline"
                    className="border-teal-400 text-teal-100"
                  >
                    <GraduationCap className="mr-1 h-3 w-3" />
                    {profile.institution}
                  </Badge>
                )}
              </div>
            </div>

            {/* Edit Button */}
            <div>
              {!isEditing ? (
                <Button
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="mr-2 h-4 w-4" />
                  {t("Edit Profil", "Edit Profile")}
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    disabled={isUpdating}
                    className="bg-white text-teal-700 hover:bg-teal-50"
                  >
                    {isUpdating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    {t("Simpan", "Save")}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                    onClick={handleCancel}
                    disabled={isUpdating}
                  >
                    <X className="mr-2 h-4 w-4" />
                    {t("Batal", "Cancel")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Tabs value={tab} onValueChange={setTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info" >{t("Informasi Pribadi", "Personal Information")}</TabsTrigger>
            <TabsTrigger value="address">{t("Alamat", "Address")}</TabsTrigger>
          </TabsList>

          {/* Tab: Informasi Pribadi */}
          <TabsContent value="info" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5 text-teal-600" />
                  {t("Data Diri", "Personal Data")}
                </CardTitle>
                <CardDescription>
                  {t("Informasi dasar akun Anda di Dewan Hukum Siber Indonesia", "Your basic account information at Dewan Hukum Siber Indonesia")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Username */}
                <div className="grid gap-2">
                  <Label
                    htmlFor="username"
                    className="flex items-center gap-2 text-sm font-medium text-slate-600"
                  >
                    <User className="h-4 w-4" />
                    {t("Nama Lengkap", "Full Name")}
                  </Label>
                  {isEditing ? (
                    <Input
                      id="username"
                      value={editData.username}
                      onChange={(e) =>
                        setEditData({ ...editData, username: e.target.value })
                      }
                      placeholder={t("Masukkan nama lengkap", "Enter your full name")}
                    />
                  ) : (
                    <p className="rounded-lg bg-slate-50 px-4 py-2.5 text-slate-900">
                      {profile?.username || "-"}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <Mail className="h-4 w-4" />
                    {t("Email", "Email")}
                  </Label>
                  <p className="rounded-lg bg-slate-100 px-4 py-2.5 text-slate-500">
                    {profile?.email || "-"}
                    <span className="ml-2 text-xs text-slate-400">
                      {t("(tidak dapat diubah)", "(cannot be changed)")}
                    </span>
                  </p>
                </div>

                {/* Phone */}
                <div className="grid gap-2">
                  <Label
                    htmlFor="phone"
                    className="flex items-center gap-2 text-sm font-medium text-slate-600"
                  >
                    <Phone className="h-4 w-4" />
                    {t("No. Telepon", "Phone Number")}
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editData.phone}
                      onChange={(e) =>
                        setEditData({ ...editData, phone: e.target.value })
                      }
                      placeholder={t("Masukkan nomor telepon", "Enter your phone number")}
                    />
                  ) : (
                    <p className="rounded-lg bg-slate-50 px-4 py-2.5 text-slate-900">
                      {profile?.phone || "-"}
                    </p>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="grid gap-2">
                  <Label
                    htmlFor="date_of_birth"
                    className="flex items-center gap-2 text-sm font-medium text-slate-600"
                  >
                    <Calendar className="h-4 w-4" />
                    {t("Tanggal Lahir", "Date of Birth")}
                  </Label>
                  {isEditing ? (
                    <Input
                      id="date_of_birth"
                      type="date"
                      value={editData.date_of_birth}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          date_of_birth: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className="rounded-lg bg-slate-50 px-4 py-2.5 text-slate-900">
                      {formatDate(profile?.date_of_birth || null)}
                    </p>
                  )}
                </div>

                <Separator />

                {/* Occupation */}
                <div className="grid gap-2">
                  <Label
                    htmlFor="occupation"
                    className="flex items-center gap-2 text-sm font-medium text-slate-600"
                  >
                    <Briefcase className="h-4 w-4" />
                    {t("Pekerjaan", "Occupation")}
                  </Label>
                  {isEditing ? (
                    <Input
                      id="occupation"
                      value={editData.occupation}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          occupation: e.target.value,
                        })
                      }
                      placeholder={t("Contoh: Advokat, Mahasiswa Hukum", "Example: Lawyer, Law Student")}
                    />
                  ) : (
                    <p className="rounded-lg bg-slate-50 px-4 py-2.5 text-slate-900">
                      {profile?.occupation || "-"}
                    </p>
                  )}
                </div>

                {/* Institution */}
                <div className="grid gap-2">
                  <Label
                    htmlFor="institution"
                    className="flex items-center gap-2 text-sm font-medium text-slate-600"
                  >
                    <Building className="h-4 w-4" />
                    {t("Institusi / Organisasi", "Institution / Organization")}
                  </Label>
                  {isEditing ? (
                    <Input
                      id="institution"
                      value={editData.institution}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          institution: e.target.value,
                        })
                      }
                      placeholder={t("Contoh: Universitas Indonesia", "Example: Universitas Indonesia")}
                    />
                  ) : (
                    <p className="rounded-lg bg-slate-50 px-4 py-2.5 text-slate-900">
                      {profile?.institution || "-"}
                    </p>
                  )}
                </div>

                <Separator />

                {/* Bio */}
                <div className="grid gap-2">
                  <Label
                    htmlFor="bio"
                    className="text-sm font-medium text-slate-600"
                  >
                    {t("Bio", "Bio")}
                  </Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={editData.bio}
                      onChange={(e) =>
                        setEditData({ ...editData, bio: e.target.value })
                      }
                      placeholder={t("Ceritakan sedikit tentang diri Anda...", "Tell us a little about yourself...")}
                      rows={4}
                      maxLength={500}
                    />
                  ) : (
                    <p className="min-h-[60px] rounded-lg bg-slate-50 px-4 py-2.5 text-slate-900">
                      {profile?.bio || t("Belum ada bio.", "No bio yet.")}
                    </p>
                  )}
                  {isEditing && (
                    <p className="text-right text-xs text-slate-400">
                      {editData.bio.length}/500
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Account Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-teal-600" />
                  {t("Informasi Akun", "Account Information")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-slate-50 p-4">
                    <p className="text-xs font-medium text-slate-500">
                      {t("Bergabung Sejak", "Joined Since")}
                    </p>
                    <p className="mt-1 font-medium text-slate-900">
                      {formatDate(profile?.created_at || null)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-4">
                    <p className="text-xs font-medium text-slate-500">
                      {t("Terakhir Diperbarui", "Last Updated")}
                    </p>
                    <p className="mt-1 font-medium text-slate-900">
                      {profile?.updated_at
                        ? formatDate(profile.updated_at)
                        : t("Belum pernah", "Never")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Alamat */}
          <TabsContent value="address" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-teal-600" />
                  {t("Alamat", "Address")}
                </CardTitle>
                <CardDescription>
                  {t("Informasi alamat tempat tinggal Anda", "Your residential address information")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Address */}
                <div className="grid gap-2">
                  <Label
                    htmlFor="address"
                    className="text-sm font-medium text-slate-600"
                  >
                    {t("Alamat Lengkap", "Full Address")}
                  </Label>
                  {isEditing ? (
                    <Textarea
                      id="address"
                      value={editData.address}
                      onChange={(e) =>
                        setEditData({ ...editData, address: e.target.value })
                      }
                      placeholder={t("Masukkan alamat lengkap", "Enter your full address")}
                      rows={3}
                    />
                  ) : (
                    <p className="min-h-10 rounded-lg bg-slate-50 px-4 py-2.5 text-slate-900">
                      {profile?.address || "-"}
                    </p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* City */}
                  <div className="grid gap-2">
                    <Label
                      htmlFor="city"
                      className="text-sm font-medium text-slate-600"
                    >
                      {t("Kota / Kabupaten", "City / District")}
                    </Label>
                    {isEditing ? (
                      <Input
                        id="city"
                        value={editData.city}
                        onChange={(e) =>
                          setEditData({ ...editData, city: e.target.value })
                        }
                        placeholder={t("Contoh: Jakarta Selatan", "Example: South Jakarta")}
                      />
                    ) : (
                      <p className="rounded-lg bg-slate-50 px-4 py-2.5 text-slate-900">
                        {profile?.city || "-"}
                      </p>
                    )}
                  </div>

                  {/* Province */}
                  <div className="grid gap-2">
                    <Label
                      htmlFor="province"
                      className="text-sm font-medium text-slate-600"
                    >
                      {t("Provinsi", "Province")}
                    </Label>
                    {isEditing ? (
                      <Input
                        id="province"
                        value={editData.province}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            province: e.target.value,
                          })
                        }
                        placeholder={t("Contoh: DKI Jakarta", "Example: DKI Jakarta")}
                      />
                    ) : (
                      <p className="rounded-lg bg-slate-50 px-4 py-2.5 text-slate-900">
                        {profile?.province || "-"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Postal Code */}
                <div className="grid gap-2 sm:max-w-[200px]">
                  <Label
                    htmlFor="postal_code"
                    className="text-sm font-medium text-slate-600"
                  >
                    {t("Kode Pos", "Postal Code")}
                  </Label>
                  {isEditing ? (
                    <Input
                      id="postal_code"
                      value={editData.postal_code}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          postal_code: e.target.value,
                        })
                      }
                      placeholder={t("Contoh: 12345", "Example: 12345")}
                      maxLength={10}
                    />
                  ) : (
                    <p className="rounded-lg bg-slate-50 px-4 py-2.5 text-slate-900">
                      {profile?.postal_code || "-"}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
