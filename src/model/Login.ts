import mongoose, { Schema, Document } from "mongoose";

export interface Login extends Document {
  email: string;
  password: string;
  isVerified: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const LoginSchema: Schema<Login> = new Schema({
  email: {
    type: String,
    required: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const LoginModel = (mongoose.models.Login as mongoose.Model<Login>) || (mongoose.model<Login>("Login", LoginSchema));
export default LoginModel;