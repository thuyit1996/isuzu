export const STORAGE_CAMPAIGNS = 'campaigns';
export const STORAGE_LAST_SEARCH_DEALER = 'last-search-dealer';
export const STORAGE_SAVE_QUOTE = 'save-quote';
export const localStorageService = {
  setLocalStorageByKey(key, value) {
    localStorage.setItem(key, value);
  },

  getByKey(key) {
    return localStorage.getItem(key);
  },

  removeLocalStorageByKey(key) {
    localStorage.removeItem(key);
  }
};
