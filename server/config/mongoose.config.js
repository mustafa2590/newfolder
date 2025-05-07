import { connect } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const MONGO_URI = process.env.MONGODB_URI

export const dbConnect = async () => {
    try {
        await connect( MONGO_URI, { dbName: 'ezshop' })
        console.log('Connected to MongoDB EZ-Shop')
    }
    catch( error ){ `DB connection failed --->  ${error}` }
}