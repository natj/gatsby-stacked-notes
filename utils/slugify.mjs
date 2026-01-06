// Utility to create URL-friendly slugs.
import slugify from "slugify";

export default (text) => {
  return slugify(text, { 
    lower: true,  // Lowercase slug.
    strict: true  // Remove non-URL-friendly characters.
  });
};
