import {model,Schema} from 'mongoose'
const positionScehma=new Schema({
    lat:Number,
    lng:Number,
})
const infoSchema = new Schema({
    address:{
        type:String,
        required:true
    },
    position:positionScehma,
    region:String
})

export default model('info',infoSchema)