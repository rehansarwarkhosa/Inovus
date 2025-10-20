import mongoose, { Document, Schema, Model } from "mongoose";

export interface IPolicy extends Document {
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const PolicySchema = new Schema<IPolicy>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Policy: Model<IPolicy> = mongoose.models.Policy || mongoose.model<IPolicy>("Policy", PolicySchema);
export default Policy;
