import { type SchemaTypeDefinition } from "sanity";

import blockContent from "./schemaTypes/blockContent";
import category from "./schemaTypes/category";
import post from "./schemaTypes/post";
import author from "./schemaTypes/author";
import project from "./schemaTypes/project";
import pageInfo from "./schemaTypes/pageInfo";
import social from "./schemaTypes/social";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pageInfo, social, post, author, category, blockContent, project],
};
