class StorageService {
  static async setItem(key: string, value: string): Promise<void> {
    await localStorage.setItem(key, value);
  }

  static async deleteItem(key: string): Promise<void> {
    await localStorage.removeItem(key);
  }

  static getItem(key: string): Promise<string | null> {
    return Promise.resolve(localStorage.getItem(key));
  }

  static async setBoolean(key: string, value: boolean | null): Promise<void> {
    await localStorage.setItem(key, value ? "1" : "0");
  }

  static async getBoolean(key: string): Promise<boolean | null> {
    const result = await localStorage.getItem(key);
    return result === "1";
  }
}

export default StorageService;
