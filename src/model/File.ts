import mongoose, { Schema, Document } from "mongoose";

export interface SalonFile extends Document {
  url: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export const FileSchema: Schema<SalonFile> = new Schema({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
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

const SalonFileModel = (mongoose.models.SalonFile as mongoose.Model<SalonFile>) || (mongoose.model<SalonFile>("SalonFile", FileSchema));
export default SalonFileModel;