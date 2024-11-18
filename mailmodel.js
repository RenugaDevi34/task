const mongoose=require('mongoose');
const mailOptions=mongoose.Schema({
    
    email:{type:String,required:true},//sender address
    to: {type:String,required:true}, // list of receivers
    subject:{type:String,required:true},
    text:{type:String,required:true},
    

},{timestamps: { email:'_id' ,createdAt: 'created_at',updatedAt:'updated_at' } 
})

module.exports=mongoose.model("mailDetails",mailOptions)
