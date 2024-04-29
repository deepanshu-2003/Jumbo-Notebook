const Mongoose  = require("mongoose");

const UserSchema = Mongoose.Schema({
    first_name:{
        type: String,
        require: true
    },
    last_name:{
        type: String
    },
    username:{
        type: String,
        require: true,
        unique: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now
    },

});

module.exports = Mongoose.model('user',UserSchema);