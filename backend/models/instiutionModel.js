const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InstitutionSchema = new Schema(
  {
    institution_id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String, // Base64-encoded image data
      default: null, // Optional, in case logo is not available
    },
    url: {
      type: String,
      default: null, // Optional, in case the URL is not available
    },
    primary_color: {
      type: String, // Hex color code
      default: null, // Optional, in case primary color is not available
    },
  },
);

module.exports = InstitutionSchema;
