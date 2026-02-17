"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import {
  Participant,
  getMembershipLabel,
  getPaymentStatusLabel,
  getPaymentStatusColor,
  getRegistrationStatusLabel,
  getRegistrationStatusColor,
  getRemainingProDays,
  formatMembershipExpiry,
  formatParticipantDate,
  getParticipantStats,
} from "@/lib/participants-data";
import {
  Search,
  Users,
  Crown,
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Mail,
  Phone,
  Building2,
  Calendar,
  Download,
  Filter,
} from "lucide-react";

interface ParticipantListProps {
  participants: Participant[];
  title?: string;
}

export function ParticipantList({
  participants,
  title = "Daftar Peserta",
}: ParticipantListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const stats = getParticipantStats(participants);

  // Filter participants based on search and filters
  const filteredParticipants = participants.filter((p) => {
    // Search filter
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.company &&
        p.company.toLowerCase().includes(searchQuery.toLowerCase()));

    // Tab filter (membership)
    const matchesMembership =
      activeTab === "all" ||
      (activeTab === "pro" && p.membership.type === "pro") ||
      (activeTab === "regular" && p.membership.type === "regular");

    // Payment filter
    const matchesPayment =
      paymentFilter === "all" || p.paymentStatus === paymentFilter;

    return matchesSearch && matchesMembership && matchesPayment;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {title}
            </CardTitle>
            <CardDescription>
              {stats.total} peserta terdaftar · {stats.paidCount} lunas ·{" "}
              {stats.pendingCount} menunggu pembayaran
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats Cards */}
        <div className="grid gap-3 sm:grid-cols-4">
          <div className="rounded-lg border bg-slate-50 p-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-600" />
              <span className="text-sm text-slate-600">Total Peserta</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {stats.total}
            </p>
          </div>
          <div className="rounded-lg border bg-purple-50 p-3">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-purple-600" />
              <span className="text-sm text-purple-600">Member Pro</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-purple-700">
              {stats.proMembers}
            </p>
            <p className="text-xs text-purple-600">
              {stats.proPercentage}% dari total
            </p>
          </div>
          <div className="rounded-lg border bg-green-50 p-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">Sudah Bayar</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-green-700">
              {stats.paidCount}
            </p>
            <p className="text-xs text-green-600">
              {stats.paidPercentage}% dari total
            </p>
          </div>
          <div className="rounded-lg border bg-amber-50 p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-600" />
              <span className="text-sm text-amber-600">Menunggu</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-amber-700">
              {stats.pendingCount}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Cari nama, email, atau perusahaan..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">Semua</TabsTrigger>
                <TabsTrigger value="pro">Pro</TabsTrigger>
                <TabsTrigger value="regular">Regular</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Payment Filter Chips */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-slate-600 self-center mr-1">
            <Filter className="h-4 w-4 inline mr-1" />
            Status Bayar:
          </span>
          {[
            { value: "all", label: "Semua" },
            { value: "paid", label: "Lunas" },
            { value: "pending", label: "Menunggu" },
            { value: "failed", label: "Gagal" },
            { value: "refunded", label: "Refund" },
          ].map((filter) => (
            <Button
              key={filter.value}
              variant={paymentFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setPaymentFilter(filter.value)}
              className="h-7 text-xs"
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Participants Table */}
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Peserta</TableHead>
                <TableHead>Membership</TableHead>
                <TableHead>Status Bayar</TableHead>
                <TableHead>Status Daftar</TableHead>
                <TableHead>Tanggal Daftar</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredParticipants.length > 0 ? (
                filteredParticipants.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-100">
                          <Image
                            src={participant.avatar || "/placeholder.svg"}
                            alt={participant.name}
                            fill
                            className="object-cover"
                          />
                          {participant.membership.type === "pro" && (
                            <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500">
                              <Crown className="h-2.5 w-2.5 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            {participant.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {participant.email}
                          </p>
                          {participant.company && (
                            <p className="text-xs text-slate-400">
                              {participant.company}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge
                          className={
                            participant.membership.type === "pro"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-slate-100 text-slate-700"
                          }
                        >
                          {participant.membership.type === "pro" && (
                            <Crown className="mr-1 h-3 w-3" />
                          )}
                          {getMembershipLabel(participant.membership.type)}
                        </Badge>
                        {participant.membership.type === "pro" &&
                          participant.membership.expiresAt && (
                            <p
                              className={`text-xs ${
                                getRemainingProDays(
                                  participant.membership.expiresAt
                                ) <= 7
                                  ? "text-amber-600 font-medium"
                                  : getRemainingProDays(
                                      participant.membership.expiresAt
                                    ) <= 30
                                  ? "text-amber-500"
                                  : "text-slate-500"
                              }`}
                            >
                              {getRemainingProDays(
                                participant.membership.expiresAt
                              ) <= 7 && (
                                <AlertCircle className="inline mr-1 h-3 w-3" />
                              )}
                              {formatMembershipExpiry(
                                participant.membership.expiresAt
                              )}
                            </p>
                          )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={getPaymentStatusColor(
                          participant.paymentStatus
                        )}
                      >
                        {participant.paymentStatus === "paid" && (
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                        )}
                        {participant.paymentStatus === "pending" && (
                          <Clock className="mr-1 h-3 w-3" />
                        )}
                        {participant.paymentStatus === "failed" && (
                          <XCircle className="mr-1 h-3 w-3" />
                        )}
                        {getPaymentStatusLabel(participant.paymentStatus)}
                      </Badge>
                      {participant.paymentDate && (
                        <p className="text-xs text-slate-500 mt-1">
                          {formatParticipantDate(participant.paymentDate)}
                        </p>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={getRegistrationStatusColor(
                          participant.registrationStatus
                        )}
                      >
                        {getRegistrationStatusLabel(
                          participant.registrationStatus
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Calendar className="h-3 w-3" />
                        {formatParticipantDate(participant.registeredAt)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-slate-500"
                  >
                    Tidak ada peserta ditemukan
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Summary */}
        {filteredParticipants.length > 0 && (
          <div className="flex items-center justify-between text-sm text-slate-600">
            <p>
              Menampilkan {filteredParticipants.length} dari{" "}
              {participants.length} peserta
            </p>
            {searchQuery || activeTab !== "all" || paymentFilter !== "all" ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                  setPaymentFilter("all");
                }}
              >
                Reset Filter
              </Button>
            ) : null}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
