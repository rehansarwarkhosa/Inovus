import mongoose, { Document, Schema, Model } from "mongoose";

export interface IEmail extends Document {
  userId: mongoose.Types.ObjectId;
  email: string;
  isPrimary?: boolean;
  isVerified?: boolean;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const EmailSchema = new Schema<IEmail>(
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

/* Unique email constraint */
EmailSchema.index({ email: 1 }, { unique: true });

/* User + email combo (for safety) */
EmailSchema.index({ userId: 1, email: 1 }, { unique: true });

const Email: Model<IEmail> =
  mongoose.models.Email || mongoose.model<IEmail>("Email", EmailSchema);
export default Email;
