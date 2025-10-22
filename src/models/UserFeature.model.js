import mongoose from "mongoose";
const { Schema } = mongoose;

const UserFeatureSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    featureId: { type: Number, ref: "Feature", required: true, index: true },
    totalQuantity: { type: Number, default: 0 },
    usedQuantity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

UserFeatureSchema.index({ userId: 1, featureId: 1 }, { unique: true });

const UserFeature = mongoose.models.UserFeature || mongoose.model("UserFeature", UserFeatureSchema);
export default UserFeature;
