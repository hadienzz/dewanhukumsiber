import { formatDate, getTypeLabel } from "@/lib/training-data";
import { WorkshopSummary } from "@/services/workshop/get-workshops";
import { formatPrice } from "@/utils/format-price";
import { MoreHorizontal, Presentation } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useDeleteWorkshop from "@/hooks/workshop/use-delete-workshop";

interface WorkshopItemProps {
  workshop: WorkshopSummary;
}

const WorkshopItem = ({ workshop }: WorkshopItemProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const { deleteWorkshop, isDeleting } = useDeleteWorkshop();

  const expectedTitle = useMemo(() => (workshop.title ?? "").trim(), [workshop.title]);
  const isTitleMatch = useMemo(
    () => confirmTitle.trim() === expectedTitle && expectedTitle.length > 0,
    [confirmTitle, expectedTitle],
  );

  const openDeleteDialog = () => {
    setMenuOpen(false);
    setConfirmTitle("");
    setDeleteOpen(true);
  };

  const closeDeleteDialog = () => {
    if (isDeleting) return;
    setDeleteOpen(false);
    setConfirmTitle("");
  };

  return (
    <>
      <Link
        href={`/dashboard/workshops/${workshop.id}`}
        className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-slate-50"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
          <Presentation className="h-6 w-6 text-slate-600" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <p className="truncate font-medium text-slate-900">
              {workshop.title}
            </p>

            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="rounded-md p-1 transition hover:bg-slate-200"
                  aria-label="More actions"
                >
                  <MoreHorizontal className="h-5 w-5 text-slate-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={(e) => {
                    e.preventDefault();
                    openDeleteDialog();
                  }}
                >
                  Delete Workshop
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        {workshop.short_description && (
          <p className="truncate text-sm text-slate-500">
            {workshop.short_description}
          </p>
        )}

        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="rounded-full bg-slate-100 px-2 py-0.5">
            {getTypeLabel("workshop")}
          </span>

          {workshop.category && (
            <span className="max-w-[120px] truncate">{workshop.category}</span>
          )}

          {workshop.created_at && (
            <span>{formatDate(workshop.created_at)}</span>
          )}

          {workshop.price && (
            <span className="font-semibold text-slate-900">
              {formatPrice(Number(workshop.price))}
            </span>
          )}
        </div>
        </div>
      </Link>

      <AlertDialog open={deleteOpen} onOpenChange={(open) => (open ? openDeleteDialog() : closeDeleteDialog())}>
        <AlertDialogContent
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus workshop</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak bisa dibatalkan. Ini akan menghapus workshop
              dari dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-2">
            <p className="text-sm text-slate-700">
              Untuk konfirmasi, ketik judul workshop: {" "}
              <span className="font-mono text-sm rounded bg-slate-100 px-1.5 py-0.5 text-slate-900">
                {expectedTitle || "(tanpa judul)"}
              </span>
            </p>
            <Input
              value={confirmTitle}
              onChange={(e) => setConfirmTitle(e.target.value)}
              placeholder="Ketik judul workshop"
              disabled={isDeleting || !expectedTitle}
              autoFocus
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                disabled={!isTitleMatch || isDeleting}
                onClick={(e) => {
                  e.preventDefault();
                  if (!isTitleMatch || isDeleting) return;
                  deleteWorkshop(workshop.id, {
                    onSuccess: () => {
                      setDeleteOpen(false);
                      setConfirmTitle("");
                    },
                  });
                }}
              >
                {isDeleting ? "Menghapus..." : "Hapus workshop"}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default WorkshopItem;
