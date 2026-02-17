/**
 * Mengubah link Google Drive menjadi URL gambar yang bisa di-embed.
 * Input:  https://drive.google.com/open?id=XXXX
 * Output: https://drive.google.com/thumbnail?id=XXXX&sz=w400
 */
export function getGoogleDriveImageUrl(driveUrl: string): string | null {
  if (!driveUrl) return null;

  // Coba ambil ID dari berbagai format URL Google Drive
  let fileId: string | null = null;

  // Format: /open?id=XXX
  const openMatch = driveUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (openMatch) {
    fileId = openMatch[1];
  }

  // Format: /file/d/XXX/
  if (!fileId) {
    const fileMatch = driveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch) {
      fileId = fileMatch[1];
    }
  }

  if (!fileId) return null;

  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
}
