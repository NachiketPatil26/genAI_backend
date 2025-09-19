
const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true,
      trim: true,
    },
    storagePath: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    // You can add more fields here as needed, e.g.:
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    // },
    processingStatus: {
      type: String,
      enum: ['uploaded', 'processing', 'completed', 'failed'],
      default: 'uploaded',
    },
    extractedText: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Document', DocumentSchema);
