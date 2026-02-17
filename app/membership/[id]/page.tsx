"use client";

import { useParams, useRouter } from "next/navigation";
import { Check, ArrowLeft, Shield, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useMembershipPlan, useSubscribeMembership } from "@/hooks/membership/use-membership";
import Link from "next/link";

const tierLabels: Record<string, string> = {
  basic: "Biasa",
  pro: "Khusus",
  elite: "Luar Biasa",
};

const tierDescriptions: Record<string, string> = {
  basic: "Cocok untuk pemula yang ingin memulai pembelajaran",
  pro: "Untuk profesional yang ingin meningkatkan kemampuan",
  elite: "Akses penuh ke semua fitur premium",
};

export default function MembershipDetailPage() {
  const params = useParams();
  const router = useRouter();
  const planId = params.id as string;
  
  const { data: plan, isLoading } = useMembershipPlan(planId);
  const subscribeMutation = useSubscribeMembership();

  const handleSubscribe = () => {
    subscribeMutation.mutate(
      { plan_id: planId, duration_months: 1 },
      {
        onSuccess: () => {
          router.push("/dashboard/membership");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-slate-200 rounded w-48" />
            <div className="h-64 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Paket tidak ditemukan
          </h1>
          <Button asChild>
            <Link href="/#membership">Kembali ke Daftar Paket</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/#membership"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Daftar Paket
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Plan Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="text-lg px-4 py-1">
                    {tierLabels[plan.tier]}
                  </Badge>
                  {plan.is_popular && (
                    <Badge className="bg-blue-600 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Populer
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-3xl">{plan.name}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {plan.description || tierDescriptions[plan.tier]}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4">
                    Fitur yang Termasuk:
                  </h3>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="rounded-full bg-green-100 p-1">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-slate-900">Garansi 7 Hari</h4>
                      <p className="text-sm text-slate-600">
                        Uang kembali jika tidak puas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-slate-900">Akses Fleksibel</h4>
                      <p className="text-sm text-slate-600">
                        Bisa upgrade kapan saja
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subscribe Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-bold">
                  Rp {plan.price.toLocaleString("id-ID")}
                </CardTitle>
                <CardDescription>per bulan</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600">
                    Berlaku selama <span className="font-semibold">30 hari</span> setelah pembayaran
                  </p>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleSubscribe}
                  disabled={subscribeMutation.isPending}
                >
                  {subscribeMutation.isPending ? "Memproses..." : "Berlangganan Sekarang"}
                </Button>

                <p className="text-xs text-center text-slate-500">
                  Dengan berlangganan, Anda menyetujui{" "}
                  <Link href="/terms" className="underline">
                    Syarat & Ketentuan
                  </Link>
                </p>
              </CardContent>

              <CardFooter className="flex flex-col gap-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Pembayaran aman & terenkripsi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Support 24/7</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
