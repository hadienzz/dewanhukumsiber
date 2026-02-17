"use client";

import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useMembershipPlans } from "@/hooks/membership/use-membership";
import Link from "next/link";

const tierColors: Record<string, string> = {
  basic: "border-slate-200",
  pro: "border-blue-500 ring-2 ring-blue-500/20",
  elite: "border-yellow-500 ring-2 ring-yellow-500/20",
};

const tierBadgeColors: Record<string, string> = {
  basic: "bg-slate-100 text-slate-700",
  pro: "bg-blue-100 text-blue-700",
  elite: "bg-yellow-100 text-yellow-700",
};

const tierLabels: Record<string, string> = {
  basic: "Biasa",
  pro: "Khusus",
  elite: "Luar Biasa",
};

export function MembershipSection() {
  const { data: plans, isLoading } = useMembershipPlans();

  if (isLoading) {
    return (
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Pilih Paket Membership
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Dapatkan akses ke berbagai fitur pembelajaran sesuai kebutuhan Anda
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="space-y-4">
                  <div className="h-6 bg-slate-200 rounded w-24" />
                  <div className="h-10 bg-slate-200 rounded w-32" />
                </CardHeader>
                <CardContent className="space-y-3">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-4 bg-slate-200 rounded" />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="membership" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4">Membership</Badge>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Pilih Paket Membership
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Dapatkan akses ke berbagai fitur pembelajaran sesuai kebutuhan Anda.
            Upgrade kapan saja untuk mendapatkan lebih banyak manfaat.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans?.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "relative flex flex-col transition-all hover:shadow-lg",
                tierColors[plan.tier]
              )}
            >
              {plan.is_popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Paling Populer
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <Badge
                  variant="secondary"
                  className={cn("w-fit mx-auto mb-2", tierBadgeColors[plan.tier])}
                >
                  {tierLabels[plan.tier]}
                </Badge>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-900">
                    Rp {plan.price.toLocaleString("id-ID")}
                  </span>
                  <span className="text-slate-500">/bulan</span>
                </div>
                <CardDescription className="mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  asChild
                  className="w-full"
                  variant={plan.is_popular ? "default" : "outline"}
                >
                  <Link href={`/membership/${plan.id}`}>
                    Pilih {tierLabels[plan.tier]}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Semua paket termasuk akses ke komunitas eksklusif dan support prioritas.
          </p>
        </div>
      </div>
    </section>
  );
}
