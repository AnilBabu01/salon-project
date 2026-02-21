import mongoose, { Schema, Document } from "mongoose";

export interface ServiceDetails extends Document {
  imgId: string | null;
  salonId: string;
  serviceName: string;
  serviceHours: number;
  serviceMinutes: number;
  serviceType: string;
  servicePrice: number;
  mobile: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const ServiceDetailsSchema: Schema<ServiceDetails> = new Schema({
  imgId: {
    type: String,
    required: false,
    default: null
  },
  salonId: {
    type: String,
    required: true
  },
  serviceName: {
    type: String,
    required: true
  },
  serviceHours: {
    type: Number,
    required: true,
    min: 0
  },
  serviceMinutes: {
    type: Number,
    required: true,
    min: 0,
    max: 59
  },
  serviceType: {
    type: String,
    required: true
  },
  servicePrice: {
    type: Number,
    required: true,
    min: 0
  },
  mobile: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Create the model, checking if it already exists
const ServiceDetailsModel = (mongoose.models.ServiceDetails as mongoose.Model<ServiceDetails>) || (mongoose.model<ServiceDetails>("ServiceDetails", ServiceDetailsSchema));

export default ServiceDetailsModel;
