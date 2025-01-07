export interface Student {
    id?: number;
    name: string;
    birthDate: string;
    email: string;
    phone: string;
    gender: string;
    legalGuardian: string;
    emergencyContact?: string;
    emergencyPhone?: string;
    relationship?: string;
    observation?: string;
    address?: string;
    postalCode?: string;
    city?: string;
    state?: string;
    country?: string;
    status?: "ACTIVE" | "INACTIVE";
    weight?: number;
    height?: number;
    beltId?: number;
    degreeId?: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
  }


  export interface Training {
    id: number;
    name: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    modalityId: number;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface Attendance {
    id: number;
    trainingId: number;
    studentId: number;
    date: string;
    status: "PRESENT" | "ABSENT";
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface TopStudent {
    studentId: number;
    name: string;
    attendanceCount: number;
  }

  export interface Belt {
    description: string;
    createdAt?: string;
    updatedAt?: string;
  }