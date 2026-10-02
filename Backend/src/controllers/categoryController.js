const { categories } = require('../data/products');

const getCategories = (req, res) => {
  res.json({
    success: true,
    count: categories.length,
    data: categories,
  });
};

module.exports = { getCategories };
