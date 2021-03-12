import mongoose from "mongoose";
import bcrypyt from "bcryptjs";

const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

employeeSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypyt.compare(enteredPassword, this.password);
};

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypyt.genSalt(10);
  this.password = await bcrypyt.hash(this.password, salt);
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
