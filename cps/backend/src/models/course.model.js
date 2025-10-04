import mongoose from "mongoose";
import { nanoid } from "nanoid";

const slugify = (value) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || nanoid(8);

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
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
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

courseSchema.pre("validate", async function (next) {
  if (!this.title) {
    return next();
  }

  if (!this.isModified("title") && this.slug) {
    return next();
  }

  const baseSlug = slugify(this.title);
  const CourseModel = this.constructor;
  let candidate = baseSlug;

  while (
    await CourseModel.exists({ slug: candidate, _id: { $ne: this._id } })
  ) {
    candidate = `${baseSlug}-${nanoid(6)}`;
  }

  this.slug = candidate;
  next();
});

courseSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (!update) {
    return next();
  }

  const nextTitle = update.title ?? update.$set?.title;

  if (!nextTitle) {
    return next();
  }

  const baseSlug = slugify(nextTitle);
  const CourseModel = this.model;
  const current = await CourseModel.findOne(this.getQuery()).select("_id");
  const excludeId = current?._id;
  let candidate = baseSlug;

  while (
    await CourseModel.exists({ slug: candidate, _id: { $ne: excludeId } })
  ) {
    candidate = `${baseSlug}-${nanoid(6)}`;
  }

  if (update.$set) {
    update.$set.slug = candidate;
  } else {
    update.slug = candidate;
  }

  this.setUpdate(update);
  next();
});

courseSchema.methods.isAccessibleByRole = function (role) {
  return this.audience.includes(role);
};

courseSchema.statics.findByRole = function (role) {
  return this.find({ audience: role });
};

export const Course = mongoose.model("Course", courseSchema);
