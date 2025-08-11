import BaseProvider from '../BaseProvider';
import MockProvider from '../MockProvider';
import ObjectToTree from './objectToTree';

export default class StorageProvider extends BaseProvider {
  objectToTree = new ObjectToTree();
  mockProvider = new MockProvider();

  async getApplications() {
      return [];
  }

  async getRecentActivity() {
    return [];
  }

  async setRecentActivity(activity: string) {
    return activity;
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

  getLocalStorageItem(key: string) {
    return new Promise<string>(async (resolve) => {
      var item = localStorage.getItem(key);
      if (!item) {
        item = await this.mockProvider.getMockItem(key);
        this.setLocalStorageItem(key, item);
      }
      resolve(item);
    })
  };

  setLocalStorageItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getLocalStorageObject(key: string) {
    return new Promise<object>(async (resolve) => {
      var item = await this.getLocalStorageItem(key);
      resolve(this.objectToTree.compose(JSON.parse(item)));
    })
  };

  setLocalStorageObject(key: string, object: object) {
    localStorage.setItem(key, JSON.stringify(this.objectToTree.decompose(object)));
  }

  removeLocalStorageItem(key: string) {
    localStorage.removeItem(key);
    return new Promise<string>((resolve) => {
      resolve("Removed " + key);
    });
  }
}
