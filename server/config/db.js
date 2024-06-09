import mongoose from "mongoose";

const dbConnection = async() => {
   await mongoose.connect(process.env.MONGODB_URL).then(()=> {
    console.log("mongodb connected successfull")
   }).catch((error) => {
    console.log('mongodb is not connected', error)
   })
}

export default dbConnection