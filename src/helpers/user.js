import {sign} from 'jsonwebtoken'
import {JWT_SECRET} from '../config'

export const assign_token = async(user)=>{
    let token = await sign({user},JWT_SECRET,{expiresIn:'1d'})
    return `JWT ${token}`
}