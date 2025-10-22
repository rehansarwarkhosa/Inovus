import mongoose from "mongoose";
const { Schema } = mongoose;

const PlanFeatureSchema = new Schema(
  {
    planId: { type: Schema.Types.ObjectId, ref: "Plan", required: true, index: true },
    featureId: { type: Schema.Types.ObjectId, ref: "Feature", required: true, index: true },
    quantity: { type: Number, default: null },
  },
  { timestamps: true }
);

PlanFeatureSchema.index({ planId: 1, featureId: 1 }, { unique: true });

const PlanFeature = mongoose.models.PlanFeature || mongoose.model("PlanFeature", PlanFeatureSchema);
export default PlanFeature;
