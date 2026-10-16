import mongoose from "mongoose";
const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://charanjot2005_db_user:6jAp7E69DN4ZmRnA@cluster0.rbvb3qu.mongodb.net/?appName=Cluster0",
    );
    console.log("connectec");
  } catch (error) {
    console.log("connection failed", error);
    process.exit(1);
  }
};
export default dbConnect;
