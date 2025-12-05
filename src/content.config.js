import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

export const collections = {
  posts: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "src/contents/posts" }),
    schema:
      ({ image }) => z.object({
        draft: z
          .boolean()
          .default(false)
          .optional(),
        slug: z
          .string()
          .describe("Give a specific URL for the post, in the format of a slug (something-like-that-all-lowercase). This is not required, because the system will use the filename of the markdown file by default.")
          .optional(),
        date: z
          .date()
          .describe("Give a date in the format `YYYY-MM-DDTHH:MM:SS-00:00`"),
        title: z
          .string()
          .describe("Set a title for your post."),
        summary: z
          .string()
          .describe("Give to your post a description who will be used onto posts lists and when the post is shared on social media, as Bluesky and Threads."),
        authors: z
          .array(z
            .string()
          )
          .describe("Set the authors for the posts. You should match the string with the name indicated at `src/contents/authors.js`.")
          .optional(),
        categories: z
          .array(z
            .string()
          )
          .default(["Uncategorized"])
          .describe("Set the category for the post. See `src/categories.js` to get all pre-defined categories.")
          .optional(),
        tags: z
          .array(z
            .string()
          )
          .describe("Set the topics of the post. No pre-defined tags are set and you can set as many as necessary.")
          .optional(),
        thumbnail: z
          .object({
            src:
              image(),
            alt: z
              .string()
              .optional()
          })
          .describe("Set a image who will be used at posts listings, at the top of the single post and when the post is shared onto social media, as Bluesky and Threads.")
          .optional()
      })
  }),
  pages: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "src/contents/pages" }),
    schema:
      ({ image }) => z.object({
        draft: z
          .boolean()
          .default(false)
          .optional(),
        slug: z
          .string()
          .describe("Give a specific URL for the page, in the format of a slug (something-like-that-all-lowercase). This is not required, because the system will use the filename of the markdown file by default.")
          .optional(),
        date: z
          .date()
          .describe("Give a date in the format `YYYY-MM-DDTHH:MM:SS-00:00`. Pages are not required to have this data.")
          .optional(),
        title: z
          .string()
          .describe("Set a title for your page."),
        summary: z
          .string()
          .describe("Give to your page a description who will be used onto posts lists and when the post is shared on social media, as Bluesky and Threads."),
        authors: z
          .array(z
            .string()
          )
          .describe("Set the authors for the page. You should match the string with the name indicated at `src/contents/authors.js`.")
          .optional(),
        thumbnail: z
          .object({
            src:
              image(),
            alt: z
              .string()
              .optional()
          })
          .describe("Set a image who will be used at the top of the page and when the post is shared onto social media, as Bluesky and Threads.")
          .optional()
      })
  })
}