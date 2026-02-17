"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Module } from "@/lib/courses-data"
import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Plus,
  Trash2,
  X,
} from "lucide-react"

interface SyllabusBuilderProps {
  modules: Module[]
  onChange: (modules: Module[]) => void
}

export function SyllabusBuilder({ modules, onChange }: SyllabusBuilderProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>([])
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const addModule = () => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      title: "",
      description: "",
      learningObjectives: [""],
      order: modules.length + 1,
    }
    onChange([...modules, newModule])
    setExpandedModules((prev) => [...prev, newModule.id])
  }

  const updateModule = (id: string, updates: Partial<Module>) => {
    onChange(
      modules.map((m) => (m.id === id ? { ...m, ...updates } : m))
    )
  }

  const removeModule = (id: string) => {
    onChange(
      modules
        .filter((m) => m.id !== id)
        .map((m, index) => ({ ...m, order: index + 1 }))
    )
  }

  const addObjective = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId)
    if (module) {
      updateModule(moduleId, {
        learningObjectives: [...module.learningObjectives, ""],
      })
    }
  }

  const updateObjective = (moduleId: string, index: number, value: string) => {
    const module = modules.find((m) => m.id === moduleId)
    if (module) {
      const newObjectives = [...module.learningObjectives]
      newObjectives[index] = value
      updateModule(moduleId, { learningObjectives: newObjectives })
    }
  }

  const removeObjective = (moduleId: string, index: number) => {
    const module = modules.find((m) => m.id === moduleId)
    if (module && module.learningObjectives.length > 1) {
      updateModule(moduleId, {
        learningObjectives: module.learningObjectives.filter((_, i) => i !== index),
      })
    }
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newModules = [...modules]
    const [removed] = newModules.splice(draggedIndex, 1)
    newModules.splice(index, 0, removed)

    // Update order
    const reorderedModules = newModules.map((m, i) => ({ ...m, order: i + 1 }))
    onChange(reorderedModules)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const moveModule = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= modules.length) return

    const newModules = [...modules]
    const [removed] = newModules.splice(index, 1)
    newModules.splice(newIndex, 0, removed)

    const reorderedModules = newModules.map((m, i) => ({ ...m, order: i + 1 }))
    onChange(reorderedModules)
  }

  // Sample modules for quick add
  const sampleModules = [
    {
      title: "Asas-asas Hukum",
      description: "Mempelajari prinsip-prinsip dasar dalam sistem hukum Indonesia.",
      learningObjectives: [
        "Memahami asas legalitas",
        "Mengidentifikasi asas-asas umum hukum",
        "Mengaplikasikan asas dalam kasus konkret",
      ],
    },
    {
      title: "Sumber Hukum di Indonesia",
      description: "Mengidentifikasi dan menganalisis berbagai sumber hukum yang berlaku di Indonesia.",
      learningObjectives: [
        "Mengidentifikasi sumber hukum tertulis dan tidak tertulis",
        "Memahami hubungan antar sumber hukum",
        "Menganalisis penerapan sumber hukum",
      ],
    },
    {
      title: "Hierarki Peraturan Perundang-undangan",
      description: "Memahami tata urutan peraturan perundang-undangan berdasarkan UU No. 12 Tahun 2011.",
      learningObjectives: [
        "Menjelaskan hierarki peraturan",
        "Menganalisis asas lex superior derogat legi inferiori",
        "Mengevaluasi pengujian peraturan",
      ],
    },
    {
      title: "Studi Kasus & Analisis Putusan",
      description: "Menganalisis putusan-putusan pengadilan penting dalam perkembangan hukum Indonesia.",
      learningObjectives: [
        "Menganalisis putusan pengadilan secara sistematis",
        "Mengidentifikasi ratio decidendi",
        "Mengevaluasi penerapan hukum",
      ],
    },
  ]

  const addSampleModule = (sample: typeof sampleModules[0]) => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      title: sample.title,
      description: sample.description,
      learningObjectives: sample.learningObjectives,
      order: modules.length + 1,
    }
    onChange([...modules, newModule])
    setExpandedModules((prev) => [...prev, newModule.id])
  }

  return (
    <div className="space-y-6">
      {/* Quick Add Sample Modules */}
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
        <h4 className="mb-3 text-sm font-medium text-slate-700">
          Tambah Cepat Modul Contoh
        </h4>
        <div className="flex flex-wrap gap-2">
          {sampleModules.map((sample, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => addSampleModule(sample)}
              className="text-xs"
            >
              <Plus className="mr-1 h-3 w-3" />
              {sample.title}
            </Button>
          ))}
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {modules.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 py-12">
            <p className="mb-4 text-sm text-slate-500">
              Belum ada modul. Tambahkan modul pertama Anda.
            </p>
            <Button onClick={addModule} variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Modul
            </Button>
          </div>
        ) : (
          modules.map((module, index) => (
            <Card
              key={module.id}
              className={`transition-all ${
                draggedIndex === index ? "opacity-50" : ""
              }`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="cursor-grab text-slate-400 hover:text-slate-600"
                    title="Drag to reorder"
                  >
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-medium text-white">
                    {module.order}
                  </div>
                  <div className="flex-1">
                    {expandedModules.includes(module.id) ? (
                      <Input
                        value={module.title}
                        onChange={(e) =>
                          updateModule(module.id, { title: e.target.value })
                        }
                        placeholder="Judul Modul"
                        className="font-medium"
                      />
                    ) : (
                      <p className="font-medium text-slate-900">
                        {module.title || "Modul tanpa judul"}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => moveModule(index, "up")}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => moveModule(index, "down")}
                      disabled={index === modules.length - 1}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => toggleExpand(module.id)}
                    >
                      {expandedModules.includes(module.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => removeModule(module.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {expandedModules.includes(module.id) && (
                <CardContent className="space-y-4 pt-2">
                  {/* Module Description */}
                  <div className="space-y-2">
                    <Label>Deskripsi Modul</Label>
                    <Textarea
                      value={module.description}
                      onChange={(e) =>
                        updateModule(module.id, { description: e.target.value })
                      }
                      placeholder="Jelaskan apa yang akan dipelajari dalam modul ini"
                      rows={3}
                    />
                  </div>

                  {/* Learning Objectives */}
                  <div className="space-y-2">
                    <Label>Tujuan Pembelajaran</Label>
                    <div className="space-y-2">
                      {module.learningObjectives.map((objective, objIndex) => (
                        <div key={objIndex} className="flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-600">
                            {objIndex + 1}
                          </span>
                          <Input
                            value={objective}
                            onChange={(e) =>
                              updateObjective(module.id, objIndex, e.target.value)
                            }
                            placeholder="Tujuan pembelajaran"
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600"
                            onClick={() => removeObjective(module.id, objIndex)}
                            disabled={module.learningObjectives.length === 1}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addObjective(module.id)}
                      className="mt-2"
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      Tambah Tujuan
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Add Module Button */}
      {modules.length > 0 && (
        <Button onClick={addModule} variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Modul Baru
        </Button>
      )}

      {/* Summary */}
      {modules.length > 0 && (
        <div className="rounded-lg bg-slate-100 p-4">
          <p className="text-sm text-slate-600">
            Total: <span className="font-medium">{modules.length} modul</span>
            {" · "}
            <span className="font-medium">
              {modules.reduce((acc, m) => acc + m.learningObjectives.filter(o => o.trim()).length, 0)} tujuan pembelajaran
            </span>
          </p>
        </div>
      )}
    </div>
  )
}
