import mongoose from 'mongoose'
import {DB} from '../config'

const prod_db = 'mongodb+srv://iconic_admin:Fblf1Bkxj1gdXBBb@iconicmyanmar.b6pkt.mongodb.net/ecMyanmardb?retryWrites=true&w=majority'
export const connect_DB = ()=>{
    
    try {
        mongoose.connect(prod_db,{
            useCreateIndex:true,
            useFindAndModify:true,
            useNewUrlParser:true,
            useUnifiedTopology:true,

        })
        .then(()=>{
            console.log(`DB connected successfully!`)
        })
    } catch (error) {
        console.log(error.message)
    }
}