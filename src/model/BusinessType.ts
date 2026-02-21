import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the BusinessType document
export interface BusinessType extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the BusinessType schema
export const BusinessTypeSchema: Schema<BusinessType> = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model, checking if it already exists
const BusinessTypeModel = (mongoose.models.BusinessType as mongoose.Model<BusinessType>) ||
  mongoose.model<BusinessType>("BusinessType", BusinessTypeSchema);

export default BusinessTypeModel;
