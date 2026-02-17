// Auth types and utilities

export type UserRole = "user" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  occupation?: string;
  company?: string;
  joinedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface EnrolledClass {
  id: string;
  title: string;
  type: "course" | "training" | "workshop";
  instructor: string;
  enrolledAt: string;
  progress: number; // 0-100
  status: "ongoing" | "completed" | "upcoming";
  certificateId?: string;
}

export interface RatedClass {
  id: string;
  title: string;
  type: "course" | "training" | "workshop";
  rating: number; // 1-5
  review?: string;
  ratedAt: string;
}

export interface Certificate {
  id: string;
  classId: string;
  classTitle: string;
  classType: "course" | "training" | "workshop";
  issuedAt: string;
  certificateNumber: string;
  downloadUrl: string;
}

export interface UserProfile extends User {
  enrolledClasses: EnrolledClass[];
  ratedClasses: RatedClass[];
  certificates: Certificate[];
}

// Storage keys
const AUTH_STORAGE_KEY = "dhsi_auth";
const USER_STORAGE_KEY = "dhsi_user";

// Mock users database
export const mockUsers: UserProfile[] = [
  {
    id: "user-1",
    email: "user@dhsi.com",
    name: "Budi Santoso",
    role: "user",
    avatar: "/avatars/user-1.jpg",
    phone: "081234567890",
    occupation: "Legal Consultant",
    company: "PT Hukum Sejahtera",
    joinedAt: "2024-06-15",
    enrolledClasses: [
      {
        id: "training-1",
        title: "Sertifikasi Ahli Hukum Siber",
        type: "training",
        instructor: "Dr. Ahmad Fauzi, S.H., M.H.",
        enrolledAt: "2024-08-01",
        progress: 75,
        status: "ongoing",
      },
      {
        id: "workshop-1",
        title: "Workshop Penyusunan Kebijakan Privasi",
        type: "workshop",
        instructor: "Ratna Dewi, S.H., LL.M.",
        enrolledAt: "2024-07-15",
        progress: 100,
        status: "completed",
        certificateId: "cert-1",
      },
      {
        id: "course-1",
        title: "Pengantar Hukum Digital",
        type: "course",
        instructor: "Prof. Bambang Wijaya",
        enrolledAt: "2024-09-01",
        progress: 30,
        status: "ongoing",
      },
      {
        id: "training-3",
        title: "Digital Forensics Professional",
        type: "training",
        instructor: "Komisaris Besar Pol. (Purn.) Drs. Teguh Prasetyo",
        enrolledAt: "2024-12-01",
        progress: 0,
        status: "upcoming",
      },
    ],
    ratedClasses: [
      {
        id: "workshop-1",
        title: "Workshop Penyusunan Kebijakan Privasi",
        type: "workshop",
        rating: 5,
        review:
          "Workshop yang sangat informatif dan praktis. Instruktur menjelaskan dengan sangat jelas dan memberikan contoh-contoh kasus nyata.",
        ratedAt: "2024-07-20",
      },
      {
        id: "course-2",
        title: "Dasar-Dasar Cybersecurity",
        type: "course",
        rating: 4,
        review: "Materi lengkap dan mudah dipahami. Sangat cocok untuk pemula.",
        ratedAt: "2024-06-30",
      },
    ],
    certificates: [
      {
        id: "cert-1",
        classId: "workshop-1",
        classTitle: "Workshop Penyusunan Kebijakan Privasi",
        classType: "workshop",
        issuedAt: "2024-07-20",
        certificateNumber: "DHSI/WKS/2024/001234",
        downloadUrl: "/certificates/cert-1.pdf",
      },
      {
        id: "cert-2",
        classId: "course-2",
        classTitle: "Dasar-Dasar Cybersecurity",
        classType: "course",
        issuedAt: "2024-06-30",
        certificateNumber: "DHSI/CRS/2024/000567",
        downloadUrl: "/certificates/cert-2.pdf",
      },
    ],
  },
  {
    id: "admin-1",
    email: "admin@dhsi.com",
    name: "Admin DHSI",
    role: "admin",
    avatar: "/avatars/admin-1.jpg",
    phone: "081298765432",
    occupation: "Administrator",
    company: "DHSI",
    joinedAt: "2024-01-01",
    enrolledClasses: [],
    ratedClasses: [],
    certificates: [],
  },
];

// Auth functions
export function saveAuthToStorage(user: User): void {
  if (typeof window === "undefined") return;

  const authData = {
    isAuthenticated: true,
    timestamp: Date.now(),
  };

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

  // Also set a cookie for server-side checks
  document.cookie = `${AUTH_STORAGE_KEY}=true; path=/; max-age=${
    60 * 60 * 24 * 7
  }`; // 7 days
  document.cookie = `${USER_STORAGE_KEY}=${encodeURIComponent(
    JSON.stringify({ id: user.id, role: user.role })
  )}; path=/; max-age=${60 * 60 * 24 * 7}`;
}

export function getAuthFromStorage(): {
  user: User | null;
  isAuthenticated: boolean;
} {
  if (typeof window === "undefined") {
    return { user: null, isAuthenticated: false };
  }

  try {
    const authData = localStorage.getItem(AUTH_STORAGE_KEY);
    const userData = localStorage.getItem(USER_STORAGE_KEY);

    if (authData && userData) {
      const auth = JSON.parse(authData);
      const user = JSON.parse(userData);

      // Check if auth is still valid (7 days)
      const weekInMs = 7 * 24 * 60 * 60 * 1000;
      if (auth.isAuthenticated && Date.now() - auth.timestamp < weekInMs) {
        return { user, isAuthenticated: true };
      }
    }
  } catch {
    // Invalid data, clear it
    clearAuthFromStorage();
  }

  return { user: null, isAuthenticated: false };
}

export function clearAuthFromStorage(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);

  // Clear cookies
  document.cookie = `${AUTH_STORAGE_KEY}=; path=/; max-age=0`;
  document.cookie = `${USER_STORAGE_KEY}=; path=/; max-age=0`;
}

export function getUserProfile(userId: string): UserProfile | null {
  return mockUsers.find((u) => u.id === userId) || null;
}

export function login(
  email: string,
  password: string
): { success: boolean; user?: User; error?: string } {
  // Mock login - in real app, this would be an API call
  const user = mockUsers.find((u) => u.email === email);

  if (!user) {
    return { success: false, error: "Email tidak terdaftar" };
  }

  // Mock password check (in real app, this would be hashed)
  // For demo: password is "password123" for all users
  if (password !== "password123") {
    return { success: false, error: "Password salah" };
  }

  // Return user without profile data
  const { enrolledClasses, ratedClasses, certificates, ...userData } = user;
  return { success: true, user: userData };
}

export function register(data: {
  email: string;
  password: string;
  name: string;
  phone?: string;
}): { success: boolean; user?: User; error?: string } {
  // Check if email already exists
  const existingUser = mockUsers.find((u) => u.email === data.email);
  if (existingUser) {
    return { success: false, error: "Email sudah terdaftar" };
  }

  // Create new user
  const newUser: User = {
    id: `user-${Date.now()}`,
    email: data.email,
    name: data.name,
    role: "user",
    phone: data.phone,
    joinedAt: new Date().toISOString().split("T")[0],
  };

  return { success: true, user: newUser };
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
