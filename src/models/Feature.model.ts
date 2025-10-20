import mongoose, { Document, Schema, Model } from "mongoose";

export interface IFeature extends Document {
  name: string;
  description?: string;
  isCore?: boolean;
  hasQuantity?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const FeatureSchema = new Schema<IFeature>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    isCore: { type: Boolean, default: false }, // core = enabled by default maybe
    hasQuantity: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Feature: Model<IFeature> = mongoose.models.Feature || mongoose.model<IFeature>("Feature", FeatureSchema);
export default Feature;
