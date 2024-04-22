import { defineField, defineType } from "sanity";

export default defineType({
  name: "social",
  title: "Social",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
