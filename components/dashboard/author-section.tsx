import { Author } from "@/lib/courses-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Linkedin, Twitter, User } from "lucide-react"

interface AuthorSectionProps {
  author: Author
  variant?: "compact" | "full"
}

export function AuthorSection({ author, variant = "compact" }: AuthorSectionProps) {
  return (
    <Card className="overflow-hidden border-slate-200 bg-gradient-to-r from-slate-50 to-white">
      <CardContent className="p-4">
        <div className={`flex ${variant === "full" ? "flex-col md:flex-row" : ""} gap-4`}>
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-xl font-bold text-white">
              {author.name.split(" ")[0][0]}
              {author.name.split(" ")[1]?.[0] || ""}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-semibold text-slate-900">{author.name}</h4>
                <p className="text-sm text-slate-600">{author.title}</p>
              </div>
              {variant === "compact" && (
                <Badge variant="outline" className="flex-shrink-0">
                  <User className="mr-1 h-3 w-3" />
                  Instruktur
                </Badge>
              )}
            </div>

            {variant === "full" && (
              <>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {author.bio}
                </p>

                {/* Expertise */}
                <div className="mt-4">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Keahlian
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {author.expertise.map((exp, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                {author.socialLinks && (
                  <div className="mt-4 flex items-center gap-3">
                    {author.socialLinks.linkedin && (
                      <a
                        href={author.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {author.socialLinks.twitter && (
                      <a
                        href={author.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        <Twitter className="h-4 w-4" />
                        <span>Twitter</span>
                      </a>
                    )}
                    {author.socialLinks.website && (
                      <a
                        href={author.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        <Globe className="h-4 w-4" />
                        <span>Website</span>
                      </a>
                    )}
                  </div>
                )}
              </>
            )}

            {variant === "compact" && (
              <div className="mt-2 flex flex-wrap gap-1">
                {author.expertise.slice(0, 3).map((exp, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-white">
                    {exp}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
