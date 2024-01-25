import { Request, Response } from 'express';
import { AuthenticationError, gql } from 'apollo-server-express';

async function context(request: Request, response: Response) {
  const result: any = gql(request.body.query);



  return {
    request,
    response,
    // pubSub: PubSub
  };
}

export default context;
