import { Request, Response } from 'express';
import { AuthenticationError, gql } from 'apollo-server-express';

async function context(request: Request, response: Response) {
  const result: any = gql(request.body.query);

  if (result) {
    let queryName = result.definitions[0].selectionSet.selections[0].name.value;
    console.log("QueryName", queryName);
  } else {
    throw new AuthenticationError("Unauthorized");
  }

  return {
    request,
    response,
    // pubSub: PubSub
  };
}

export default context;
