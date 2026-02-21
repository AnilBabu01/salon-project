import mongoose, { Schema, Document } from "mongoose";

export interface Banner extends Document {
    type: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

export const BannerSchema: Schema<Banner> = new Schema({
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: "home"
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

const BannerModel = (mongoose.models.Banner as mongoose.Model<Banner>) || (mongoose.model<Banner>("Banner", BannerSchema));
export default BannerModel;