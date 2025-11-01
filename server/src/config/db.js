const { connect } = require('mongoose');

const MONGO_URL = "mongodb+srv://shivam:shivam123@cluster0.as1lcts.mongodb.net";
const DB_NAME = "notes-app";

async function connectDB() {
    try {
        await connect(`${MONGO_URL}/${DB_NAME}`);
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
}

// 👉 Export the function, don't call it here
module.exports = connectDB;
