import mongoose from "mongoose";
const { Schema } = mongoose;

const EmailSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    email: { type: String, required: true, lowercase: true, trim: true },
    isPrimary: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    description: { type: String },
  },
  { timestamps: true }
);

EmailSchema.index({ email: 1 }, { unique: true });
EmailSchema.index({ userId: 1, email: 1 }, { unique: true });

const Email = mongoose.models.Email || mongoose.model("Email", EmailSchema);
export default Email;
