//default storage
var ls = window.localStorage;

const get = (key) => {
  return JSON.parse(ls.getItem(key));
};

const set = (key, value) => {
  try {
    ls.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
};

const remove = (key) => {
  return ls.removeItem(key);
};

const clear = () => {
  return ls.clear();
};

function storageType(type) {
  type && (ls = store);

  return ls;
}

function store(key, value) {
  return value !== undefined ? set(key, value) : get(key);
}
store.set = set;
store.get = get;
store.remove = remove;
store.clear = clear;
store.storageType = storageType;

export default store;
