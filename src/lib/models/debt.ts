import mongoose from "mongoose";

export const connectiondb = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

const DebtSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: false },
    paid: { type: Boolean, required: true },
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true,
  }
);

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  debt: [DebtSchema],
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export const Debt = mongoose.models.Dept || mongoose.model("Dept", DebtSchema);
