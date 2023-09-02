const resolver = {
  Query:{
    hello(parent,args,context){
      console.log('called')
      return 'hello graphql'
    }
  }
}


module.exports = resolver