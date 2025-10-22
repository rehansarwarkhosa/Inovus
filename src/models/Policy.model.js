import mongoose from "mongoose";
const { Schema } = mongoose;

const PolicySchema = new Schema(
  {
    _id: { type: Number, required: true },
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    department: { type: String }
  },
  { _id: false, timestamps: true }
);

const Policy = mongoose.models.Policy || mongoose.model("Policy", PolicySchema);
export default Policy;
