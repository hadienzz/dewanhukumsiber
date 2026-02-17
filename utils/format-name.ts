/**
 * Mengubah nama menjadi Title Case yang rapi.
 * Contoh:
 *   "HADIN PRAMIADI"    → "Hadin Pramiadi"
 *   "hadin pramiadi"    → "Hadin Pramiadi"
 *   "Sobirin Hutabarat,CLPP" → "Sobirin Hutabarat, CLPP"
 *
 * Suffix/gelar yang umum tetap uppercase.
 */

const PRESERVED_SUFFIXES = new Set([
  "SH",
  "MH",
  "SE",
  "MM",
  "MBA",
  "CLPP",
  "CLPC",
  "CLA",
  "MKn",
  "MAP",
  "MSi",
  "MPd",
  "SPd",
  "SAg",
  "MAg",
  "PhD",
  "Dr",
  "Ir",
  "Drs",
  "Dra",
  "Hj",
]);

function isTitle(word: string): boolean {
  // Remove trailing dots/commas
  const clean = word.replace(/[.,]/g, "");
  return PRESERVED_SUFFIXES.has(clean) || PRESERVED_SUFFIXES.has(clean.toUpperCase());
}

export function formatName(raw: string): string {
  if (!raw) return "";

  // Normalize separators: split by spaces, commas
  const parts = raw
    .split(/[\s,]+/)
    .filter(Boolean);

  const formatted = parts.map((part) => {
    if (isTitle(part)) {
      // Keep common titles/suffixes as-is or capitalize first letter
      const clean = part.replace(/[.,]/g, "");
      if (PRESERVED_SUFFIXES.has(clean.toUpperCase())) {
        // Use the set's version
        for (const s of PRESERVED_SUFFIXES) {
          if (s.toUpperCase() === clean.toUpperCase()) return s;
        }
      }
      return part;
    }

    // Title case: first letter uppercase, rest lowercase
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  });

  // Re-join, detect where suffixes start and add comma if needed
  let result = "";
  let foundSuffix = false;

  for (let i = 0; i < formatted.length; i++) {
    const word = formatted[i];
    const clean = word.replace(/[.,]/g, "");

    if (!foundSuffix && PRESERVED_SUFFIXES.has(clean.toUpperCase())) {
      foundSuffix = true;
      // Check if previous character already has comma
      if (result.length > 0 && !result.trimEnd().endsWith(",")) {
        result = result.trimEnd() + ", " + word;
      } else {
        result += word;
      }
    } else {
      if (result.length > 0) {
        result += " " + word;
      } else {
        result = word;
      }
    }
  }

  return result;
}
