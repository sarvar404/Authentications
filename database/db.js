import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

mongoose.set("strictQuery", false);
const Connection = async () => {
  const URL = process.env.URL;

  // for  @ = %40
  // for   ' = %27
  // for  ! = %21

  // connect(`mongodb+srv://sarvar:8jugMdAG3o9AJnIE@db-sarvar-conexus.n3m7z8m.mongodb.net/?retryWrites=true&w=majority`,
  // mongodb://moontvadmin:moontvadmin@3.130.108.79:27017/moontvdb?directConnection=true&appName=mongosh+1.10.4 // aws
  // mongodb://0.0.0.0:27017/test
  // mongodb://moontvadmin:moontvadmin@3.140.149.6:27017/moontvdb?directConnection=true&appName=mongosh+2.0.1
  try {
    await mongoose.connect(`mongodb://moontvadmin:moontvadmin@3.140.149.6:27017/moontvdb?directConnection=true&appName=mongosh+2.0.1`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default Connection;
