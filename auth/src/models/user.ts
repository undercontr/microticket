import mongoose, { Schema, model, InferSchemaType, Document } from "mongoose";
import { Password } from "../services/password";

interface IUser {
    email: string,
    password: string
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(user: IUser): UserDoc
}

interface UserDoc extends Document {
    email: string;
    password: string;
}

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        const hashed = await Password.toHash(this.get("password"))
        this.set("password", hashed)
    }
    next();
})

userSchema.statics.build = (user: IUser) => {
    return new User(user)
}

const User = model<UserDoc, UserModel>("User", userSchema);

export { User }