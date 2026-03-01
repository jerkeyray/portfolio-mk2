import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    excerpt: {
      type: "string",
      required: true,
    },
    ogImage: {
      type: "string",
      required: false,
    },
    published: {
      type: "boolean",
      default: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath.replace("blog/", ""),
    },
    url: {
      type: "string",
      resolve: (post) =>
        `/blog/${post._raw.flattenedPath.replace("blog/", "")}`,
    },
  },
}));

export const WorkEntry = defineDocumentType(() => ({
  name: "WorkEntry",
  filePathPattern: `work/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    company: {
      type: "string",
      required: true,
    },
    isCompanyBlurred: {
      type: "boolean",
      required: false,
    },
    dateStart: {
      type: "date",
      required: true,
    },
    dateEnd: {
      type: "string",
      required: true,
    },
    location: {
      type: "string",
      required: false,
    },
    employmentType: {
      type: "string",
      required: false,
    },
    summary: {
      type: "string",
      required: true,
    },
    featuredProjectTitle: {
      type: "string",
      required: false,
    },
    featuredProjectSummary: {
      type: "string",
      required: false,
    },
    order: {
      type: "number",
      required: false,
    },
    published: {
      type: "boolean",
      default: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (entry) => entry._raw.flattenedPath.replace("work/", ""),
    },
    url: {
      type: "string",
      resolve: (entry) =>
        `/work/${entry._raw.flattenedPath.replace("work/", "")}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, WorkEntry],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      [
        rehypePrettyCode,
        {
          theme: "tokyo-night",
          keepBackground: false,
          defaultLang: "plaintext",
          // rehype-pretty-code uses untyped AST nodes.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onVisitLine(node: any) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onVisitHighlightedLine(node: any) {
            node.properties.className.push("line--highlighted");
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onVisitHighlightedWord(node: any) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});
