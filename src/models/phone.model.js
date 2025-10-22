import mongoose from "mongoose";
const { Schema } = mongoose;

const PhoneSchema = new Schema(
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

PhoneSchema.index({ phone: 1 }, { unique: false });
PhoneSchema.index({ userId: 1, phone: 1 }, { unique: true });

const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);
export default Phone;
