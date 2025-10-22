import mongoose from "mongoose";
const { Schema } = mongoose;

const FeatureSchema = new Schema(
  {
    _id: { type: Number, required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String },
    isCore: { type: Boolean, default: false },
    hasQuantity: { type: Boolean, default: false },
  },
  { _id: false, timestamps: true }
);

const Feature = mongoose.models.Feature || mongoose.model("Feature", FeatureSchema);
export default Feature;
