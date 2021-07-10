import {Schema,model} from 'mongoose'
import bcrypt from 'bcrypt'
import  mongoosePaginate  from 'mongoose-paginate-v2'
import mongoose from 'mongoose'
const userSchema = new Schema({
    username:{
        type:String,
        required:[true,'Username must not be empty']
    },
    email:{
        type:String,
        required:[true,'Email must not be empty'],
        unique:[true,'Your email address is already used!']
    },
    password:{
        type:String,
        required:true,
        min:[8,'Password length must be greather than 8.']
    },
    role:{
        type:String,
        enum:['admin','super_admin','seller','buyer'],
        default:'buyer'
    },
    additional_info:{
        type:mongoose.Types.ObjectId,
        ref:'info'
    }
},{timestamps:true});
userSchema.plugin(mongoosePaginate);
userSchema.pre('save',function(next){
    var user =this;
    if(!user.isModified('password'))
    return next();
    bcrypt.hash(user.password,12,function(err,hash){
        if(err) return next(err);
        user.password = hash;
        next();
    })
})

export default model("user",userSchema)