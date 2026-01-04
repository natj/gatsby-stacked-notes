// Utility to create URL-friendly slugs.
const slugify = require("slugify");

module.exports = (text) => {
  return slugify(text, { 
    lower: true,  // Lowercase slug.
    strict: true  // Remove non-URL-friendly characters.
  });
};
