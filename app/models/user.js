const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        unique:true,
        // index: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    cityId: {
        type: ObjectId,
        required: true
    },
});

userSchema.statics.findByCredentials = async (login, password) => {
    const user = await User.findOne({login})
    if(!user) {
        throw new Error('Unable user')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString() }, 'expressapp');

    return token
}

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)


module.exports = User;