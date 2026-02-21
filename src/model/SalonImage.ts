import mongoose, { Schema, Document } from "mongoose";

// Define ImgDoc schema
const ImgDocSchema: Schema = new Schema({
  url: { type: String, required: true },
  key: { type: String, required: true },
});

const ServiceImgSchema: Schema = new Schema({
  serviceId: { type: String, required: true },
  url: { type: String, required: true },
  key: { type: String, required: true },
});

// Define the SalonImage interface
export interface SalonImage extends Document {
  salonId: string;
  email: string;
  heroImage: typeof ImgDocSchema | null; // Use the type of ImgDocSchema
  menuImages: typeof ImgDocSchema[];
  certificateImages: typeof ImgDocSchema[];
  businessImages: typeof ImgDocSchema[];
  serviceImages: typeof ServiceImgSchema[];
  createdAt: Date;
  updatedAt: Date;
}

// Define the main SalonImgSchema
export const SalonImgSchema: Schema<SalonImage> = new Schema({
  salonId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  heroImage: {
    type: ImgDocSchema, // Use the ImgDocSchema
    default: null,
  },
  menuImages: {
    type: [ImgDocSchema], // Use the ImgDocSchema
    default: [],
  },
  certificateImages: {
    type: [ImgDocSchema], // Use the ImgDocSchema
    default: [],
  },
  businessImages: {
    type: [ImgDocSchema], // Use the ImgDocSchema
    default: [],
  },
  serviceImages: {
    type: [ServiceImgSchema], // Use the ImgDocSchema
    default: [],
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

// Create the model
const SalonImgModel = (mongoose.models.SalonImage as mongoose.Model<SalonImage>) || mongoose.model<SalonImage>("SalonImage", SalonImgSchema);
export default SalonImgModel;
