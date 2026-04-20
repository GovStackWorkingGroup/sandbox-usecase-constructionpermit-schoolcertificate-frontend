import { Status } from "../components/status/ApplicationStatus";
import BaseProvider from "./BaseProvider";
import ObjectToTree from "./StorageProvider/objectToTree";
import { Application, RecentActivity } from "./types";

const localStorageVariable = "No such variable in mock storage";

const applications = [
    {
      id: "000326",
      status: Status.APPROVED,
      action: "",
      parcelID: "AB-1234",
      identification: [],
      documents: [],
      pendingDocuments: [],
      inspectionDate: ""
    },
    {
      id: "007266",
      status: Status.APPROVED,
      action: "",
      parcelID: "AB-2222",
      identification: [],
      documents: [],
      pendingDocuments: [],
      inspectionDate: ""
    },
    {
      id: "132513",
      status: Status.IN_REVIEW,
      action: "inReview",
      parcelID: "AB-1441",
      identification: [],
      documents: [],
      pendingDocuments: [],
      inspectionDate: ""
    },
    {
      id: "006598",
      status: Status.IN_REVIEW,
      action: "inReview",
      parcelID: "AB-1123",
      identification: [],
      documents: [],
      pendingDocuments: [],
      inspectionDate: ""
    },
    {
      id: "987654",
      status: Status.ACTION_NEEDED,
      action: "documentsRequired",
      parcelID: "AB-1314",
      identification: [],
      documents: [],
      pendingDocuments: [
        {
          name: "Environmental Impact Assessment Report",
          extensions: ".pdf"
        },
        {
          name: "Utilities and Infrastructure Plans",
          extensions: ".dwg, .dxf, .dgn, .rfa, .pln"
        }
      ],
      inspectionDate: ""
    },
    {
      id: "396543",
      status: Status.DRAFT,
      action: "",
      parcelID: "AB-1211",
      identification: [],
      documents: [],
      pendingDocuments: [],
      inspectionDate: ""
    }
  ];

  const recentActivity = [
    {name: "Construction Permit", path: "/housing/construction-permit"},
    {name: "My applications", path: "/housing/construction-permit/my-applications"},
    {name: "Visa application hub", path: "/"},
    {name: "Social welfare programs", path: "/"},
    {name: "Registration of residence", path: "/"}
  ];

const objectToTree = new ObjectToTree();

export default class MockProvider extends BaseProvider {

  async getApplications() {
    return new Promise<Application[]>((resolve) => {
      resolve(applications);
    });
  }

  async getRecentActivity() {
    return new Promise<RecentActivity[]>((resolve) => {
      resolve(recentActivity);
    });
  }

  async setRecentActivity(activity: string) {
    return new Promise<string>((resolve) => {
      resolve(activity);
    });
  }

  async getData() {
    return "";
  }

  async setData() {
    return "";
  }

  async getDataSet() {
    return "";
  }

  async setDataSet() {
    return "";
  }

  async forceSetData() {
    return "";
  }

  async invalidateSession() {
    return "";
  }

  async getToken() {
    return "";
  }

  async registerUser() {
    return "";
  }

  getMockItem(key: string): Promise<string> {
    // const objectToTree = new ObjectToTree();
    return new Promise<string>((resolve) => {
      if (key == "applications") resolve(JSON.stringify(objectToTree.decompose(applications)));
      // else if (key == "packages") resolve(JSON.stringify(objectToTree.decompose(this.packagesList)));
      // else resolve(JSON.stringify(localStorageVariable));
      else resolve(localStorageVariable);
    });
  }
}
