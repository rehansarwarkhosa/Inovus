import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

/**
 * Embedded Email and Phone subdocuments (kept small, embedded for quick access)
 * Top-level User model holds references to Role and optionally to plans through UserPlan collection.
 */

/* ---------- Interfaces ---------- */

export interface IEmail {
  email: string;
  isPrimary?: boolean;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPhone {
  phone: string;
  isPrimary?: boolean;
  countryCode?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser extends Document {
  name: string;
  firstName?: string;
  lastName?: string;
  emails: IEmail[];
  phones: IPhone[];
  password: string; // hashed
  role?: mongoose.Types.ObjectId;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  comparePassword(candidate: string): Promise<boolean>;
}

/* ---------- Schemas ---------- */

const EmailSchema = new Schema<IEmail>(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    isPrimary: { type: Boolean, default: false },
    description: { type: String },
  },
  { _id: false, timestamps: true }
);

const PhoneSchema = new Schema<IPhone>(
  {
    phone: { type: String, required: true, trim: true },
    isPrimary: { type: Boolean, default: false },
    countryCode: { type: String },
    description: { type: String },
  },
  { _id: false, timestamps: true }
);

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },

    // Embedded arrays
    emails: { type: [EmailSchema], default: [] },
    phones: { type: [PhoneSchema], default: [] },

    // authentication
    password: { type: String, required: true },

    // link to role
    role: { type: Schema.Types.ObjectId, ref: "Role", index: true },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

/* ---------- Indexes ---------- */

// Index to quickly find by primary email within array - this is a partial-use pattern
UserSchema.index({ "emails.email": 1 }, { sparse: true });

/* ---------- Hooks ---------- */

// Pre-save: hash password if modified
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const saltRounds = 10; // adjust in config
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
    return next();
  } catch (err) {
    return next(err as any);
  }
});

/* ---------- Instance methods ---------- */

UserSchema.methods.comparePassword = function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

/* ---------- Model ---------- */

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
