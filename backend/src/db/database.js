import mongoose  from "mongoose";

const database = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb+srv://jraut3434:jyoti123@cluster0.kby1rdm.mongodb.net/`,{
            dbName: process.env.DB_NAME,
        });
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default database;

