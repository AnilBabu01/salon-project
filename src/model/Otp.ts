import mongoose, { Schema, Document } from "mongoose";

export interface Otp extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

export const OtpSchema: Schema<Otp> = new Schema({
  email: {
    type: String,
    required: true,
    index: true
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const OtpModel = (mongoose.models.Otp as mongoose.Model<Otp>) || (mongoose.model<Otp>("Otp", OtpSchema));
export default OtpModel;