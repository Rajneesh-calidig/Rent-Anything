export function setSessionData(key, value) {
    return sessionStorage.setItem(key, value);
  }
  
  export function getSessionData(key) {
    return sessionStorage.getItem(key);
  }
  
  export function removeSessionData(key) {
    return sessionStorage.removeItem(key);
  }
  
  export function clearSessionData() {
    return sessionStorage.clear();
  }