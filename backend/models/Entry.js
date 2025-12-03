import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    message: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Update updatedAt on save
entrySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Entry = mongoose.model('Entry', entrySchema);

export default Entry;

