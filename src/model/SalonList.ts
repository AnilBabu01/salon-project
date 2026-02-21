import mongoose, { Schema, Document } from "mongoose";

export interface Salonlist extends Document {
  type: string;

  image: any;
  name: string;
  description: string;
  rating: string;
  location: string;
  openCloseTime: string;
  map: string;
  createdAt: Date;
  updatedAt: Date;
}

export const SalonlistSchema: Schema<Salonlist> = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  openCloseTime: {
    type: String,
    required: true,
  },
  map: {
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

const SalonlistSchemaModel =
  (mongoose.models.Salonlist as mongoose.Model<Salonlist>) ||
  mongoose.model<Salonlist>("Salonlist", SalonlistSchema);
export default SalonlistSchemaModel;
