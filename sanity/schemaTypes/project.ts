import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "isPrivate",
      title: "Is it private?",
      type: "boolean",
    }),
    defineField({
      name: "link",
      title: "Live link",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "github",
      title: "Github link",
      type: "url",
    }),
    defineField({
      name: "image",
      title: "Project image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "tools",
      title: "Tools",
      type: "array",
      of: [{ type: "reference", to: { type: "tool" } }],
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
