import mongoose, { Document, Schema, Model } from "mongoose";

export interface IRole extends Document {
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const RoleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Role: Model<IRole> = mongoose.models.Role || mongoose.model<IRole>("Role", RoleSchema);
export default Role;
