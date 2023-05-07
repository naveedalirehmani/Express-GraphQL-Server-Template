const resolver = {
  Query: {
    hello: (parent, args, context) => "World",
    products: (parent, { filter }, { db }) => {
      let filteredProducts = db.products;
      if (filter) {
        const { onSale, avgRating } = filter;
        if (onSale) {
          filteredProducts = filteredProducts.filter((product) => {
            return product.onSale;
          });
        }
        if ([1, 2, 3, 4, 5].includes(avgRating)) {
          filteredProducts = filteredProducts.filter((product) => {
            let sumRating = 0;
            let numberOfReviews = 0;
            db.reviews.forEach((review) => {
              if (review.productId === product.id) {
                sumRating += review.rating;
                numberOfReviews++;
              }
            });
            const avgProductRating = sumRating / numberOfReviews;

            return avgProductRating >= avgRating;
          });
        }
      }
      console.log("products");
      return filteredProducts;
    },
    product: (parent, { id }, { db }) => {
      return db.products.find((product) => product.id === id);
    },
    categories: (parent, args, { db }) => db.categories,
    category: (parent, { id }, { db }) => {
      return db.categories.find((category) => category.id === id);
    },
  },

  Mutation: {
    addCategory: (parent, { input }, { db }) => {
      const { name } = input;

      const newCategory = {
        id: uuid(),
        name,
      };

      db.categories.push(newCategory);

      return newCategory;
    },
    addProduct: (parent, { input }, { db }) => {
      const { name, image, price, onSale, quantity, categoryId } = input;

      const newProduct = {
        id: uuid(),
        name,
        image,
        price,
        onSale,
        quantity,
        categoryId,
      };

      db.products.push(newProduct);

      return newProduct;
    },
    addReview: (parent, { input }, { db }) => {
      const { date, title, comment, rating, productId } = input;

      const newReview = {
        id: uuid(),
        date,
        title,
        comment,
        rating,
        productId,
      };

      db.reviews.push(newReview);

      return newReview;
    },
    deleteCategory: (parent, { id }, { db }) => {
      db.categories = db.categories.filter((category) => category.id !== id);
      db.products = db.products.map((product) => {
        if (product.categoryId === id)
          return {
            ...product,
            categoryId: null,
          };
        else return product;
      });
      return true;
    },
    deleteProduct: (parent, { id }, { db }) => {
      db.products = db.products.filter((product) => product.id !== id);
      db.reviews = db.reviews.filter((review) => review.productId !== id);
      return true;
    },
    deleteReview: (parent, { id }, { db }) => {
      db.reviews = db.reviews.filter((review) => review.id !== id);
      return true;
    },
    updateCategory: (parent, { id, input }, { db }) => {
      const index = db.categories.findIndex((category) => category.id === id);
      if (index === -1) return null;
      db.categories[index] = {
        ...db.categories[index],
        ...input,
      };
      return db.categories[index];
    },
    updateProduct: (parent, { id, input }, { db }) => {
      const index = db.products.findIndex((product) => product.id === id);
      if (index === -1) return null;
      db.products[index] = {
        ...db.products[index],
        ...input,
      };
      return db.products[index];
    },
    updateReview: (parent, { id, input }, { db }) => {
      const index = db.reviews.findIndex((review) => review.id === id);
      db.reviews[index] = {
        ...db.reviews[index],
        ...input,
      };
      return db.reviews[index];
    },
  },
};

module.exports = resolver;
