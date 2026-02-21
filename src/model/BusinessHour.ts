import mongoose, { Schema, Document } from "mongoose";

export interface BusinessHours extends Document {
  day: string;        // e.g., "Monday", "Tuesday", etc.
  startTime: string;  // e.g., "09:00"
  endTime: string;    // e.g., "17:00"
  createdAt: Date;
  updatedAt: Date;
}

export const BusinessHoursSchema: Schema<BusinessHours> = new Schema({
  day: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Create the model, checking if it already exists
const BusinessHoursModel = (mongoose.models.BusinessHours as mongoose.Model<BusinessHours>) || (mongoose.model<BusinessHours>("BusinessHours", BusinessHoursSchema));

export default BusinessHoursModel;
