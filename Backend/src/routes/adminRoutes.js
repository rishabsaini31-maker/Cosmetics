const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../middleware/adminMiddleware');
const {
  getDashboard,
  getOrders,
  getOrderById,
  updateOrder,
  getProductsAdmin,
  createProductAdmin,
  updateProductAdmin,
  deleteProductAdmin,
  getInventory,
  updateInventory,
  getCustomers,
  getContentAdmin,
  updateContentAdmin,
  getThemeAdmin,
  saveDraftThemeAdmin,
  publishThemeAdmin,
  getMarketingAdmin,
  updateMarketingAdmin,
  getUsersAdmin,
  updateUserRoleAdmin,
  getActivityAdmin,
  getSettingsAdmin,
  updateSettingsAdmin,
} = require('../controllers/adminController');

// All admin routes are protected by requireAdmin middleware
router.use(requireAdmin);

// Dashboard
router.get('/dashboard', getDashboard);

// Orders
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);
router.patch('/orders/:id/status', updateOrder);

// Products
router.get('/products', getProductsAdmin);
router.post('/products', createProductAdmin);
router.put('/products/:id', updateProductAdmin);
router.delete('/products/:id', deleteProductAdmin);

// Inventory
router.get('/inventory', getInventory);
router.patch('/inventory/:id', updateInventory);

// Customers
router.get('/customers', getCustomers);

// Content Management
router.get('/content', getContentAdmin);
router.put('/content', updateContentAdmin);

// Theme Editor
router.get('/theme', getThemeAdmin);
router.put('/theme/draft', saveDraftThemeAdmin);
router.post('/theme/publish', publishThemeAdmin);

// Marketing
router.get('/marketing', getMarketingAdmin);
router.put('/marketing', updateMarketingAdmin);

// Admin Users & Roles
router.get('/users', getUsersAdmin);
router.patch('/users/:id/role', updateUserRoleAdmin);

// Activity Log
router.get('/activity', getActivityAdmin);

// Settings
router.get('/settings', getSettingsAdmin);
router.put('/settings', updateSettingsAdmin);

module.exports = router;
