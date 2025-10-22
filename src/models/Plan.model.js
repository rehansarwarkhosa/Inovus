import mongoose from "mongoose";
const { Schema } = mongoose;

const PlanSchema = new Schema(
  {
    _id: { type: Number, required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true, default: 0 },
    currency: { type: String, default: "USD" },
    durationInDays: { type: Number, default: 30 },
  },
  { _id: false, timestamps: true }
);

const Plan = mongoose.models.Plan || mongoose.model("Plan", PlanSchema);
export default Plan;
