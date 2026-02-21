import mongoose, { Schema, Document } from "mongoose";

export interface Salon extends Document {
    registrationStage: number;
    email: string;
    firstName: string;
    lastName: string;
    businessName: string;
    phoneNumber: string;
    verified: boolean;
    serviceIds: string[] | null;
    categoryIds: string[] | null;
    businessHours: string[] | null;
    whereToProvide: string | null;
    whomToProvide: string | null;
    description: string | null;
    image: string | null;
    addressId: string | null;
    rating: number | null;
    createdAt: Date;
    updatedAt: Date;
}

export const SalonSchema: Schema<Salon> = new Schema({
    registrationStage: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    categoryIds: {
        type: [String],
        default: null
    },
    businessHours: {
        type: [String],
        default: null
    },
    verified: {
        type: Boolean,
        default: false
    },
    whereToProvide: {
        type: String,
        default: null
    },
    whomToProvide: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    addressId: {
        type: String,
        default: null
    },
    rating: {
        type: Number,
        default: null
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

const SalonModel = (mongoose.models.Salon as mongoose.Model<Salon>) || (mongoose.model<Salon>("Salon", SalonSchema));
export default SalonModel;
