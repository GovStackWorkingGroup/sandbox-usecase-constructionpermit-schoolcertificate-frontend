import { Application, Inquiry, RecentActivity } from "./types";

export default abstract class BaseProvider {
  abstract getApplications(): Promise<Application[]>;
  abstract getInquieries(): Promise<Inquiry[]>;
  abstract getRecentActivity(): Promise<RecentActivity[]>;
  abstract setRecentActivity(activity: string): Promise<string>;
  abstract getData(key: string): Promise<string>;
  abstract setData(key: string, value: string): Promise<string>;
  abstract getDataSet(keys: string[]): Promise<string>;
  abstract setDataSet(keyValuePairs: object): Promise<string>;
  abstract forceSetData(key: string, value: string): Promise<string>;
  abstract invalidateSession(): Promise<string>;
  abstract getToken(username: string, password: string): Promise<string>;
  abstract registerUser(name: string, username: string, password: string): Promise<string>;
}
