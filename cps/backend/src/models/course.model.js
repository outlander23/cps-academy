import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 100 },
  duration: { type: Number, required: true, min: 1, max: 480 },
  recordingUrl: { type: String, default: "" },
});

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 100 },
  topics: { type: [String], default: [] },
  classes: { type: [classSchema], default: [] },
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 3, maxlength: 100 },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },
    audience: {
      type: [String],
      enum: ["normal", "student", "social-manager", "developer"],
      default: ["normal"],
    },
    modules: { type: [moduleSchema], default: [] },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

courseSchema.methods.isAccessibleByRole = function (role) {
  return this.audience.includes(role);
};

courseSchema.statics.findByRole = function (role) {
  return this.find({ audience: role });
};

export const Course = mongoose.model("Course", courseSchema);
