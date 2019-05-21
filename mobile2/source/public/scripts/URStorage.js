/**
 * 定制化的 sessionStorage 和 localStorage
 * @param {boolean} isSessionStorage    是否使用sessionStorage
 */

function URStorage(keyName) {

    this.keyName = keyName;

    // 读取storage
    this.getStorage = function(isSessionStorage) {
        var name = isSessionStorage ? 'sessionStorage' : 'localStorage';
        return JSON.parse(window[name].getItem(this.keyName)) || {}
    };

    // 查询storage中是否存在指定key的数据
    this.hasStorageByName = function(key, isSessionStorage) {
        if(this.getStorage(isSessionStorage)[key]){
            return true;
        } else {
            return false;
        }
    };

    // 获取指定key的数据
    this.getStorageByName = function(key, isSessionStorage) {
        return this.getStorage(isSessionStorage)[key]
    };

    // 从storage中删除指定的数据
    this.removeStorageByName = function(key, isSessionStorage) {
        var name = isSessionStorage ? 'sessionStorage' : 'localStorage';
        var storage = this.getStorage(isSessionStorage);
        delete storage[key];
        return window[name].setItem(this.keyName, JSON.stringify(storage))
    };

    // 清空storage(只会删除定制化的storage数据)
    this.clearStorage = function(isSessionStorage) {
        var name = isSessionStorage ? 'sessionStorage' : 'localStorage';
        return window[name].removeItem(this.keyName)
    };

    // 向storage写入指定数据
    this.setStorage = function(key, value, isSessionStorage) {
        var name = isSessionStorage ? 'sessionStorage' : 'localStorage';
        var storage = this.getStorage(isSessionStorage);
        storage[key] = value;
        return window[name].setItem(this.keyName, JSON.stringify(storage))
    }
};

