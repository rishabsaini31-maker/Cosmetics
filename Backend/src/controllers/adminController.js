const { getAllOrders, findOrderById, updateOrderStatus } = require('../models/orderModel');
const {
  getAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../models/productModel');
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  sanitizeUser,
} = require('../models/userModel');
const { getContent, updateContent } = require('../models/contentModel');
const { getTheme, saveDraftTheme, publishTheme } = require('../models/themeModel');
const { getMarketingData, saveMarketingData } = require('../models/marketingModel');
const { getActivityLogs, logActivity } = require('../models/activityModel');
const { getSettings, updateSettings } = require('../models/settingsModel');

// Helper: Parse date range string into startDate, endDate, prevStartDate, prevEndDate
function parseDateRange(range = 'Last 30 Days', customStart, customEnd) {
  const now = new Date('2026-10-08T23:59:59.999Z'); // Reference current date
  let startDate = new Date(now);
  let endDate = new Date(now);

  let prevStartDate = new Date(now);
  let prevEndDate = new Date(now);

  switch (range) {
    case 'Today': {
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      prevStartDate.setDate(prevStartDate.getDate() - 1);
      prevStartDate.setHours(0, 0, 0, 0);
      prevEndDate.setDate(prevEndDate.getDate() - 1);
      prevEndDate.setHours(23, 59, 59, 999);
      break;
    }
    case 'Yesterday': {
      startDate.setDate(startDate.getDate() - 1);
      startDate.setHours(0, 0, 0, 0);
      endDate.setDate(endDate.getDate() - 1);
      endDate.setHours(23, 59, 59, 999);

      prevStartDate.setDate(prevStartDate.getDate() - 2);
      prevStartDate.setHours(0, 0, 0, 0);
      prevEndDate.setDate(prevEndDate.getDate() - 2);
      prevEndDate.setHours(23, 59, 59, 999);
      break;
    }
    case 'Last 7 Days': {
      startDate.setDate(startDate.getDate() - 6);
      startDate.setHours(0, 0, 0, 0);

      const duration = endDate.getTime() - startDate.getTime();
      prevEndDate = new Date(startDate.getTime() - 1);
      prevStartDate = new Date(prevEndDate.getTime() - duration);
      break;
    }
    case 'Last 30 Days':
    default: {
      startDate.setDate(startDate.getDate() - 29);
      startDate.setHours(0, 0, 0, 0);

      const duration = endDate.getTime() - startDate.getTime();
      prevEndDate = new Date(startDate.getTime() - 1);
      prevStartDate = new Date(prevEndDate.getTime() - duration);
      break;
    }
    case 'Last 90 Days': {
      startDate.setDate(startDate.getDate() - 89);
      startDate.setHours(0, 0, 0, 0);

      const duration = endDate.getTime() - startDate.getTime();
      prevEndDate = new Date(startDate.getTime() - 1);
      prevStartDate = new Date(prevEndDate.getTime() - duration);
      break;
    }
    case 'This Month': {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
      prevStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
      prevEndDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
      break;
    }
    case 'Previous Month': {
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
      endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

      prevStartDate = new Date(now.getFullYear(), now.getMonth() - 2, 1, 0, 0, 0, 0);
      prevEndDate = new Date(now.getFullYear(), now.getMonth() - 1, 0, 23, 59, 59, 999);
      break;
    }
    case 'This Year': {
      startDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
      prevStartDate = new Date(now.getFullYear() - 1, 0, 1, 0, 0, 0, 0);
      prevEndDate = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
      break;
    }
    case 'Custom Range': {
      if (customStart) startDate = new Date(customStart);
      if (customEnd) endDate = new Date(customEnd);
      const duration = endDate.getTime() - startDate.getTime();
      prevEndDate = new Date(startDate.getTime() - 1);
      prevStartDate = new Date(prevEndDate.getTime() - duration);
      break;
    }
  }

  return { startDate, endDate, prevStartDate, prevEndDate };
}

// GET /api/admin/dashboard
function getDashboard(req, res) {
  try {
    const { dateRange, category, startDate: customStart, endDate: customEnd } = req.query;
    const { startDate, endDate, prevStartDate, prevEndDate } = parseDateRange(dateRange, customStart, customEnd);

    const allOrders = getAllOrders();
    const products = getAllProducts();
    const users = getAllUsers();
    const activityLogs = getActivityLogs();

    // Filter orders in current period vs previous period
    const currOrders = allOrders.filter((o) => {
      const d = new Date(o.date);
      return d >= startDate && d <= endDate;
    });

    const prevOrders = allOrders.filter((o) => {
      const d = new Date(o.date);
      return d >= prevStartDate && d <= prevEndDate;
    });

    // Helper: Valid revenue orders (exclude Cancelled)
    const isValidOrder = (o) => o.status !== 'Cancelled' && o.paymentStatus !== 'Failed';

    const currValidOrders = currOrders.filter(isValidOrder);
    const prevValidOrders = prevOrders.filter(isValidOrder);

    // 1. REVENUE
    const currRevenue = currValidOrders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
    const prevRevenue = prevValidOrders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
    const revDiff = currRevenue - prevRevenue;
    const revPct = prevRevenue > 0 ? ((revDiff / prevRevenue) * 100).toFixed(1) : currRevenue > 0 ? '+100.0' : '0.0';

    // 2. ORDERS COUNT
    const currOrderCount = currValidOrders.length;
    const prevOrderCount = prevValidOrders.length;
    const orderDiff = currOrderCount - prevOrderCount;
    const orderPct = prevOrderCount > 0 ? ((orderDiff / prevOrderCount) * 100).toFixed(1) : currOrderCount > 0 ? '+100.0' : '0.0';

    // 3. AOV
    const currAov = currOrderCount > 0 ? Math.round(currRevenue / currOrderCount) : 0;
    const prevAov = prevOrderCount > 0 ? Math.round(prevRevenue / prevOrderCount) : 0;
    const aovDiff = currAov - prevAov;
    const aovPct = prevAov > 0 ? ((aovDiff / prevAov) * 100).toFixed(1) : currAov > 0 ? '+100.0' : '0.0';

    // 4. CUSTOMERS
    const currNewCustomers = users.filter((u) => {
      const d = new Date(u.createdAt);
      return d >= startDate && d <= endDate;
    }).length;

    const prevNewCustomers = users.filter((u) => {
      const d = new Date(u.createdAt);
      return d >= prevStartDate && d <= prevEndDate;
    }).length;

    const custDiff = currNewCustomers - prevNewCustomers;
    const custPct = prevNewCustomers > 0 ? ((custDiff / prevNewCustomers) * 100).toFixed(1) : currNewCustomers > 0 ? '+100.0' : '0.0';

    // 5. REFUNDS
    const currRefunds = currOrders
      .filter((o) => o.status === 'Refunded' || o.status === 'Returned')
      .reduce((sum, o) => sum + (Number(o.amount) || 0), 0);

    const prevRefunds = prevOrders
      .filter((o) => o.status === 'Refunded' || o.status === 'Returned')
      .reduce((sum, o) => sum + (Number(o.amount) || 0), 0);

    const refDiff = currRefunds - prevRefunds;
    const refPct = prevRefunds > 0 ? ((refDiff / prevRefunds) * 100).toFixed(1) : currRefunds > 0 ? '+100.0' : '0.0';

    // Order status counts (All time & period)
    const orderStatuses = {
      total: allOrders.length,
      pending: allOrders.filter((o) => o.status === 'Pending').length,
      confirmed: allOrders.filter((o) => o.status === 'Confirmed').length,
      processing: allOrders.filter((o) => o.status === 'Processing').length,
      shipped: allOrders.filter((o) => o.status === 'Shipped').length,
      delivered: allOrders.filter((o) => o.status === 'Delivered').length,
      cancelled: allOrders.filter((o) => o.status === 'Cancelled').length,
      returned: allOrders.filter((o) => o.status === 'Returned').length,
      refunded: allOrders.filter((o) => o.status === 'Refunded').length,
    };

    // Needs Attention Alerts
    const outOfStockCount = products.filter((p) => Number(p.stock) === 0).length;
    const lowStockCount = products.filter((p) => Number(p.stock) > 0 && Number(p.stock) <= (p.lowStockThreshold || 5)).length;
    const pendingProcessingCount = allOrders.filter((o) => o.status === 'Processing' || o.status === 'Pending').length;
    const pendingReturnsCount = allOrders.filter((o) => o.status === 'Returned' || o.status === 'Refunded').length;
    const failedPaymentsCount = allOrders.filter((o) => o.paymentStatus === 'Failed').length;

    const needsAttention = [
      ...(outOfStockCount > 0
        ? [{ id: 'out-of-stock', type: 'error', message: `${outOfStockCount} product${outOfStockCount > 1 ? 's are' : ' is'} out of stock`, link: '/inventory', actionText: 'View Inventory' }]
        : []),
      ...(lowStockCount > 0
        ? [{ id: 'low-stock', type: 'warning', message: `${lowStockCount} product${lowStockCount > 1 ? 's are' : ' is'} low in stock`, link: '/inventory', actionText: 'Manage Stock' }]
        : []),
      ...(pendingProcessingCount > 0
        ? [{ id: 'processing-orders', type: 'info', message: `${pendingProcessingCount} order${pendingProcessingCount > 1 ? 's need' : ' needs'} processing`, link: '/orders?status=processing', actionText: 'View Orders' }]
        : []),
      ...(pendingReturnsCount > 0
        ? [{ id: 'pending-returns', type: 'warning', message: `${pendingReturnsCount} return/refund request${pendingReturnsCount > 1 ? 's need' : ' needs'} review`, link: '/orders?status=returned', actionText: 'View Returns' }]
        : []),
      ...(failedPaymentsCount > 0
        ? [{ id: 'failed-payments', type: 'error', message: `${failedPaymentsCount} payment failed`, link: '/orders?paymentStatus=failed', actionText: 'View Payments' }]
        : []),
    ];

    // Revenue Overview Chart Data (Generating daily data points)
    const chartDays = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
    const stepDays = chartDays > 31 ? Math.ceil(chartDays / 12) : 1;

    const chartPoints = [];
    const currTime = new Date(startDate.getTime());

    while (currTime <= endDate) {
      const bucketEnd = new Date(currTime.getTime() + stepDays * 24 * 60 * 60 * 1000 - 1);
      const bucketOrders = currValidOrders.filter((o) => {
        const d = new Date(o.date);
        return d >= currTime && d <= bucketEnd;
      });

      const bucketRev = bucketOrders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
      const bucketCount = bucketOrders.length;
      const bucketAov = bucketCount > 0 ? Math.round(bucketRev / bucketCount) : 0;

      const dateLabel = currTime.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });

      chartPoints.push({
        date: dateLabel,
        rawDate: currTime.toISOString(),
        revenue: bucketRev,
        orders: bucketCount,
        aov: bucketAov,
      });

      currTime.setDate(currTime.getDate() + stepDays);
    }

    // Sales By Category
    const categoriesList = ['Fragrance', 'Skincare', 'Makeup', 'Body Care', 'Beauty Essentials', 'Hampers', 'Combos'];
    const categoryStats = {};

    categoriesList.forEach((cat) => {
      categoryStats[cat] = { category: cat, revenue: 0, orders: 0, unitsSold: 0, revenueShare: 0 };
    });

    currValidOrders.forEach((o) => {
      (o.items || []).forEach((item) => {
        const itemCat = item.category || 'Fragrance';
        const matchedCat = categoriesList.find((c) => c.toLowerCase() === itemCat.toLowerCase()) || 'Fragrance';

        categoryStats[matchedCat].revenue += (Number(item.total) || Number(item.unitPrice) * (item.quantity || 1)) || 0;
        categoryStats[matchedCat].unitsSold += item.quantity || 1;
        categoryStats[matchedCat].orders += 1;
      });
    });

    const totalCategoryRev = Object.values(categoryStats).reduce((sum, c) => sum + c.revenue, 0) || 1;
    const salesByCategory = Object.values(categoryStats).map((c) => ({
      ...c,
      formattedRevenue: `₹${c.revenue.toLocaleString('en-IN')}`,
      revenueShare: Math.round((c.revenue / totalCategoryRev) * 100),
    }));

    // Top Products Calculation
    let topProductsQuery = products;
    if (category && category !== 'All' && category !== 'All Categories') {
      topProductsQuery = topProductsQuery.filter((p) => p.category && p.category.toLowerCase() === category.toLowerCase());
    }

    const productSalesMap = {};
    currValidOrders.forEach((o) => {
      (o.items || []).forEach((item) => {
        const pid = item.id || item.productId;
        if (!productSalesMap[pid]) {
          productSalesMap[pid] = { unitsSold: 0, revenue: 0 };
        }
        productSalesMap[pid].unitsSold += item.quantity || 1;
        productSalesMap[pid].revenue += (Number(item.total) || Number(item.unitPrice) * (item.quantity || 1)) || 0;
      });
    });

    const topProducts = topProductsQuery
      .map((p) => {
        const sales = productSalesMap[p.id] || { unitsSold: 0, revenue: 0 };
        return {
          id: p.id,
          name: p.name,
          category: p.category || 'Parfum Extrait',
          price: p.price,
          formattedPrice: p.formattedPrice || `₹${p.price.toLocaleString('en-IN')}`,
          image: p.image,
          unitsSold: sales.unitsSold,
          revenue: sales.revenue,
          formattedRevenue: `₹${sales.revenue.toLocaleString('en-IN')}`,
          stock: p.stock,
        };
      })
      .sort((a, b) => b.unitsSold - a.unitsSold || b.revenue - a.revenue)
      .slice(0, 5);

    // Inventory Alerts List
    const inventoryAlerts = products
      .filter((p) => Number(p.stock) <= (p.lowStockThreshold || 5))
      .map((p) => ({
        id: p.id,
        name: p.name,
        sku: p.sku || `VNY-${p.id}`,
        image: p.image,
        currentStock: p.stock,
        threshold: p.lowStockThreshold || 5,
        status: p.stock === 0 ? 'OUT OF STOCK' : 'LOW STOCK',
      }));

    // Customer Overview Metrics
    const totalCustomers = users.length;
    const returningCustomers = users.filter((u) => {
      const userOrders = allOrders.filter((o) => o.customerEmail && o.customerEmail.toLowerCase() === u.email.toLowerCase());
      return userOrders.length > 1;
    }).length;
    const repeatPurchaseRate = totalCustomers > 0 ? Math.round((returningCustomers / totalCustomers) * 100) : 0;

    return res.json({
      success: true,
      selectedDateRange: dateRange || 'Last 30 Days',
      kpis: {
        totalRevenue: {
          value: currRevenue,
          formatted: currRevenue > 0 ? `₹${currRevenue.toLocaleString('en-IN')}` : '—',
          change: `${Number(revPct) >= 0 ? '+' : ''}${revPct}%`,
          trend: Number(revPct) >= 0 ? 'up' : 'down',
          prevText: 'vs previous period',
        },
        orders: {
          value: currOrderCount > 0 ? currOrderCount : '—',
          change: `${Number(orderPct) >= 0 ? '+' : ''}${orderPct}%`,
          trend: Number(orderPct) >= 0 ? 'up' : 'down',
          prevText: 'vs previous period',
        },
        averageOrderValue: {
          value: currAov,
          formatted: currAov > 0 ? `₹${currAov.toLocaleString('en-IN')}` : '—',
          change: `${Number(aovPct) >= 0 ? '+' : ''}${aovPct}%`,
          trend: Number(aovPct) >= 0 ? 'up' : 'down',
          prevText: 'vs previous period',
        },
        customers: {
          value: totalCustomers > 0 ? totalCustomers : '—',
          newCustomers: currNewCustomers,
          change: `${Number(custPct) >= 0 ? '+' : ''}${custPct}%`,
          trend: Number(custPct) >= 0 ? 'up' : 'down',
          prevText: 'vs previous period',
        },
        refunds: {
          value: currRefunds,
          formatted: currRefunds > 0 ? `₹${currRefunds.toLocaleString('en-IN')}` : '₹0',
          change: `${Number(refPct) >= 0 ? '+' : ''}${refPct}%`,
          trend: Number(refPct) <= 0 ? 'up' : 'down',
          prevText: 'vs previous period',
        },
        conversionRate: {
          value: 'Analytics tracking not configured',
          configured: false,
          change: '—',
          trend: 'neutral',
          prevText: 'Visitor analytics offline',
        },
      },
      orderStatuses,
      revenueOverview: {
        chartPoints,
        hasData: chartPoints.some((p) => p.revenue > 0 || p.orders > 0),
      },
      needsAttention,
      recentOrders: allOrders.slice(0, 6),
      topProducts,
      salesByCategory,
      inventoryAlerts,
      customerOverview: {
        totalCustomers,
        newCustomers: currNewCustomers,
        returningCustomers,
        repeatPurchaseRate: `${repeatPurchaseRate}%`,
      },
      recentActivity: activityLogs.slice(0, 5),
    });
  } catch (error) {
    console.error('Admin Dashboard error:', error);
    return res.status(500).json({ success: false, message: 'Could not fetch dashboard metrics.' });
  }
}

// ORDERS
function getOrders(req, res) {
  const { status, paymentStatus, search } = req.query;
  let orders = getAllOrders();

  if (status && status !== 'All') {
    orders = orders.filter((o) => o.status.toLowerCase() === status.toLowerCase());
  }
  if (paymentStatus && paymentStatus !== 'All') {
    orders = orders.filter((o) => o.paymentStatus.toLowerCase() === paymentStatus.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    orders = orders.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q)
    );
  }

  return res.json({ success: true, count: orders.length, data: orders });
}

function getOrderById(req, res) {
  const order = findOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found.' });
  }
  return res.json({ success: true, data: order });
}

function updateOrder(req, res) {
  const { status, note } = req.body;
  const updated = updateOrderStatus(req.params.id, status, note);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Order not found.' });
  }
  logActivity(req.user.name, 'Updated Order Status', `Order ${req.params.id} -> ${status}`);
  return res.json({ success: true, message: `Order status updated to ${status}.`, data: updated });
}

// PRODUCTS
function getProductsAdmin(req, res) {
  const products = getAllProducts();
  return res.json({ success: true, count: products.length, data: products });
}

function createProductAdmin(req, res) {
  const newProduct = createProduct(req.body);
  logActivity(req.user.name, 'Created Product', newProduct.name);
  return res.status(201).json({ success: true, message: 'Product created successfully.', data: newProduct });
}

function updateProductAdmin(req, res) {
  const updated = updateProduct(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Product not found.' });
  }
  logActivity(req.user.name, 'Updated Product', updated.name);
  return res.json({ success: true, message: 'Product updated successfully.', data: updated });
}

function deleteProductAdmin(req, res) {
  const p = findProductById(req.params.id);
  const name = p ? p.name : req.params.id;
  deleteProduct(req.params.id);
  logActivity(req.user.name, 'Deleted Product', name);
  return res.json({ success: true, message: 'Product removed successfully.' });
}

// INVENTORY
function getInventory(req, res) {
  const products = getAllProducts();
  const inventory = products.map((p) => ({
    id: p.id,
    name: p.name,
    sku: p.sku || `VNY-${p.id}`,
    category: p.category,
    stock: p.stock,
    lowStockThreshold: p.lowStockThreshold || 5,
    status: p.stock === 0 ? 'OUT OF STOCK' : p.stock <= (p.lowStockThreshold || 5) ? 'LOW STOCK' : 'IN STOCK',
  }));
  return res.json({ success: true, data: inventory });
}

function updateInventory(req, res) {
  const { stock, lowStockThreshold } = req.body;
  const updated = updateProduct(req.params.id, { stock, lowStockThreshold });
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Product not found.' });
  }
  logActivity(req.user.name, 'Adjusted Inventory', `${updated.name} (Stock: ${stock})`);
  return res.json({ success: true, message: 'Stock levels updated.', data: updated });
}

// CUSTOMERS
function getCustomers(req, res) {
  const users = getAllUsers().map((u) => sanitizeUser(u));
  return res.json({ success: true, count: users.length, data: users });
}

// CONTENT
function getContentAdmin(req, res) {
  const content = getContent();
  return res.json({ success: true, data: content });
}

function updateContentAdmin(req, res) {
  const updated = updateContent(req.body);
  logActivity(req.user.name, 'Updated Storefront Content', 'Content Management');
  return res.json({ success: true, message: 'Storefront content saved.', data: updated });
}

// THEME
function getThemeAdmin(req, res) {
  const theme = getTheme();
  return res.json({ success: true, data: theme });
}

function saveDraftThemeAdmin(req, res) {
  const theme = saveDraftTheme(req.body, req.user.name);
  logActivity(req.user.name, 'Saved Draft Theme', 'Theme Settings');
  return res.json({ success: true, message: 'Draft theme saved.', data: theme });
}

function publishThemeAdmin(req, res) {
  const theme = publishTheme(req.user.name);
  logActivity(req.user.name, 'Published Theme Changes', 'Theme Settings');
  return res.json({ success: true, message: 'Theme published to live storefront.', data: theme });
}

// MARKETING
function getMarketingAdmin(req, res) {
  const data = getMarketingData();
  return res.json({ success: true, data });
}

function updateMarketingAdmin(req, res) {
  const data = saveMarketingData(req.body);
  logActivity(req.user.name, 'Updated Marketing Settings', 'Promotions & Coupons');
  return res.json({ success: true, message: 'Marketing settings saved.', data });
}

// USERS & ROLES
function getUsersAdmin(req, res) {
  const users = getAllUsers().map((u) => sanitizeUser(u));
  return res.json({ success: true, count: users.length, data: users });
}

function updateUserRoleAdmin(req, res) {
  const { role } = req.body;
  const updated = updateUser(req.params.id, { role });
  if (!updated) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }
  logActivity(req.user.name, 'Updated User Role', `${updated.email} -> ${role}`);
  return res.json({ success: true, message: `User role updated to ${role}.`, data: sanitizeUser(updated) });
}

// ACTIVITY LOG
function getActivityAdmin(req, res) {
  const logs = getActivityLogs();
  return res.json({ success: true, data: logs });
}

// SETTINGS
function getSettingsAdmin(req, res) {
  const settings = getSettings();
  return res.json({ success: true, data: settings });
}

function updateSettingsAdmin(req, res) {
  const settings = updateSettings(req.body);
  logActivity(req.user.name, 'Updated Store Settings', 'General Config');
  return res.json({ success: true, message: 'Settings saved.', data: settings });
}

module.exports = {
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
};
