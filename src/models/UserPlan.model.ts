import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUserPlan extends Document {
  userId: mongoose.Types.ObjectId;
  planId: mongoose.Types.ObjectId;
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserPlanSchema = new Schema<IUserPlan>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    planId: { type: Schema.Types.ObjectId, ref: "Plan", required: true, index: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: null },
  },
  { timestamps: true }
);

// A user may have at most one active plan record per plan (uniqueness optional, depending on your rules)
UserPlanSchema.index({ userId: 1, planId: 1 });

const UserPlan: Model<IUserPlan> = mongoose.models.UserPlan || mongoose.model<IUserPlan>("UserPlan", UserPlanSchema);
export default UserPlan;
