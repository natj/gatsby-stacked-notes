import slugify from "slugify";
import path from "path";
import make_slug from "./utils/slugify.mjs";

// API: createResolvers
// Allows extending the GraphQL schema with custom fields.
// Here we generate 'backlinks' by scanning all notes for links to the current note.
export const createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Mdx: {
      backlinks: {
        type: ["Mdx"],
        resolve: async (source, args, context, info) => {
          const notes = await context.nodeModel.findAll({ type: "Mdx" });
          
          // Get current note's slug base (e.g. "my-note").
          const slug_base = source.fields.slug.replace(/^\/|\/$/g, '').split('/').pop();

          return notes.entries.filter((note) => {
            if (note.id === source.id) return false;

            // Skip partials.
            const file_path = note.internal.contentFilePath || "";
            if (file_path.includes("src/components/partials")) {
              return false;
            }

            // Scan for [[Wiki Links]].
            const wiki_matches = [...note.body.matchAll(/\[\[(.*?)\]\]/g)];

            for (const match of wiki_matches) {
              let link_text = match[1]; // "My Note" or "My Note|Label"

              if (link_text.includes('|')) {
                link_text = link_text.split('|')[0];
              }

              const candidate_slug = make_slug(link_text);

              if (candidate_slug === slug_base) {
                return true;
              }
            }
            
            // Standard markdown link check.
            if (note.body.includes(`](${source.fields.slug})`)) {
               return true;
            }

            return false;
          });
        },
      },
    },
  };
  createResolvers(resolvers);
};

// API: onCreateNode
// Called when a new node is created. We attach a 'slug' field to MDX nodes
// derived from their filename, ensuring consistent URLs.
export const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    const file_node = getNode(node.parent);
    const file_name = file_node.name;

    let slug = "";
    if (file_name === "index") {
      slug = "/";
    } else {
      slug = "/" + slugify(file_name, { lower: true, strict: true });
    }

    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

// API: createSchemaCustomization
// Explicitly defines types for GraphQL to ensure consistent queries,
// even if some data fields (like frontmatter) are missing in files.
export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const type_defs = `
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }
    type MdxFrontmatter {
      hideHeader: Boolean
      hideFooter: Boolean
      title: String
    }
  `;
  createTypes(type_defs);
};
