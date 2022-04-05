export default function useLocalService() {

    //for setting data to local Storage
    function putIntoLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    //for getting data from local Storage
    function getDataFromLocalStorage(key) {
        return localStorage.getItem(key)
            ? JSON.parse(localStorage.getItem(key))
            : [];
    }
    return {
        putIntoLocalStorage,
        getDataFromLocalStorage
    }
}