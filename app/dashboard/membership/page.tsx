"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Award,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Crown,
  Shield,
  Star,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useMyMembership, useMembershipPlans } from "@/hooks/membership/use-membership";

const TIER_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType; bgGradient: string }> = {
  basic: {
    label: "Biasa",
    color: "text-slate-600",
    icon: Shield,
    bgGradient: "from-slate-50 to-slate-100",
  },
  pro: {
    label: "Khusus",
    color: "text-blue-600",
    icon: Zap,
    bgGradient: "from-blue-50 to-blue-100",
  },
  elite: {
    label: "Luar Biasa",
    color: "text-amber-600",
    icon: Crown,
    bgGradient: "from-amber-50 to-amber-100",
  },
};

export default function MembershipDashboardPage() {
  const { data: myMembership, isLoading: isLoadingMembership } = useMyMembership();
  const { data: plans, isLoading: isLoadingPlans } = useMembershipPlans();

  const isLoading = isLoadingMembership || isLoadingPlans;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Memuat data membership...</p>
        </div>
      </div>
    );
  }

  const hasActiveMembership = myMembership && new Date(myMembership.end_date) > new Date();
  const currentTier = myMembership?.plan?.tier ?? "basic";
  const tierConfig = TIER_CONFIG[currentTier] ?? TIER_CONFIG.basic;
  const TierIcon = tierConfig.icon;

  // Calculate days remaining
  const daysRemaining = myMembership
    ? Math.max(0, Math.ceil((new Date(myMembership.end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;
  
  // Calculate membership progress (for current period)
  const totalDays = myMembership
    ? Math.ceil((new Date(myMembership.end_date).getTime() - new Date(myMembership.start_date).getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const progressPercent = totalDays > 0 ? Math.round(((totalDays - daysRemaining) / totalDays) * 100) : 0;

  // Get upgrade options
  const upgradeOptions = plans?.filter((plan) => {
    const tierOrder = { basic: 1, pro: 2, elite: 3 };
    return tierOrder[plan.tier as keyof typeof tierOrder] > tierOrder[currentTier as keyof typeof tierOrder];
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Membership</h1>
          <p className="text-slate-600 mt-2">
            Kelola dan lihat status keanggotaan Anda
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Membership Card */}
            <Card className={cn("overflow-hidden bg-gradient-to-br", tierConfig.bgGradient)}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge
                    className={cn(
                      "text-sm px-3 py-1",
                      hasActiveMembership ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    )}
                  >
                    {hasActiveMembership ? "Aktif" : "Tidak Aktif"}
                  </Badge>
                  <TierIcon className={cn("h-8 w-8", tierConfig.color)} />
                </div>
              </CardHeader>
              <CardContent>
                {hasActiveMembership ? (
                  <div className="space-y-6">
                    {/* Tier Info */}
                    <div className="text-center">
                      <p className={cn("text-4xl font-bold", tierConfig.color)}>
                        Anggota {tierConfig.label}
                      </p>
                      <p className="text-slate-600 mt-2">{myMembership.plan?.name}</p>
                    </div>

                    {/* Period Progress */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-slate-600">Periode Berlaku</span>
                        <span className="font-medium">{daysRemaining} hari tersisa</span>
                      </div>
                      <Progress value={progressPercent} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                        <span>
                          {new Date(myMembership.start_date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span>
                          {new Date(myMembership.end_date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Warning if expiring soon */}
                    {daysRemaining <= 7 && (
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-yellow-800">
                              Membership akan segera berakhir
                            </p>
                            <p className="text-sm text-yellow-700 mt-1">
                              Perpanjang sebelum {new Date(myMembership.end_date).toLocaleDateString("id-ID")} agar tidak kehilangan akses.
                            </p>
                            <Button size="sm" className="mt-3" asChild>
                              <Link href={`/membership/${myMembership.plan_id}`}>
                                Perpanjang Sekarang
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-xl font-semibold text-slate-900">
                      Anda belum memiliki membership aktif
                    </p>
                    <p className="text-slate-600 mt-2 mb-6">
                      Bergabung sekarang untuk mengakses semua fitur eksklusif
                    </p>
                    <Button asChild>
                      <Link href="/membership">Pilih Paket Membership</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Features Access */}
            {hasActiveMembership && (
              <Card>
                <CardHeader>
                  <CardTitle>Akses Fitur</CardTitle>
                  <CardDescription>
                    Fitur yang tersedia dengan membership Anda
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Features based on tier */}
                    <FeatureItem
                      icon={Award}
                      title="Video Training"
                      description="Akses semua video training"
                      available={true}
                    />
                    <FeatureItem
                      icon={Calendar}
                      title="Ujian Online"
                      description="Ikuti ujian dan sertifikasi"
                      available={["pro", "elite"].includes(currentTier)}
                    />
                    <FeatureItem
                      icon={Star}
                      title="Forum Diskusi"
                      description="Diskusi dengan mentor"
                      available={["pro", "elite"].includes(currentTier)}
                    />
                    <FeatureItem
                      icon={Crown}
                      title="Kelas Live"
                      description="Sesi live dengan instruktur"
                      available={currentTier === "elite"}
                    />
                    <FeatureItem
                      icon={Award}
                      title="Sertifikat"
                      description="Sertifikat penyelesaian"
                      available={currentTier === "elite"}
                    />
                    <FeatureItem
                      icon={Zap}
                      title="Priority Support"
                      description="Dukungan prioritas"
                      available={currentTier === "elite"}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            {hasActiveMembership && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ringkasan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Bergabung</span>
                    </div>
                    <span className="font-medium text-sm">
                      {new Date(myMembership.start_date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Berlaku sampai</span>
                    </div>
                    <span className="font-medium text-sm">
                      {new Date(myMembership.end_date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Upgrade Options */}
            {upgradeOptions && upgradeOptions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upgrade Membership</CardTitle>
                  <CardDescription>
                    Tingkatkan untuk mendapat lebih banyak fitur
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upgradeOptions.map((plan) => {
                    const planTierConfig = TIER_CONFIG[plan.tier] ?? TIER_CONFIG.basic;
                    const PlanIcon = planTierConfig.icon;

                    return (
                      <Link
                        key={plan.id}
                        href={`/membership/${plan.id}`}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn("p-2 rounded-lg", `bg-${planTierConfig.color.replace("text-", "")}/10`)}>
                            <PlanIcon className={cn("h-5 w-5", planTierConfig.color)} />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{plan.name}</p>
                            <p className="text-xs text-slate-500">
                              Rp {plan.price.toLocaleString("id-ID")}/bulan
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                      </Link>
                    );
                  })}
                </CardContent>
              </Card>
            )}

            {/* Help Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-slate-600 mb-4">
                    Butuh bantuan dengan membership Anda?
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/contact">Hubungi Kami</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Feature Item Component
function FeatureItem({
  icon: Icon,
  title,
  description,
  available,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  available: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg",
        available ? "bg-green-50" : "bg-slate-50"
      )}
    >
      <div
        className={cn(
          "p-2 rounded-lg",
          available ? "bg-green-100" : "bg-slate-200"
        )}
      >
        <Icon
          className={cn(
            "h-4 w-4",
            available ? "text-green-600" : "text-slate-400"
          )}
        />
      </div>
      <div>
        <p
          className={cn(
            "font-medium text-sm",
            available ? "text-slate-900" : "text-slate-400"
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            "text-xs",
            available ? "text-slate-600" : "text-slate-400"
          )}
        >
          {description}
        </p>
      </div>
      {available ? (
        <CheckCircle className="h-4 w-4 text-green-600 ml-auto shrink-0" />
      ) : (
        <Badge variant="outline" className="ml-auto text-xs shrink-0">
          Upgrade
        </Badge>
      )}
    </div>
  );
}
