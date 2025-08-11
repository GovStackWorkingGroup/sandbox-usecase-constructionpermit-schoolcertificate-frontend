import APIProvider from "./APIProvider";
import BaseProvider from "./BaseProvider";
import MockProvider from "./MockProvider";
import StorageProvider from "./StorageProvider/StorageProvider";

export default class RPCProviderConfig {
  providers = {
    MOCK: new MockProvider(),
    API: new APIProvider(),
    STORAGE: new StorageProvider(),
  };
  map: Record<string, BaseProvider> = {
    getApplications: this.providers.API,
    getRecentActivity: this.providers.API,
    setRecentActivity: this.providers.API,
    getData: this.providers.API,
    setData: this.providers.API,
    getDataSet: this.providers.API,
    setDataSet: this.providers.API,
    forceSetData: this.providers.API,
    invalidateSession: this.providers.API,
    getToken: this.providers.API,
    registerUser: this.providers.API
  };
  addProvider = (key: string, provider: BaseProvider) => {
    this.providers = { ...this.providers, [key]: provider };
  };
  getProvider = (method: string) => {
    return this.map[method];
  };
}
