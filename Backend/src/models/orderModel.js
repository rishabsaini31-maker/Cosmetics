const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/orders.json');

const INITIAL_ORDERS = [
  {
    id: 'VNY-10294',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya@vanya.com',
    customerPhone: '+91 98765 43210',
    date: '2026-10-07T14:32:00.000Z',
    items: [
      {
        id: 'prod-01',
        name: 'NOIR 01 Eau de Parfum',
        category: 'Parfum Extrait',
        quantity: 1,
        unitPrice: 6800,
        total: 6800,
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
      },
    ],
    amount: 6800,
    formattedAmount: '₹6,800',
    subtotal: 6800,
    discount: 0,
    shippingFee: 0,
    tax: 1224,
    paymentMethod: 'UPI (Razorpay)',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Processing',
    status: 'Processing',
    shippingAddress: {
      street: '14 Altamount Road, Cumballa Hill',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400026',
      country: 'India',
    },
    timeline: [
      { state: 'Order Placed', timestamp: '2026-10-07T14:32:00.000Z', note: 'Customer placed order via store' },
      { state: 'Payment Confirmed', timestamp: '2026-10-07T14:32:15.000Z', note: 'Transaction ID: pay_Rz984210' },
      { state: 'Processing', timestamp: '2026-10-07T14:45:00.000Z', note: 'Allocated to Atelier Dispatch' },
    ],
  },
  {
    id: 'VNY-10293',
    customerName: 'Rishab Saini',
    customerEmail: 'rishab@vanya.com',
    customerPhone: '+91 98112 34567',
    date: '2026-10-06T18:15:00.000Z',
    items: [
      {
        id: 'prod-02',
        name: 'Saffron Lip Salve',
        category: 'Skincare',
        quantity: 2,
        unitPrice: 1450,
        total: 2900,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 'prod-03',
        name: 'Madurai Jasmine Cream',
        category: 'Skincare',
        quantity: 1,
        unitPrice: 3200,
        total: 3200,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
      },
    ],
    amount: 6100,
    formattedAmount: '₹6,100',
    subtotal: 6100,
    discount: 500,
    shippingFee: 0,
    tax: 1008,
    paymentMethod: 'Credit Card (HDFC Visa)',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Shipped',
    status: 'Shipped',
    shippingAddress: {
      street: '45 Sunder Nagar Heritage Arcade',
      city: 'New Delhi',
      state: 'Delhi',
      postalCode: '110003',
      country: 'India',
    },
    timeline: [
      { state: 'Order Placed', timestamp: '2026-10-06T18:15:00.000Z', note: 'Order confirmed' },
      { state: 'Payment Confirmed', timestamp: '2026-10-06T18:15:20.000Z', note: 'Payment verified' },
      { state: 'Packed', timestamp: '2026-10-07T09:00:00.000Z', note: 'Handcrafted box sealed' },
      { state: 'Shipped', timestamp: '2026-10-07T11:30:00.000Z', note: 'Bluedart Waybill #8841920' },
    ],
  },
  {
    id: 'VNY-10292',
    customerName: 'Priya Mehra',
    customerEmail: 'priya.m@gmail.com',
    customerPhone: '+91 99887 66554',
    date: '2026-10-05T11:00:00.000Z',
    items: [
      {
        id: 'prod-04',
        name: 'Royal Heritage Hamper',
        category: 'Hampers',
        quantity: 1,
        unitPrice: 12500,
        total: 12500,
        image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop',
      },
    ],
    amount: 12500,
    formattedAmount: '₹12,500',
    subtotal: 12500,
    discount: 0,
    shippingFee: 0,
    tax: 2250,
    paymentMethod: 'Net Banking (ICICI)',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Delivered',
    status: 'Delivered',
    shippingAddress: {
      street: '78 Koregaon Park Avenue',
      city: 'Pune',
      state: 'Maharashtra',
      postalCode: '411001',
      country: 'India',
    },
    timeline: [
      { state: 'Order Placed', timestamp: '2026-10-05T11:00:00.000Z', note: 'Gifting order confirmed' },
      { state: 'Payment Confirmed', timestamp: '2026-10-05T11:01:00.000Z', note: 'Payment confirmed' },
      { state: 'Delivered', timestamp: '2026-10-07T10:15:00.000Z', note: 'Signed for by P. Mehra' },
    ],
  },
];

function ensureStorage() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_ORDERS, null, 2), 'utf8');
  }
}

function getAllOrders() {
  ensureStorage();
  try {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(content || '[]');
  } catch (error) {
    console.error('Error reading orders storage:', error);
    return [];
  }
}

function saveOrders(orders) {
  ensureStorage();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing orders storage:', error);
  }
}

function findOrderById(id) {
  const orders = getAllOrders();
  return orders.find((o) => o.id === id);
}

function createOrder(orderData) {
  const orders = getAllOrders();
  const newOrder = {
    id: `VNY-${Math.floor(10000 + Math.random() * 90000)}`,
    customerName: orderData.customerName,
    customerEmail: orderData.customerEmail,
    customerPhone: orderData.customerPhone || '',
    date: new Date().toISOString(),
    items: orderData.items || [],
    amount: Number(orderData.amount) || 0,
    formattedAmount: `₹${(Number(orderData.amount) || 0).toLocaleString('en-IN')}`,
    subtotal: Number(orderData.subtotal) || Number(orderData.amount) || 0,
    discount: Number(orderData.discount) || 0,
    shippingFee: Number(orderData.shippingFee) || 0,
    tax: Number(orderData.tax) || 0,
    paymentMethod: orderData.paymentMethod || 'UPI',
    paymentStatus: orderData.paymentStatus || 'Paid',
    fulfillmentStatus: orderData.fulfillmentStatus || 'Pending',
    status: orderData.status || 'Pending',
    shippingAddress: orderData.shippingAddress || {},
    timeline: [
      { state: 'Order Placed', timestamp: new Date().toISOString(), note: 'Order created' },
    ],
  };

  orders.unshift(newOrder);
  saveOrders(orders);
  return newOrder;
}

function updateOrderStatus(id, status, note = '') {
  const orders = getAllOrders();
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return null;

  const currentTimeline = orders[index].timeline || [];
  currentTimeline.push({
    state: status,
    timestamp: new Date().toISOString(),
    note: note || `Status updated to ${status}`,
  });

  orders[index].status = status;
  if (status === 'Delivered') {
    orders[index].fulfillmentStatus = 'Delivered';
  } else if (status === 'Shipped') {
    orders[index].fulfillmentStatus = 'Shipped';
  } else if (status === 'Cancelled') {
    orders[index].fulfillmentStatus = 'Cancelled';
  }

  saveOrders(orders);
  return orders[index];
}

module.exports = {
  getAllOrders,
  findOrderById,
  createOrder,
  updateOrderStatus,
};
