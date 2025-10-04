import mongoose from "mongoose";

export const connectDB = async () => {
    const connectionString = process.env.CONNECTION_STRING;
    if (!connectionString) {
        console.error("❌ CONNECTION_STRING is missing in .env file.");
        process.exit(1);
    }

    try {
        const db = await mongoose.connect(connectionString);
        console.log(
            `\nDatabase Ready := ${db.connections[0].readyState === 1 ? "True" : "False"
            }\nDatabase Name := ${db.connection.name}\nDatabase Host := ${db.connection.host
            }`
        );
    } catch (error) {
        console.log("Database Connection Failed: ", error);
        process.exit(1);
    }
};
