const resolver = {
  Query:{
    hello(parent,args,context){
      console.log('called')
      return 'hello graphql server'
    }
  },
  // Subscription:{
  //   hello:{
  //     async subscribe(parent,context,{pubSub}){
  //       return pubSub.asyncIterator('HELLO_CALLED')
  //     }
  //   }
  // }
}


module.exports = resolver