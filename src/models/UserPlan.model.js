import mongoose from "mongoose";
const { Schema } = mongoose;

const UserPlanSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    planId: { type: Number, ref: "Plan", required: true, index: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: null },
  },
  { timestamps: true }
);

UserPlanSchema.index({ userId: 1, planId: 1 });

const UserPlan = mongoose.models.UserPlan || mongoose.model("UserPlan", UserPlanSchema);
export default UserPlan;
