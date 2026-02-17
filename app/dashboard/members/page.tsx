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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import {
  participants,
  getMembershipLabel,
  getRemainingProDays,
  formatMembershipExpiry,
  formatParticipantDate,
  getParticipantStats,
} from "@/lib/participants-data";
import {
  Search,
  Users,
  Crown,
  UserCheck,
  AlertCircle,
  Mail,
  Phone,
  Building2,
  Calendar,
  Download,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const stats = getParticipantStats(participants);

  // Filter participants based on search and tab
  const filteredParticipants = participants.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.company &&
        p.company.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesMembership =
      activeTab === "all" ||
      (activeTab === "pro" && p.membership.type === "pro") ||
      (activeTab === "regular" && p.membership.type === "regular") ||
      (activeTab === "expiring" &&
        p.membership.type === "pro" &&
        p.membership.expiresAt &&
        getRemainingProDays(p.membership.expiresAt) <= 30);

    return matchesSearch && matchesMembership;
  });

  // Pagination
  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  const paginatedParticipants = filteredParticipants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Count expiring soon
  const expiringCount = participants.filter(
    (p) =>
      p.membership.type === "pro" &&
      p.membership.expiresAt &&
      getRemainingProDays(p.membership.expiresAt) <= 30 &&
      getRemainingProDays(p.membership.expiresAt) > 0
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Manajemen Member
          </h1>
          <p className="text-slate-600">
            Kelola data member dan status membership
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                <Users className="h-6 w-6 text-slate-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Member</p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <Crown className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-purple-600">Member Pro</p>
                <p className="text-2xl font-bold text-purple-700">
                  {stats.proMembers}
                </p>
                <p className="text-xs text-purple-500">
                  {stats.proPercentage}% dari total
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                <UserCheck className="h-6 w-6 text-slate-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Member Regular</p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.regularMembers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-amber-600">Akan Expired</p>
                <p className="text-2xl font-bold text-amber-700">
                  {expiringCount}
                </p>
                <p className="text-xs text-amber-500">dalam 30 hari</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Members Table Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Daftar Member
          </CardTitle>
          <CardDescription>
            {filteredParticipants.length} member ditemukan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Cari nama, email, atau perusahaan..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <Tabs
              value={activeTab}
              onValueChange={(val) => {
                setActiveTab(val);
                setCurrentPage(1);
              }}
            >
              <TabsList>
                <TabsTrigger value="all">Semua</TabsTrigger>
                <TabsTrigger value="pro">
                  <Crown className="h-3 w-3 mr-1" />
                  Pro
                </TabsTrigger>
                <TabsTrigger value="regular">Regular</TabsTrigger>
                <TabsTrigger value="expiring">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Expiring
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Members Table */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[280px]">Member</TableHead>
                  <TableHead>Perusahaan</TableHead>
                  <TableHead>Membership</TableHead>
                  <TableHead>Status Membership</TableHead>
                  <TableHead>Bergabung</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedParticipants.length > 0 ? (
                  paginatedParticipants.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-100">
                            <Image
                              src={member.avatar || "/placeholder.svg"}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                            {member.membership.type === "pro" && (
                              <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500">
                                <Crown className="h-2.5 w-2.5 text-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {member.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {member.company ? (
                          <div className="flex items-center gap-1 text-sm text-slate-600">
                            <Building2 className="h-3 w-3" />
                            <span className="truncate max-w-[150px]">
                              {member.company}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400">-</span>
                        )}
                        {member.position && (
                          <p className="text-xs text-slate-400">
                            {member.position}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            member.membership.type === "pro"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-slate-100 text-slate-700"
                          }
                        >
                          {member.membership.type === "pro" && (
                            <Crown className="mr-1 h-3 w-3" />
                          )}
                          {getMembershipLabel(member.membership.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {member.membership.type === "pro" &&
                        member.membership.expiresAt ? (
                          <div className="space-y-1">
                            {getRemainingProDays(member.membership.expiresAt) <=
                            0 ? (
                              <Badge className="bg-red-100 text-red-700">
                                Kadaluarsa
                              </Badge>
                            ) : getRemainingProDays(
                                member.membership.expiresAt
                              ) <= 7 ? (
                              <Badge className="bg-red-100 text-red-700">
                                <AlertCircle className="mr-1 h-3 w-3" />
                                {formatMembershipExpiry(
                                  member.membership.expiresAt
                                )}
                              </Badge>
                            ) : getRemainingProDays(
                                member.membership.expiresAt
                              ) <= 30 ? (
                              <Badge className="bg-amber-100 text-amber-700">
                                <AlertCircle className="mr-1 h-3 w-3" />
                                {formatMembershipExpiry(
                                  member.membership.expiresAt
                                )}
                              </Badge>
                            ) : (
                              <Badge className="bg-green-100 text-green-700">
                                {formatMembershipExpiry(
                                  member.membership.expiresAt
                                )}
                              </Badge>
                            )}
                            <p className="text-xs text-slate-500">
                              exp:{" "}
                              {formatParticipantDate(
                                member.membership.expiresAt
                              )}
                            </p>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <Calendar className="h-3 w-3" />
                          {formatParticipantDate(member.registeredAt)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
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
                            <MoreVertical className="h-4 w-4" />
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
                      Tidak ada member ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredParticipants.length
                )}{" "}
                dari {filteredParticipants.length} member
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  )
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
