import mongoose, { Schema, Document } from "mongoose";

export interface Category extends Document {
    name: string;
    type: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

export const CategorySchema: Schema<Category> = new Schema({
    name: {
        type: String,
        required: true
    },
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

const CategoryModel = (mongoose.models.Category as mongoose.Model<Category>) || (mongoose.model<Category>("Category", CategorySchema));
export default CategoryModel;