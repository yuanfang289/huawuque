/**
 * 定制化的 sessionStorage 和 localStorage
 * @param {boolean} isSessionStorage    是否使用sessionStorage
 */

export default class Storage {
  constructor(keyName) {
    this.keyName = keyName;
  }

  // 读取storage
  getStorage = (isSessionStorage = false) => {
    let name = isSessionStorage ? 'sessionStorage' : 'localStorage';
    return JSON.parse(window[name].getItem(this.keyName)) || {}
  };

  // 查询storage中是否存在指定key的数据
  hasStorageByName = (key, isSessionStorage) => {
    return key in this.getStorage(isSessionStorage)
  };

  // 获取指定key的数据
  getStorageByName = (key, isSessionStorage) => {
    return this.getStorage(isSessionStorage)[key]
  };

  // 从storage中删除指定的数据
  removeStorageByName = (key, isSessionStorage) => {
    let name = isSessionStorage ? 'sessionStorage' : 'localStorage';
    let storage = this.getStorage(isSessionStorage);
    delete storage[key];
    return window[name].setItem(this.keyName, JSON.stringify(storage))
  };

  // 清空storage(只会删除定制化的storage数据)
  clearStorage = (isSessionStorage) => {
    let name = isSessionStorage ? 'sessionStorage' : 'localStorage';
    return window[name].removeItem(this.keyName)
  };

  // 向storage写入指定数据
  setStorage = (key, value, isSessionStorage) => {
    let name = isSessionStorage ? 'sessionStorage' : 'localStorage';
    let storage = this.getStorage(isSessionStorage);
    storage[key] = value;
    return window[name].setItem(this.keyName, JSON.stringify(storage))
  }
}
