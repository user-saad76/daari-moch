const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Category title is required'],
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    unique: true
  },
  image: {
    type: String,
    default: ''
  },
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Middleware: Generate slug from title
categorySchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Category', categorySchema);
