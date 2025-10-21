import mongoose, { Document, Schema, Model } from "mongoose";

export interface IPhone extends Document {
  userId: mongoose.Types.ObjectId;
  phone: string;
  countryCode?: string;
  isPrimary?: boolean;
  isVerified?: boolean;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const PhoneSchema = new Schema<IPhone>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    phone: { type: String, required: true, trim: true },
    countryCode: { type: String },
    isPrimary: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    description: { type: String },
  },
  { timestamps: true }
);

/* Phone indexes */
PhoneSchema.index({ phone: 1 }, { unique: false });
PhoneSchema.index({ userId: 1, phone: 1 }, { unique: true });

const Phone: Model<IPhone> =
  mongoose.models.Phone || mongoose.model<IPhone>("Phone", PhoneSchema);
export default Phone;
