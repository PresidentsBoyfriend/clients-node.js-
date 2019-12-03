const User = require('../models/user');

const add = async (userData) => {
        const user = new User(userData)
        return await user.save()
        return {user, token}  
}

const login = async function(req){
    const user = await User.findByCredentials(req.body.login, req.body.password) 
    const token = await user.generateAuthToken()    
    return {user, token}
}

const logout = async function(req){
    // req.user.tokens = req.user.tokens.filter((token) => {
    //     return token.token !== req.token

    // })
    await req.user.save()
}

const get = async () => {
    const result = await User.aggregate([
        {
            $lookup: {
                from: "cities",
                localField: "cityId",
                foreignField: "_id",
                as: "city"
            }
            
        },
        {
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$city", 0 ] }, "$$ROOT" ] } }
         },
         { $project: { city : 0 } }
    ])
    return result
}

const getUser = async (id) => {    
    return await User.find({ _id : id })
}

const update = async function(id, userData){
    return await User.findOneAndUpdate({ _id : id }, userData)
}

const del = async (userId) => {
    return await User.deleteOne({ _id : userId });
}



module.exports = {
    add,
    login,
    logout,
    get,
    getUser,
    update,
    del
}