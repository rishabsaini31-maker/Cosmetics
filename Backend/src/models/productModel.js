const fs = require('fs');
const path = require('path');
const { products: seedProducts } = require('../data/products');

const DATA_FILE = path.join(__dirname, '../data/products.json');

function ensureStorage() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    // Seed with existing catalog products
    const initialProducts = seedProducts.map((p, idx) => ({
      ...p,
      sku: p.sku || `VNY-SKU-${(1000 + idx).toString()}`,
      stock: p.stock ?? (15 + idx * 4),
      lowStockThreshold: p.lowStockThreshold ?? 5,
      status: p.status || 'Active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialProducts, null, 2), 'utf8');
  }
}

function getAllProducts() {
  ensureStorage();
  try {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(content || '[]');
  } catch (error) {
    console.error('Error reading products storage:', error);
    return [];
  }
}

function saveProducts(products) {
  ensureStorage();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing products storage:', error);
  }
}

function findProductById(id) {
  const products = getAllProducts();
  return products.find((p) => p.id === id);
}

function createProduct(productData) {
  const products = getAllProducts();
  const newProduct = {
    id: `prod-${Date.now()}`,
    name: productData.name,
    tagline: productData.tagline || '',
    category: productData.category || 'Parfum Extrait',
    subCategory: productData.subCategory || '',
    price: Number(productData.price) || 0,
    formattedPrice: `₹${(Number(productData.price) || 0).toLocaleString('en-IN')}`,
    badge: productData.badge || '',
    image: productData.image || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
    gallery: productData.gallery || [],
    notes: productData.notes || { top: [], heart: [], base: [] },
    sillage: productData.sillage || 'Moderate',
    longevity: productData.longevity || '8-10 Hours',
    volume: productData.volume || ['50 ml'],
    description: productData.description || '',
    craftDetails: productData.craftDetails || '',
    ingredients: productData.ingredients || [],
    sku: productData.sku || `VNY-SKU-${Math.floor(1000 + Math.random() * 9000)}`,
    stock: Number(productData.stock) || 10,
    lowStockThreshold: Number(productData.lowStockThreshold) || 5,
    status: productData.status || 'Active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  products.unshift(newProduct);
  saveProducts(products);
  return newProduct;
}

function updateProduct(id, updateData) {
  const products = getAllProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const price = updateData.price !== undefined ? Number(updateData.price) : products[index].price;
  const formattedPrice = `₹${price.toLocaleString('en-IN')}`;

  products[index] = {
    ...products[index],
    ...updateData,
    price,
    formattedPrice,
    updatedAt: new Date().toISOString(),
  };

  saveProducts(products);
  return products[index];
}

function deleteProduct(id) {
  let products = getAllProducts();
  products = products.filter((p) => p.id !== id);
  saveProducts(products);
  return true;
}

module.exports = {
  getAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
