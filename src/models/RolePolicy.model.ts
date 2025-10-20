import mongoose, { Document, Schema, Model } from "mongoose";

export interface IRolePolicy extends Document {
  roleId: mongoose.Types.ObjectId;
  policyId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const RolePolicySchema = new Schema<IRolePolicy>(
  {
    roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true, index: true },
    policyId: { type: Schema.Types.ObjectId, ref: "Policy", required: true, index: true },
  },
  { timestamps: true }
);

// Ensure uniqueness per (roleId, policyId)
RolePolicySchema.index({ roleId: 1, policyId: 1 }, { unique: true });

const RolePolicy: Model<IRolePolicy> =
  mongoose.models.RolePolicy || mongoose.model<IRolePolicy>("RolePolicy", RolePolicySchema);
export default RolePolicy;
