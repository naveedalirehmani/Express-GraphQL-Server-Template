async function sayHello(request, response) {
  response.status(200).json("hello from the express graphql server");
  return
}

module.exports = {
  sayHello,
};
