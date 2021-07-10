
import {Schema,model} from 'mongoose'

const categorySchema = new Schema({
    name:{
        type:String,
        unique:[true,'Category name is already exist!'],
        required:[true,'Category name must not be empty']
    },
    img:{
        type:String,
        required:[true,'Image must not be empty'],
    }
},{timestamps:true})

export default model('category',categorySchema);