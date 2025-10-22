import mongoose from "mongoose";
const { Schema } = mongoose;

const PolicySchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    department: { type: String }
  },
  { timestamps: true }
);

const Policy = mongoose.models.Policy || mongoose.model("Policy", PolicySchema);
export default Policy;
