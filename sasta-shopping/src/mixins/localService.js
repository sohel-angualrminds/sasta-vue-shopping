export default {
    methods: {
        //for setting data to local Storage
        putIntoLocalStorage(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        //for getting data from local Storage
        getDataFromLocalStorage(key) {
            return localStorage.getItem(key)
                ? JSON.parse(localStorage.getItem(key))
                : [];
        },
    }
}