const City = require('../models/city');

const add = async (cityData) => {
        const city = new City(cityData)
        return await city.save()
}

const get = async () => {
    return await City.find({})
}

const delAll = async () => {
    return await City.remove();
}

const del = async (cityId) => {
    return await City.deleteOne({ _id : cityId });
}

module.exports = {
    add,
    get,
    delAll,
    del
}