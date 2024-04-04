const mongoose=require('mongoose');
const { Schema }=mongoose; 

const notesSchema=new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, //acts as a foreign key to refernce user model to differentiate between users
        ref: "user"
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports=mongoose.model('notes',notesSchema);