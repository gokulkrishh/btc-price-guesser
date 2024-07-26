import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Data: a
    .model({
      guess: a.string(),
      initialPrice: a.float(),
      resolvedPrice: a.float(),
      resolved: a.boolean().default(false),
      correct: a.boolean().default(false),
      score: a.integer().default(0),
    })
    .authorization((allow) => [allow.guest()]),
  // restrict data access to logged in respective user only
  // .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});
