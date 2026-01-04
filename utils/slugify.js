// This is a simple utility module. A "module" is just a file that contains reusable code.
// We are using the 'slugify' library, which is a popular tool for creating "slugs".
// A "slug" is a URL-friendly version of a string, typically used in blog post URLs.
// For example, "Hello World!" becomes "hello-world".
const slugify = require("slugify");

// We are exporting a function that takes a text string as input.
// This makes our custom slugify configuration reusable across the project.
module.exports = (text) => {
  // We call the original slugify function with our specific configuration.
  return slugify(text, { 
    lower: true,  // This makes the entire slug lowercase.
    strict: true  // This removes characters that are not URL-friendly.
  });
};
