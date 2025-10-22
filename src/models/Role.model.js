import mongoose from "mongoose";
const { Schema } = mongoose;

const RoleSchema = new Schema(
  {
    _id: { type: Number, required: true },
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    department: { type: String }
  },
  { _id: false, timestamps: true }
);

const Role = mongoose.models.Role || mongoose.model("Role", RoleSchema);
export default Role;
