import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false }, // ✅ New field
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
