import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String, require: true
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['Director', 'Finance', 'Manager', 'Employee'],
        default: 'Employee'
    },
}, { timestamps: true });

export const Admin = mongoose.model("Users", userSchema);
