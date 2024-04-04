const mongoose = require("mongoose");
const mongoUri = 'mongodb://127.0.0.1:27017/notes';

function getconnection(){
    mongoose.connect(mongoUri).then(
        ()=>{
            console.log(`connected successfully `)
        }
    ).catch(
        (err)=>{
            console.log(err)

        }
    )
}
module.exports=getconnection;
