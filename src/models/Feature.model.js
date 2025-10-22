import mongoose from "mongoose";
const { Schema } = mongoose;

const FeatureSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    isCore: { type: Boolean, default: false },
    hasQuantity: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Feature = mongoose.models.Feature || mongoose.model("Feature", FeatureSchema);
export default Feature;
