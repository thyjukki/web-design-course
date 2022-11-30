
import { shield } from "graphql-shield";

import { isAuthorized } from './rules/index.js'

export const permissions = shield({
  Query: {},
  Mutation: {
    getUsers: isAuthorized
  },
});