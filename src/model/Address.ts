import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Address document
export interface Address extends Document {
  salonId: string;
  address: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the Address schema
export const AddressSchema: Schema<Address> = new Schema({
  salonId: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
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
const AddressModel = (mongoose.models.Address as mongoose.Model<Address>) || (mongoose.model<Address>("Address", AddressSchema));
export default AddressModel;
