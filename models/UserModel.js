import mongoose, { Mongoose } from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: 'last name'
    },
    location: {
        type: String,
        default: "my city"
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user"
    },
})

export default mongoose.model("User", UserSchema)