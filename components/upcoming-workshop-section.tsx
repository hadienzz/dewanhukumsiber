"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Users,
  Video,
  Building2,
} from "lucide-react";
import { upcomingWorkshops, formatDate } from "@/lib/training-data";

export default function UpcomingWorkshopSection() {
  return (
    <section id="upcoming-workshops" className="bg-muted py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2">
            <Calendar size={16} />
            <span className="text-sm font-medium">Segera Hadir</span>
          </div>
          <h2 className="text-foreground mb-4 text-4xl font-bold text-balance md:text-5xl">
            Pelatihan Mendatang
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl text-balance">
            Praktik langsung dengan para pakar dalam pelatihan eksklusif kami.
          </p>
        </div>

        <div className="space-y-6">
          {upcomingWorkshops.map((workshop, index) => (
            <Card
              key={workshop.id}
              className={`overflow-hidden transition-all duration-300 hover:shadow-xl ${
                index === 0 ? "border-primary border-2" : ""
              }`}
            >
              <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr]">
                <div className="bg-muted relative h-48 min-h-[200px] overflow-hidden md:h-full">
                  <Image
                    src={workshop.thumbnail || "/placeholder.svg"}
                    alt={workshop.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {index === 0 && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-primary text-primary-foreground">
                        Terdekat
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <CardHeader>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{workshop.category}</Badge>
                      <Badge variant="outline">{workshop.level}</Badge>
                      <Badge
                        variant={workshop.is_online ? "default" : "outline"}
                        className="gap-1"
                      >
                        {workshop.is_online ? (
                          <Video size={12} />
                        ) : (
                          <Building2 size={12} />
                        )}
                        {workshop.is_online ? "Online" : "Offline"}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl lg:text-2xl">
                      {workshop.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {workshop.short_description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex flex-1 flex-col justify-between">
                    <div className="mb-4 grid gap-4 sm:grid-cols-2">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                            <Calendar size={16} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-muted-foreground text-sm">
                              Tanggal
                            </p>
                            <p className="font-medium">
                              {formatDate(workshop.date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                            <Clock size={16} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-muted-foreground text-sm">
                              Waktu
                            </p>
                            <p className="font-medium">{workshop.time}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                            <MapPin size={16} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-muted-foreground text-sm">
                              Lokasi
                            </p>
                            <p className="font-medium">{workshop.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                            <Users size={16} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-muted-foreground text-sm">
                              Peserta
                            </p>
                            <p className="font-medium">
                              {workshop.enrolled_participants}/
                              {workshop.max_participants} terdaftar
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start justify-between gap-4 border-t pt-4 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted relative h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={
                              workshop.instructor.avatar || "/placeholder.svg"
                            }
                            alt={workshop.instructor.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {workshop.instructor.name}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {workshop.instructor.title}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-primary text-xl font-bold">
                          {workshop.price}
                        </span>
                        <Link href={`/training/${workshop.id}`}>
                          <Button className="gap-2">
                            Daftar Sekarang <ArrowRight size={16} />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
