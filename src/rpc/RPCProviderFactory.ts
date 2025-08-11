import BaseProvider from "./BaseProvider";
import RPCProviderConfig from "./RPCProviderConfig";

export default class RPCProviderFactory {
  RPCProviderConfig: RPCProviderConfig = new RPCProviderConfig();

  addProvider = (key: string, provider: BaseProvider) => {
    this.RPCProviderConfig.addProvider(key, provider);
  };

  getProvider = (method: string) => {
    return this.RPCProviderConfig.getProvider(method);
  };
}
