const slugify = require("slugify");
const path = require("path");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // 1. Check if the node is an MDX file
  if (node.internal.type === "Mdx") {
    
    // 2. Get the parent file node to find the actual filename
    // (MDX nodes are children of File nodes)
    const fileNode = getNode(node.parent);
    
    // 3. Get the filename without extension (e.g. "My Note.md" -> "My Note")
    const fileName = fileNode.name;

    // 4. Create the slug using the EXACT same logic as your wiki-links
    // Special handling: if filename is "index", slug should be "/"
    let slug = "";
    if (fileName === "index") {
      slug = "/";
    } else {
      slug = "/" + slugify(fileName, { lower: true, strict: true });
    }

    // 5. Add this new 'slug' field to the MDX node
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};
