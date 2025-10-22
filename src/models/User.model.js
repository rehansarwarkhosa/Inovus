import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    password: { type: String, required: true },
    role: { type: Number, ref: "Role", index: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
