import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
    userType: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    isLister: {
      type: String,
      enum: ["true", "false", "pending"],
      default: "false",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
      // required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      // required: this.authType === "EMAIL",
    },
    profileImage: {
      type: String,
    },
    aadhaarCardNumber: {
      type: String,
      unique: true,
    },
    aadhaarCardImage: {
      type: String,
    },
    panCardNumber: {
      type: String,
      unique: true,
    },
    panCardImage: {
      type: String,
    },
    likedItems: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Item",
      default: [],
    },
    kycStatus: {
      type: String,
      default: "NOT SUBMITTED",
      enum: ["VERIFIED", "NOT SUBMITTED", "PENDING"],
    },
    authType: {
      type: String,
      enum: ["EMAIL", "GOOGLE"],
      default: "EMAIL",
    },
    acc_no: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
//   };

//   // Password hashing middleware
//   userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   });

//   const User = mongoose.model('User', userSchema);
//   export default User;
