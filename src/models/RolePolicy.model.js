import mongoose from "mongoose";
const { Schema } = mongoose;

const RolePolicySchema = new Schema(
  {
    roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true, index: true },
    policyId: { type: Schema.Types.ObjectId, ref: "Policy", required: true, index: true },
    notes: { type: String }
  },
  { timestamps: true }
);

RolePolicySchema.index({ roleId: 1, policyId: 1 }, { unique: true });

const RolePolicy = mongoose.models.RolePolicy || mongoose.model("RolePolicy", RolePolicySchema);
export default RolePolicy;
