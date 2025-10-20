import mongoose, { Document, Schema, Model } from "mongoose";

export interface IPlanFeature extends Document {
  planId: mongoose.Types.ObjectId;
  featureId: mongoose.Types.ObjectId;
  quantity?: number; // allowed quantity for this feature by this plan
  isFeatured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const PlanFeatureSchema = new Schema<IPlanFeature>(
  {
    planId: { type: Schema.Types.ObjectId, ref: "Plan", required: true, index: true },
    featureId: { type: Schema.Types.ObjectId, ref: "Feature", required: true, index: true },
    quantity: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// unique per plan + feature
PlanFeatureSchema.index({ planId: 1, featureId: 1 }, { unique: true });

const PlanFeature: Model<IPlanFeature> =
  mongoose.models.PlanFeature || mongoose.model<IPlanFeature>("PlanFeature", PlanFeatureSchema);
export default PlanFeature;
