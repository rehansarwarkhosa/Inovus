import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUserFeature extends Document {
  userId: mongoose.Types.ObjectId;
  featureId: mongoose.Types.ObjectId;
  totalQuantity?: number;
  usedQuantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserFeatureSchema = new Schema<IUserFeature>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    featureId: { type: Schema.Types.ObjectId, ref: "Feature", required: true, index: true },
    totalQuantity: { type: Number, default: 0 },
    usedQuantity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Unique per user + feature
UserFeatureSchema.index({ userId: 1, featureId: 1 }, { unique: true });

const UserFeature: Model<IUserFeature> =
  mongoose.models.UserFeature || mongoose.model<IUserFeature>("UserFeature", UserFeatureSchema);
export default UserFeature;
