import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB baglantisi basarili');
    } catch {
        console.error("MongoDB baglanti hatasi");
        process.exit(1);
    }
};

export default connectDB;