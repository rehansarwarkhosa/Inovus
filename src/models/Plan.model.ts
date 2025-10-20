import mongoose, { Document, Schema, Model } from "mongoose";

export interface IPlan extends Document {
  name: string;
  price: number;
  currency?: string;
  durationInDays?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const PlanSchema = new Schema<IPlan>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, default: 0 },
    currency: { type: String, default: "USD" },
    durationInDays: { type: Number, default: 30 },
  },
  { timestamps: true }
);

const Plan: Model<IPlan> = mongoose.models.Plan || mongoose.model<IPlan>("Plan", PlanSchema);
export default Plan;
