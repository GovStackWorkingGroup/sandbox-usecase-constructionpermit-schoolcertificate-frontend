import BaseProvider from "./BaseProvider";
import StorageProvider from "./StorageProvider/StorageProvider";
import { Application, Inquiry, RecentActivity } from "./types";

export default class APIProvider extends BaseProvider {
  storageProvider = new StorageProvider();

  async getApplications() {
    const req = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/api/v1/rpc-data/data`,
      {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({
          "tenant": "construction-permit",
          "key": "applications"
        }),
      },
    );
    const response = await req.text();
    try {
      return JSON.parse(JSON.parse(response).value) as Promise<Application[]>
    } catch (e) {
      return [];
    }
  }

  
  async getInquieries() {
    const req = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/api/v1/rpc-data/data`,
      {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({
          "tenant": "construction-permit",
          "key": "applications"
        }),
      },
    );
    const response = await req.text();
    try {
      return JSON.parse(JSON.parse(response).value) as Promise<Inquiry[]>
    } catch (e) {
      return [];
    }
  }

  async getRecentActivity() {
    const req = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/api/v1/rpc-data/data`,
      {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({
          "tenant": "construction-permit",
          "key": "recent-activity"
        }),
      },
    );
    const response = await req.text();
    try {
      return JSON.parse(JSON.parse(response).value) as Promise<RecentActivity[]>
    } catch (e) {
      return []
    }
  }

  async setRecentActivity(activity: string) {
    const req = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/api/v1/rpc-data/data`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":"application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({
          "tenant": "construction-permit",
          "key": "recent-activity",
          "value": activity
        })
      },
    );
    if (req.ok) return req.json() as Promise<string>;
    else throw req.status
  }

  async getData(key: string) {
    const req = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/api/v1/rpc-data/data`,
      {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({
          "tenant": "construction-permit",
          "key": key
        })
      },
    );
    if (req.status != 400)
      return req.json() as Promise<string>;
    else throw "Error";
  }

  async setData(key: string, value: string) {
    const req = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/api/v1/rpc-data/data`,
      {
        method: "PUT",
        headers: {
          "Content-Type":"application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({
          "tenant": "construction-permit",
          "key": key,
          "value": value
        })
      },
    );
    if (req.ok) return req.json() as Promise<string>;
    else {
      return ""
    }
  }

  async getDataSet(keys: string[]) {
    const req = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/api/v1/rpc-data/data`,
      {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({
          "tenant": "construction-permit",
          "keys": keys
        })
      },
    );
    return req.json() as Promise<string>;
  }

  async setDataSet(keyValuePairs: object) {
    const req = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/api/v1/rpc-data/data`,
      {
        method: "PUT",
        headers: {
          "Content-Type":"application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({
          "tenant": "construction-permit",
          "keyValuePairs": keyValuePairs
        })
      },
    );
    if (req.ok) return req.json() as Promise<string>;
    else throw req.status
  }

  async forceSetData(key: string, value: string) {
    const req = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/api/v1/rpc-data/data`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":"application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({
          "tenant": "construction-permit",
          "key": key,
          "value": value
        })
      },
    );
    return req.json() as Promise<string>;
  }

  async invalidateSession () {
    const req = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/api/v1/rpc-data/session?tenant=construction-permit`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
      },
    );
    return req.text() as Promise<string>;
  }

  async getToken(username: string, password: string) {
    const req = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/api/v1/auth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "username": username.trim(),
          "password": password
        }),
      },
    );
    if (!req.ok) {
      throw "loginRequired"
    } else {
      return req.text() as Promise<string>;
    }
  }

  async registerUser(name: string, username: string, password: string) {
    const req = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/api/v1/auth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "name": name,
          "username": username,
          "password": password
        }),
      },
    );
    return req.json() as Promise<string>;
  }
}
