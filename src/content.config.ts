import { file, glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/posts" }),
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
        .array(reference("authors"), {
          required_error: "An author is required in every post.",
          invalid_type_error: "Authors should be declare by IDs in an array, even when it's just one.",
        })
        .describe("Set the authors for the posts. You should match the ID string indicated at `src/data/authors.json`."),
      categories: z
        .array(reference("categories"), {
          required_error: "Every post needs a category.",
          invalid_type_error: "Categories should be declared by IDS in an array, even when it's just one.",
        })
        .describe("Set the category for the post. See `src/data/categories.json` to get all IDs of the pre-defined categories."),
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
});

const authors = defineCollection({
  loader: file("src/data/authors.json"),
  schema:
    ({ image }) => z.object({
      avatar:
        image()
          .optional(),
      name: z
        .string(),
      description: z
        .string()
        .max(160, {
          "message": "The description of an author should have less and 160 characters."
        }),
      url: z
        .string()
        .url()
        .optional(),
      social: z
        .object({
          bluesky: z
            .string()
            .url()
            .optional(),
          twitter: z
            .string()
            .url()
            .optional(),
          instagram: z
            .string()
            .url()
            .optional(),
          github: z
            .string()
            .url()
            .optional(),
        })
    })
});

const categories = defineCollection({
  loader: file("src/data/categories.json"),
  schema:
    ({ image }) => z.object({
      title: z
        .string(),
      description: z
        .string()
        .max(160, { "message": "The category description should not have more than 160 characters." })
        .describe("The category description will be displayed on the homepage of category and on metadata for social sharing."),
      image: z
        .object({
          src:
            image(),
          alt: z
            .string()
            .optional()
        })
        .optional(),
    })
})

export const collections = { posts, authors, categories }

