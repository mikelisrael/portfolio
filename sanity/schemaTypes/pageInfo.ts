import { defineField, defineType } from "sanity";

export default defineType({
  name: "pageInfo",
  title: "Page Info",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "introductionHeading",
      title: "Introduction Heading",
      type: "string",
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "subjectImage",
      title: "Subject image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "socials",
      title: "Socials",
      type: "array",
      of: [{ type: "reference", to: { type: "social" } }],
    }),
    defineField({
      name: "yearsOfExperience",
      title: "Years of Experience",
      type: "number",
    }),
    defineField({
      name: "satisfiedClients",
      title: "Satisfied Clients",
      type: "number",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Info",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "freeTalkHeading",
      title: "Free Talk Heading",
      type: "string",
    }),
    defineField({
      name: "freeTalk",
      title: "Free Talk",
      type: "text",
      rows: 3,
    }),
   
    defineField({
      name: "projectInvitationHeading",
      title: "Project Invitation Heading",
      type: "string",
    }),
    defineField({
      name: "projectInvitation",
      title: "Project Invitation",
      type: "string",
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [{ type: "reference", to: { type: "project" } }],
    }),
  ],
});
