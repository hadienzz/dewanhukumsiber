"use client";

import Link from "next/link";
import {
  Calendar,
  Clock,
  ExternalLink,
  Play,
  Users,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useUpcomingLiveSessions, useJoinLiveSession } from "@/hooks/training/use-training";

export default function LiveSessionsPage() {
  const { data: sessions, isLoading, error } = useUpcomingLiveSessions(20);
  const joinMutation = useJoinLiveSession();

  const handleJoin = (sessionId: string) => {
    joinMutation.mutate(sessionId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Memuat jadwal live class...</p>
        </div>
      </div>
    );
  }

  // Group sessions by date
  const groupedSessions: Record<string, typeof sessions> = {};
  sessions?.forEach((session) => {
    const dateKey = new Date(session.scheduled_at).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    if (!groupedSessions[dateKey]) {
      groupedSessions[dateKey] = [];
    }
    groupedSessions[dateKey]?.push(session);
  });

  const isSessionLive = (scheduledAt: string, durationMinutes: number) => {
    const now = Date.now();
    const start = new Date(scheduledAt).getTime();
    const end = start + durationMinutes * 60 * 1000;
    return now >= start && now <= end;
  };

  const isSessionUpcoming = (scheduledAt: string) => {
    const now = Date.now();
    const start = new Date(scheduledAt).getTime();
    // Session is "upcoming" if it starts within the next 15 minutes
    return start > now && start - now <= 15 * 60 * 1000;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Kelas Live</h1>
          <p className="text-slate-600 mt-2">
            Jadwal sesi live bersama instruktur
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Jadwal Mendatang</p>
                  <p className="text-2xl font-bold">{sessions?.length ?? 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Play className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Sedang Berlangsung</p>
                  <p className="text-2xl font-bold">
                    {sessions?.filter((s) => isSessionLive(s.scheduled_at, s.duration_minutes ?? 60)).length ?? 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Video className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Minggu Ini</p>
                  <p className="text-2xl font-bold">
                    {sessions?.filter((s) => {
                      const sessionDate = new Date(s.scheduled_at);
                      const now = new Date();
                      const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                      return sessionDate >= now && sessionDate <= weekFromNow;
                    }).length ?? 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Session List */}
        {sessions?.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Video className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 mb-2">Belum ada jadwal live class</p>
              <p className="text-sm text-slate-500">
                Nantikan jadwal kelas live dari instruktur kami
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedSessions).map(([date, dateSessions]) => (
              <div key={date}>
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  {date}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {dateSessions?.map((session) => {
                    const isLive = isSessionLive(session.scheduled_at, session.duration_minutes ?? 60);
                    const isUpcoming = isSessionUpcoming(session.scheduled_at);
                    const startTime = new Date(session.scheduled_at).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <Card
                        key={session.id}
                        className={cn(
                          "overflow-hidden transition-all",
                          isLive && "ring-2 ring-green-500"
                        )}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <CardTitle className="text-lg">{session.title}</CardTitle>
                              <CardDescription>{session.training?.title}</CardDescription>
                            </div>
                            {isLive ? (
                              <Badge className="bg-green-600 animate-pulse">
                                <Play className="h-3 w-3 mr-1" />
                                LIVE
                              </Badge>
                            ) : isUpcoming ? (
                              <Badge className="bg-yellow-600">
                                <Clock className="h-3 w-3 mr-1" />
                                Segera
                              </Badge>
                            ) : (
                              <Badge variant="outline">Terjadwal</Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {session.description && (
                            <p className="text-sm text-slate-600 line-clamp-2">
                              {session.description}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{startTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Video className="h-4 w-4" />
                              <span>{session.duration_minutes ?? 60} menit</span>
                            </div>
                            {session.instructor && (
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{session.instructor}</span>
                              </div>
                            )}
                          </div>

                          {(isLive || isUpcoming) ? (
                            <Button
                              className="w-full"
                              onClick={() => handleJoin(session.id)}
                              disabled={joinMutation.isPending}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              {isLive ? "Gabung Sekarang" : "Gabung"}
                            </Button>
                          ) : (
                            <Button variant="outline" className="w-full" disabled>
                              <Calendar className="h-4 w-4 mr-2" />
                              Terjadwal
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
