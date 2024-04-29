const Mongoose  = require("mongoose");

const NotesSchema = Mongoose.Schema({
    user:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type: String,
        require: true,
    },
    note:{
        type: String,
        require:true
    },
    tag:{
        type: String,
        default: 'General'
    },
    date:{
        type: Date,
        default: Date.now
    },

});

module.exports = Mongoose.model('notes',NotesSchema);