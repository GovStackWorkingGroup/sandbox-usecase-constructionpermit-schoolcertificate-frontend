import { createContext } from "react";
import RPCProviderFactory from "./RPCProviderFactory";

export default class RPC {
  RPCProviderFactory: RPCProviderFactory = new RPCProviderFactory();

  getApplications = () =>
    this.RPCProviderFactory.getProvider("getApplications").getApplications();

    getInquiries = () =>
    this.RPCProviderFactory.getProvider("getInquiries").getInquieries();

  getRecentActivity = () =>
    this.RPCProviderFactory.getProvider("getRecentActivity").getRecentActivity();

  setRecentActivity = (activity: string) =>
    this.RPCProviderFactory.getProvider("setRecentActivity").setRecentActivity(activity);

  getData = (key: string) =>
    this.RPCProviderFactory.getProvider("getData").getData(key);

  setData = (key: string, value: string) =>
    this.RPCProviderFactory.getProvider("setData").setData(key, value);

  getDataSet = (keys: string[]) =>
    this.RPCProviderFactory.getProvider("getDataSet").getDataSet(keys);

  setDataSet = (keyValuePairs: object) =>
    this.RPCProviderFactory.getProvider("setDataSet").setDataSet(keyValuePairs);

  forceSetData = (key:string, value: string) =>
    this.RPCProviderFactory.getProvider("forceSetData").forceSetData(key, value);

  invalidateSession = () =>
    this.RPCProviderFactory.getProvider("invalidateSession").invalidateSession();

  getToken = (username: string, password: string) =>
    this.RPCProviderFactory.getProvider("getToken").getToken(username, password);

  registerUser = (name: string, username: string, password: string) =>
    this.RPCProviderFactory.getProvider("registerUser").registerUser(name, username, password);

}

export const RPCContext = createContext(new RPC());
