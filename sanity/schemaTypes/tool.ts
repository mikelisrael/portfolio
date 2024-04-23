import { defineField, defineType } from "sanity";

export default defineType({
  name: "tool",
  title: "Tool",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "toolImage",
      title: "Tool Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "priority",
      title: "Priority",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required(),
    }),
  ],
});
