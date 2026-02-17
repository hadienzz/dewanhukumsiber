// Inheritance Calculator - Hukum Islam (Faraid) & Hukum Perdata Indonesia

export type LawSystem = "islam" | "perdata";
export type Gender = "male" | "female";
export type MaritalStatus = "married" | "widowed" | "divorced" | "single";

export interface Heir {
  id: string;
  relation: HeirRelation;
  name: string;
  gender: Gender;
  isAlive: boolean;
  count?: number; // for multiple heirs of same type
}

export type HeirRelation =
  | "spouse" // Suami/Istri
  | "son" // Anak laki-laki
  | "daughter" // Anak perempuan
  | "father" // Ayah
  | "mother" // Ibu
  | "grandfather" // Kakek (ayah dari ayah)
  | "grandmother" // Nenek
  | "brother_full" // Saudara laki-laki sekandung
  | "sister_full" // Saudara perempuan sekandung
  | "brother_paternal" // Saudara laki-laki seayah
  | "sister_paternal" // Saudara perempuan seayah
  | "brother_maternal" // Saudara laki-laki seibu
  | "sister_maternal" // Saudara perempuan seibu
  | "son_of_son" // Cucu laki-laki dari anak laki-laki
  | "daughter_of_son" // Cucu perempuan dari anak laki-laki
  | "uncle_paternal" // Paman (saudara ayah)
  | "son_of_uncle"; // Anak paman

export interface DeceasedInfo {
  name: string;
  gender: Gender;
  maritalStatus: MaritalStatus;
}

export interface InheritanceInput {
  deceased: DeceasedInfo;
  heirs: Heir[];
  totalEstate: number; // Total harta warisan dalam Rupiah
  debts: number; // Hutang pewaris
  funeralCosts: number; // Biaya pemakaman
  wasiat: number; // Wasiat (max 1/3 of estate in Islam)
  lawSystem: LawSystem;
}

export interface HeirShare {
  heir: Heir;
  fraction: string; // e.g., "1/4", "1/6"
  percentage: number;
  amount: number;
  explanation: string;
}

export interface InheritanceResult {
  input: InheritanceInput;
  netEstate: number; // Harta bersih setelah dikurangi hutang, biaya, wasiat
  shares: HeirShare[];
  residue: number; // Sisa harta (asabah dalam Islam)
  explanations: string[];
  warnings: string[];
}

// Helper functions
export function getRelationLabel(relation: HeirRelation): string {
  const labels: Record<HeirRelation, string> = {
    spouse: "Suami/Istri",
    son: "Anak Laki-laki",
    daughter: "Anak Perempuan",
    father: "Ayah",
    mother: "Ibu",
    grandfather: "Kakek (dari pihak Ayah)",
    grandmother: "Nenek",
    brother_full: "Saudara Laki-laki Sekandung",
    sister_full: "Saudara Perempuan Sekandung",
    brother_paternal: "Saudara Laki-laki Seayah",
    sister_paternal: "Saudara Perempuan Seayah",
    brother_maternal: "Saudara Laki-laki Seibu",
    sister_maternal: "Saudara Perempuan Seibu",
    son_of_son: "Cucu Laki-laki (dari Anak Laki-laki)",
    daughter_of_son: "Cucu Perempuan (dari Anak Laki-laki)",
    uncle_paternal: "Paman (Saudara Ayah)",
    son_of_uncle: "Anak Paman",
  };
  return labels[relation];
}

export function getRelationLabelWithGender(
  relation: HeirRelation,
  deceasedGender: Gender
): string {
  if (relation === "spouse") {
    return deceasedGender === "male" ? "Istri" : "Suami";
  }
  return getRelationLabel(relation);
}

// Available heir relations based on deceased info
export function getAvailableHeirRelations(
  deceased: DeceasedInfo
): HeirRelation[] {
  const relations: HeirRelation[] = [];

  // Spouse
  if (deceased.maritalStatus === "married") {
    relations.push("spouse");
  }

  // Children
  relations.push("son", "daughter");

  // Parents
  relations.push("father", "mother");

  // Grandparents
  relations.push("grandfather", "grandmother");

  // Siblings
  relations.push(
    "brother_full",
    "sister_full",
    "brother_paternal",
    "sister_paternal",
    "brother_maternal",
    "sister_maternal"
  );

  // Grandchildren
  relations.push("son_of_son", "daughter_of_son");

  // Extended family
  relations.push("uncle_paternal", "son_of_uncle");

  return relations;
}

// ============================================
// ISLAMIC INHERITANCE LAW (FARAID) CALCULATOR
// ============================================

interface IslamicShare {
  relation: HeirRelation;
  share: number; // as decimal
  fraction: string;
  isAsabah: boolean;
  explanation: string;
}

function calculateIslamicShares(input: InheritanceInput): InheritanceResult {
  const { deceased, heirs, totalEstate, debts, funeralCosts, wasiat } = input;

  const warnings: string[] = [];
  const explanations: string[] = [
    "Perhitungan berdasarkan Hukum Waris Islam (Ilmu Faraid)",
  ];

  // Check wasiat limit (max 1/3)
  const maxWasiat = (totalEstate - debts - funeralCosts) / 3;
  let actualWasiat = wasiat;
  if (wasiat > maxWasiat) {
    actualWasiat = maxWasiat;
    warnings.push(
      `Wasiat melebihi 1/3 harta. Dibatasi menjadi Rp ${maxWasiat.toLocaleString(
        "id-ID"
      )}`
    );
  }

  const netEstate = totalEstate - debts - funeralCosts - actualWasiat;
  explanations.push(
    `Harta bersih setelah dikurangi hutang (Rp ${debts.toLocaleString(
      "id-ID"
    )}), biaya pemakaman (Rp ${funeralCosts.toLocaleString(
      "id-ID"
    )}), dan wasiat (Rp ${actualWasiat.toLocaleString(
      "id-ID"
    )}): Rp ${netEstate.toLocaleString("id-ID")}`
  );

  // Count heirs by type
  const heirCounts = countHeirsByType(heirs);

  // Determine shares based on Faraid rules
  const shares: HeirShare[] = [];
  let totalFixedShare = 0;
  const asabahHeirs: Heir[] = [];

  // Process each heir
  for (const heir of heirs) {
    if (!heir.isAlive) continue;

    const islamicShare = getIslamicShare(
      heir,
      deceased.gender,
      heirCounts,
      heirs
    );

    if (islamicShare.isAsabah) {
      asabahHeirs.push(heir);
    } else {
      totalFixedShare += islamicShare.share * (heir.count || 1);
      shares.push({
        heir,
        fraction: islamicShare.fraction,
        percentage: islamicShare.share * 100,
        amount: netEstate * islamicShare.share * (heir.count || 1),
        explanation: islamicShare.explanation,
      });
    }
  }

  // Calculate residue for asabah
  let residue = netEstate * (1 - totalFixedShare);
  if (residue < 0) {
    // Aul (reduction) case - all shares need to be proportionally reduced
    warnings.push(
      "Terjadi 'Aul' - jumlah bagian melebihi harta. Semua bagian akan dikurangi secara proporsional."
    );
    const reductionFactor = 1 / (1 + Math.abs(1 - totalFixedShare - 1));
    for (const share of shares) {
      share.amount *= reductionFactor;
      share.percentage *= reductionFactor;
    }
    residue = 0;
  }

  // Distribute residue to asabah heirs
  if (asabahHeirs.length > 0 && residue > 0) {
    // In asabah, males get double of females
    let totalAsabahUnits = 0;
    for (const asabah of asabahHeirs) {
      const units =
        asabah.gender === "male"
          ? 2 * (asabah.count || 1)
          : 1 * (asabah.count || 1);
      totalAsabahUnits += units;
    }

    for (const asabah of asabahHeirs) {
      const units =
        asabah.gender === "male"
          ? 2 * (asabah.count || 1)
          : 1 * (asabah.count || 1);
      const shareAmount = (residue * units) / totalAsabahUnits;
      const sharePercentage =
        ((units / totalAsabahUnits) * residue) / netEstate;

      shares.push({
        heir: asabah,
        fraction: "Asabah",
        percentage: sharePercentage * 100,
        amount: shareAmount,
        explanation: `Sebagai asabah (penerima sisa), mendapat bagian dari sisa harta`,
      });
    }
    residue = 0;
  }

  // Radd case - if there's residue and no asabah, distribute to dhawil furudh
  if (residue > 0 && asabahHeirs.length === 0 && shares.length > 0) {
    explanations.push(
      "Terjadi 'Radd' - sisa harta dibagikan kepada ahli waris sesuai proporsi"
    );
    const totalCurrentShare = shares.reduce((sum, s) => sum + s.amount, 0);
    for (const share of shares) {
      const additionalAmount = (share.amount / totalCurrentShare) * residue;
      share.amount += additionalAmount;
      share.percentage = (share.amount / netEstate) * 100;
    }
    residue = 0;
  }

  return {
    input,
    netEstate,
    shares,
    residue,
    explanations,
    warnings,
  };
}

function countHeirsByType(heirs: Heir[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const heir of heirs) {
    if (heir.isAlive) {
      counts[heir.relation] = (counts[heir.relation] || 0) + (heir.count || 1);
    }
  }
  return counts;
}

function hasChildren(heirs: Heir[]): boolean {
  return heirs.some(
    (h) => h.isAlive && (h.relation === "son" || h.relation === "daughter")
  );
}

function hasSons(heirs: Heir[]): boolean {
  return heirs.some((h) => h.isAlive && h.relation === "son");
}

function hasFather(heirs: Heir[]): boolean {
  return heirs.some((h) => h.isAlive && h.relation === "father");
}

function hasGrandfather(heirs: Heir[]): boolean {
  return heirs.some((h) => h.isAlive && h.relation === "grandfather");
}

function hasSiblings(heirs: Heir[]): boolean {
  return heirs.some(
    (h) =>
      h.isAlive &&
      [
        "brother_full",
        "sister_full",
        "brother_paternal",
        "sister_paternal",
        "brother_maternal",
        "sister_maternal",
      ].includes(h.relation)
  );
}

function getIslamicShare(
  heir: Heir,
  deceasedGender: Gender,
  counts: Record<string, number>,
  allHeirs: Heir[]
): IslamicShare {
  const hasChild = hasChildren(allHeirs);
  const hasSon = hasSons(allHeirs);
  const hasParent = hasFather(allHeirs);
  const hasSibling = hasSiblings(allHeirs);

  switch (heir.relation) {
    // SPOUSE
    case "spouse":
      if (deceasedGender === "male") {
        // Istri
        if (hasChild) {
          return {
            relation: heir.relation,
            share: 1 / 8,
            fraction: "1/8",
            isAsabah: false,
            explanation: "Istri mendapat 1/8 karena pewaris memiliki anak/cucu",
          };
        }
        return {
          relation: heir.relation,
          share: 1 / 4,
          fraction: "1/4",
          isAsabah: false,
          explanation:
            "Istri mendapat 1/4 karena pewaris tidak memiliki anak/cucu",
        };
      } else {
        // Suami
        if (hasChild) {
          return {
            relation: heir.relation,
            share: 1 / 4,
            fraction: "1/4",
            isAsabah: false,
            explanation: "Suami mendapat 1/4 karena pewaris memiliki anak/cucu",
          };
        }
        return {
          relation: heir.relation,
          share: 1 / 2,
          fraction: "1/2",
          isAsabah: false,
          explanation:
            "Suami mendapat 1/2 karena pewaris tidak memiliki anak/cucu",
        };
      }

    // SON - Always asabah
    case "son":
      return {
        relation: heir.relation,
        share: 0,
        fraction: "Asabah",
        isAsabah: true,
        explanation:
          "Anak laki-laki adalah asabah (penerima sisa) dan mendapat bagian sisa harta",
      };

    // DAUGHTER
    case "daughter":
      if (hasSon) {
        // Daughter with son becomes asabah bil-ghair
        return {
          relation: heir.relation,
          share: 0,
          fraction: "Asabah bil-ghair",
          isAsabah: true,
          explanation:
            "Anak perempuan bersama anak laki-laki menjadi asabah dengan perbandingan 1:2",
        };
      }
      const daughterCount = counts["daughter"] || 1;
      if (daughterCount === 1) {
        return {
          relation: heir.relation,
          share: 1 / 2,
          fraction: "1/2",
          isAsabah: false,
          explanation:
            "Anak perempuan tunggal tanpa saudara laki-laki mendapat 1/2",
        };
      }
      return {
        relation: heir.relation,
        share: 2 / 3 / daughterCount,
        fraction: `2/3 ÷ ${daughterCount}`,
        isAsabah: false,
        explanation: `${daughterCount} anak perempuan berbagi 2/3 harta`,
      };

    // FATHER
    case "father":
      if (hasChild) {
        return {
          relation: heir.relation,
          share: 1 / 6,
          fraction: "1/6",
          isAsabah: false,
          explanation: "Ayah mendapat 1/6 karena pewaris memiliki anak/cucu",
        };
      }
      return {
        relation: heir.relation,
        share: 0,
        fraction: "Asabah",
        isAsabah: true,
        explanation:
          "Ayah menjadi asabah karena pewaris tidak memiliki anak laki-laki",
      };

    // MOTHER
    case "mother":
      if (hasChild || hasSibling) {
        return {
          relation: heir.relation,
          share: 1 / 6,
          fraction: "1/6",
          isAsabah: false,
          explanation:
            "Ibu mendapat 1/6 karena pewaris memiliki anak/cucu atau saudara",
        };
      }
      return {
        relation: heir.relation,
        share: 1 / 3,
        fraction: "1/3",
        isAsabah: false,
        explanation:
          "Ibu mendapat 1/3 karena pewaris tidak memiliki anak/cucu dan saudara",
      };

    // GRANDFATHER
    case "grandfather":
      if (hasParent) {
        return {
          relation: heir.relation,
          share: 0,
          fraction: "Terhalang",
          isAsabah: false,
          explanation: "Kakek terhalang oleh ayah pewaris",
        };
      }
      if (hasChild) {
        return {
          relation: heir.relation,
          share: 1 / 6,
          fraction: "1/6",
          isAsabah: false,
          explanation: "Kakek mendapat 1/6 karena pewaris memiliki anak/cucu",
        };
      }
      return {
        relation: heir.relation,
        share: 0,
        fraction: "Asabah",
        isAsabah: true,
        explanation: "Kakek menjadi asabah menggantikan posisi ayah",
      };

    // GRANDMOTHER
    case "grandmother":
      return {
        relation: heir.relation,
        share: 1 / 6,
        fraction: "1/6",
        isAsabah: false,
        explanation: "Nenek mendapat 1/6",
      };

    // FULL SIBLINGS
    case "brother_full":
      if (hasChild || hasParent || hasGrandfather(allHeirs)) {
        return {
          relation: heir.relation,
          share: 0,
          fraction: "Terhalang",
          isAsabah: false,
          explanation:
            "Saudara laki-laki sekandung terhalang oleh anak laki-laki, ayah, atau kakek",
        };
      }
      return {
        relation: heir.relation,
        share: 0,
        fraction: "Asabah",
        isAsabah: true,
        explanation:
          "Saudara laki-laki sekandung adalah asabah (penerima sisa)",
      };

    case "sister_full":
      if (hasChild || hasParent || hasGrandfather(allHeirs)) {
        return {
          relation: heir.relation,
          share: 0,
          fraction: "Terhalang",
          isAsabah: false,
          explanation:
            "Saudara perempuan sekandung terhalang oleh anak laki-laki, ayah, atau kakek",
        };
      }
      const hasBrotherFull = allHeirs.some(
        (h) => h.isAlive && h.relation === "brother_full"
      );
      if (hasBrotherFull) {
        return {
          relation: heir.relation,
          share: 0,
          fraction: "Asabah bil-ghair",
          isAsabah: true,
          explanation:
            "Saudara perempuan sekandung bersama saudara laki-laki menjadi asabah",
        };
      }
      const sisterFullCount = counts["sister_full"] || 1;
      if (sisterFullCount === 1) {
        return {
          relation: heir.relation,
          share: 1 / 2,
          fraction: "1/2",
          isAsabah: false,
          explanation: "Saudara perempuan sekandung tunggal mendapat 1/2",
        };
      }
      return {
        relation: heir.relation,
        share: 2 / 3 / sisterFullCount,
        fraction: `2/3 ÷ ${sisterFullCount}`,
        isAsabah: false,
        explanation: `${sisterFullCount} saudara perempuan sekandung berbagi 2/3`,
      };

    // MATERNAL SIBLINGS - Special rule
    case "brother_maternal":
    case "sister_maternal":
      if (hasChild || hasParent || hasGrandfather(allHeirs)) {
        return {
          relation: heir.relation,
          share: 0,
          fraction: "Terhalang",
          isAsabah: false,
          explanation: "Saudara seibu terhalang oleh anak, ayah, atau kakek",
        };
      }
      const maternalCount =
        (counts["brother_maternal"] || 0) + (counts["sister_maternal"] || 0);
      if (maternalCount === 1) {
        return {
          relation: heir.relation,
          share: 1 / 6,
          fraction: "1/6",
          isAsabah: false,
          explanation: "Saudara seibu tunggal mendapat 1/6",
        };
      }
      return {
        relation: heir.relation,
        share: 1 / 3 / maternalCount,
        fraction: `1/3 ÷ ${maternalCount}`,
        isAsabah: false,
        explanation: `Saudara seibu berbagi 1/3 secara sama rata`,
      };

    // Default for other relations
    default:
      return {
        relation: heir.relation,
        share: 0,
        fraction: "Asabah",
        isAsabah: true,
        explanation: `${getRelationLabel(heir.relation)} sebagai asabah`,
      };
  }
}

// ============================================
// INDONESIAN CIVIL LAW (PERDATA) CALCULATOR
// ============================================

function calculateCivilShares(input: InheritanceInput): InheritanceResult {
  const { deceased, heirs, totalEstate, debts, funeralCosts, wasiat } = input;

  const warnings: string[] = [];
  const explanations: string[] = [
    "Perhitungan berdasarkan Hukum Waris Perdata Indonesia (KUHPerdata)",
  ];

  const netEstate = totalEstate - debts - funeralCosts - wasiat;
  explanations.push(
    `Harta bersih setelah dikurangi hutang, biaya pemakaman, dan wasiat: Rp ${netEstate.toLocaleString(
      "id-ID"
    )}`
  );

  const shares: HeirShare[] = [];

  // Group heirs by priority
  // Group I: Spouse + Children (equal shares)
  // Group II: Parents + Siblings (spouse gets specific share)
  // Group III: Grandparents
  // Group IV: Other relatives

  const spouse = heirs.find((h) => h.isAlive && h.relation === "spouse");
  const children = heirs.filter(
    (h) => h.isAlive && (h.relation === "son" || h.relation === "daughter")
  );
  const parents = heirs.filter(
    (h) => h.isAlive && (h.relation === "father" || h.relation === "mother")
  );
  const siblings = heirs.filter(
    (h) =>
      h.isAlive &&
      [
        "brother_full",
        "sister_full",
        "brother_paternal",
        "sister_paternal",
      ].includes(h.relation)
  );
  const grandparents = heirs.filter(
    (h) =>
      h.isAlive &&
      (h.relation === "grandfather" || h.relation === "grandmother")
  );

  // Count total children
  const totalChildren = children.reduce((sum, c) => sum + (c.count || 1), 0);

  // GROUP I: Spouse + Children
  if (totalChildren > 0) {
    explanations.push(
      "Golongan I: Suami/Istri dan Anak-anak mendapat bagian sama"
    );

    const totalHeirs = (spouse ? 1 : 0) + totalChildren;
    const sharePerPerson = 1 / totalHeirs;

    if (spouse) {
      shares.push({
        heir: spouse,
        fraction: `1/${totalHeirs}`,
        percentage: sharePerPerson * 100,
        amount: netEstate * sharePerPerson,
        explanation: `Suami/Istri mendapat 1/${totalHeirs} bagian (sama dengan anak)`,
      });
    }

    for (const child of children) {
      const count = child.count || 1;
      shares.push({
        heir: child,
        fraction: `${count}/${totalHeirs}`,
        percentage: sharePerPerson * count * 100,
        amount: netEstate * sharePerPerson * count,
        explanation: `${getRelationLabel(
          child.relation
        )} mendapat ${count}/${totalHeirs} bagian`,
      });
    }
  }
  // GROUP II: Parents + Siblings (with spouse)
  else if (parents.length > 0 || siblings.length > 0) {
    explanations.push("Golongan II: Orang tua dan Saudara pewaris");

    let spouseShare = 0;
    let remainingEstate = netEstate;

    // Spouse gets specific share in Group II
    if (spouse) {
      const totalGroupII =
        parents.length + siblings.reduce((sum, s) => sum + (s.count || 1), 0);

      if (totalGroupII === 1) {
        spouseShare = 1 / 2;
      } else {
        spouseShare = 1 / 3;
      }

      shares.push({
        heir: spouse,
        fraction: totalGroupII === 1 ? "1/2" : "1/3",
        percentage: spouseShare * 100,
        amount: netEstate * spouseShare,
        explanation: `Suami/Istri mendapat ${
          totalGroupII === 1 ? "1/2" : "1/3"
        } karena tidak ada anak`,
      });

      remainingEstate = netEstate * (1 - spouseShare);
    }

    // Parents and siblings share the rest equally
    const totalGroupIIHeirs =
      parents.length + siblings.reduce((sum, s) => sum + (s.count || 1), 0);

    const sharePerPerson = remainingEstate / totalGroupIIHeirs;

    for (const parent of parents) {
      shares.push({
        heir: parent,
        fraction: `1/${totalGroupIIHeirs} dari sisa`,
        percentage: (sharePerPerson / netEstate) * 100,
        amount: sharePerPerson,
        explanation: `${getRelationLabel(
          parent.relation
        )} mendapat bagian sama dengan saudara`,
      });
    }

    for (const sibling of siblings) {
      const count = sibling.count || 1;
      shares.push({
        heir: sibling,
        fraction: `${count}/${totalGroupIIHeirs} dari sisa`,
        percentage: ((sharePerPerson * count) / netEstate) * 100,
        amount: sharePerPerson * count,
        explanation: `${getRelationLabel(
          sibling.relation
        )} mendapat bagian sama`,
      });
    }
  }
  // GROUP III: Grandparents
  else if (grandparents.length > 0) {
    explanations.push("Golongan III: Kakek/Nenek pewaris");

    let spouseShare = 0;
    let remainingEstate = netEstate;

    if (spouse) {
      spouseShare = grandparents.length === 1 ? 1 / 2 : 1 / 3;

      shares.push({
        heir: spouse,
        fraction: grandparents.length === 1 ? "1/2" : "1/3",
        percentage: spouseShare * 100,
        amount: netEstate * spouseShare,
        explanation: `Suami/Istri mendapat ${
          grandparents.length === 1 ? "1/2" : "1/3"
        }`,
      });

      remainingEstate = netEstate * (1 - spouseShare);
    }

    const sharePerGrandparent = remainingEstate / grandparents.length;

    for (const grandparent of grandparents) {
      shares.push({
        heir: grandparent,
        fraction: `1/${grandparents.length} dari sisa`,
        percentage: (sharePerGrandparent / netEstate) * 100,
        amount: sharePerGrandparent,
        explanation: `${getRelationLabel(
          grandparent.relation
        )} mendapat bagian sama`,
      });
    }
  }
  // Only spouse
  else if (spouse) {
    explanations.push("Hanya suami/istri yang menjadi ahli waris");
    shares.push({
      heir: spouse,
      fraction: "1/1",
      percentage: 100,
      amount: netEstate,
      explanation:
        "Suami/Istri mendapat seluruh harta karena tidak ada ahli waris lain",
    });
  }
  // No heirs
  else {
    warnings.push(
      "Tidak ada ahli waris yang ditemukan. Harta akan jatuh ke negara."
    );
  }

  return {
    input,
    netEstate,
    shares,
    residue: 0,
    explanations,
    warnings,
  };
}

// ============================================
// MAIN CALCULATOR FUNCTION
// ============================================

export function calculateInheritance(
  input: InheritanceInput
): InheritanceResult {
  if (input.lawSystem === "islam") {
    return calculateIslamicShares(input);
  } else {
    return calculateCivilShares(input);
  }
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Validate input
export function validateInput(input: InheritanceInput): string[] {
  const errors: string[] = [];

  if (!input.deceased.name) {
    errors.push("Nama pewaris harus diisi");
  }

  if (input.totalEstate <= 0) {
    errors.push("Total harta harus lebih dari 0");
  }

  if (input.debts < 0) {
    errors.push("Hutang tidak boleh negatif");
  }

  if (input.funeralCosts < 0) {
    errors.push("Biaya pemakaman tidak boleh negatif");
  }

  if (input.wasiat < 0) {
    errors.push("Wasiat tidak boleh negatif");
  }

  if (input.heirs.length === 0) {
    errors.push("Minimal harus ada satu ahli waris");
  }

  const netEstate =
    input.totalEstate - input.debts - input.funeralCosts - input.wasiat;
  if (netEstate <= 0) {
    errors.push(
      "Harta bersih harus lebih dari 0 setelah dikurangi hutang, biaya, dan wasiat"
    );
  }

  return errors;
}
