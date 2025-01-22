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

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const creditSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  amount: { type: Number, required: true },
  product: { type: String, required: true },
  personWhotaken: { type: String, required: true },
  isPaid: { type: Boolean, default: false },
  tookTime: { type: Date, default: Date.now },
  paidAt: { type: Date }, // Optional, will be set when the credit is paid
});

const revenueSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export const Revenue =
  mongoose.models.Revenue || mongoose.model("Revenue", revenueSchema);

export const Credit =
  mongoose.models.Credit || mongoose.model("Credit", creditSchema);

export const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);
