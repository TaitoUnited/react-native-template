import { getIntrospectionQuery } from 'graphql';
import fetch from 'node-fetch';
import * as fs from 'fs';

import {
  getIntrospectedSchema,
  minifyIntrospectionQuery,
} from '@urql/introspection';

export function fetchIntrospection() {
  fetch(process.env.API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: getIntrospectionQuery({ descriptions: false }),
    }),
  })
    .then((result) => result.json())
    .then(({ data }) => {
      const minified = minifyIntrospectionQuery(getIntrospectedSchema(data));
      fs.writeFileSync('./src/graphql/schema.json', JSON.stringify(minified));
    });
}
