const Storage = (() => {
    let data = {};

    const getItem = key => data[key];
    const setItem = (key, value) => {
        data[key] = value;
    };

    return {
        getItem: getItem,
        setItem: setItem 
    }
})();

module.exports = Storage;