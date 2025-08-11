import { Status } from "../components/status/ApplicationStatus";


export interface Application {
  id: string;
  status: Status;
  parcelID?: string;
  certificateID?: string;
  identification: { role: ROLE; data: RoleData }[];
  action: "paymentRequired" | string;
  documents: {
    name: string;
    progress: number;
    url: string;
  }[];
  pendingDocuments: {
    name: string;
    extensions: string;
  }[];
  inspectionDate: string
}

export interface Inquiry {
  id: string;
  status: Status;
  studentFullName?:string;
  studentID?: string;
  studentAddress?:string;
  certificateID?: string;
  identificationStarted?: boolean;
  identification: { role: ROLE; data: RoleData }[];
  paymentMethod?: string;
  action: "paymentRequired" | string;
}

export interface RecentActivity {
  name: string,
  path: string
}

export enum ROLE {
  HIGHSCHOOL_GRADUATE = "HIGHSCHOOL_GRADUATE",
  PROPERTY_OWNER = "PROPERTY_OWNER",
  PRINCIPAL_CONTRACTOR = "PRINCIPAL_CONTRACTOR",
  LEAD_ARCHITECT_OR_ENGINEER = "LEAD_ARCHITECT_OR_ENGINEER",
  OTHER = "OTHER",
}

export interface RoleData {
  name: string | null;
  idNumber: string | null;
}