const { products } = require('../data/products');

const getProducts = (req, res) => {
  const { category, search } = req.query;
  let filtered = [...products];

  if (category) {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.tagline.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json({
    success: true,
    count: filtered.length,
    data: filtered,
  });
};

const getProductById = (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
};

module.exports = { getProducts, getProductById };
