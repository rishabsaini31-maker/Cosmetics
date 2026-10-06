export interface OrderItem {
  id: string;
  name: string;
  category: string;
  price: number;
  formattedPrice: string;
  quantity: number;
  image: string;
}

export interface Order {
  orderNumber: string;
  email: string;
  phone: string;
  orderDate: string;
  estimatedDelivery: string;
  status: 'ORDER CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'OUT FOR DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'RETURNED' | 'REFUNDED';
  courierName?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  formattedTotal: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
}

export const MOCK_ORDERS: Order[] = [
  {
    orderNumber: 'VNY-948201',
    email: 'rishab@example.com',
    phone: '9876543210',
    orderDate: 'October 3, 2026',
    estimatedDelivery: 'October 7, 2026',
    status: 'SHIPPED',
    courierName: 'BlueDart Express',
    trackingNumber: 'BD-90481239IN',
    items: [
      {
        id: 'prod-01',
        name: 'NOIR 01 Eau de Parfum',
        category: 'Parfum Extrait',
        price: 6800,
        formattedPrice: '₹6,800',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 'prod-02',
        name: 'Saffron Lip Salve',
        category: 'Skincare',
        price: 1450,
        formattedPrice: '₹1,450',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
      },
    ],
    subtotal: 8250,
    shippingFee: 0,
    total: 8250,
    formattedTotal: '₹8,250',
    shippingAddress: {
      fullName: 'Rishab Saini',
      street: '74 Artisan Guild Avenue, Civil Lines',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110054',
      country: 'India',
    },
  },
  {
    orderNumber: 'VAN-9821-IN',
    email: 'customer@vanya.com',
    phone: '9988776655',
    orderDate: 'October 1, 2026',
    estimatedDelivery: 'October 5, 2026',
    status: 'DELIVERED',
    courierName: 'Delhivery Surface',
    trackingNumber: 'DEL-8839210IN',
    items: [
      {
        id: 'prod-03',
        name: 'Madurai Jasmine Cream',
        category: 'Skincare',
        price: 3200,
        formattedPrice: '₹3,200',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
      },
    ],
    subtotal: 3200,
    shippingFee: 0,
    total: 3200,
    formattedTotal: '₹3,200',
    shippingAddress: {
      fullName: 'Ananya Roy',
      street: 'Flat 4B, Emerald Heights, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      country: 'India',
    },
  },
  {
    orderNumber: 'VAN-7740-IN',
    email: 'guest@vanya.com',
    phone: '9123456789',
    orderDate: 'October 5, 2026',
    estimatedDelivery: 'October 9, 2026',
    status: 'PROCESSING',
    courierName: 'BlueDart Air',
    trackingNumber: 'BD-7719203IN',
    items: [
      {
        id: 'prod-04',
        name: 'Kannauj Rose Water Mist',
        category: 'Botanical Mist',
        price: 1950,
        formattedPrice: '₹1,950',
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
      },
    ],
    subtotal: 3900,
    shippingFee: 0,
    total: 3900,
    formattedTotal: '₹3,900',
    shippingAddress: {
      fullName: 'Kavita Sharma',
      street: '12 Heritage Enclave, Malabar Hill',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400006',
      country: 'India',
    },
  },
];

export function lookupOrder(orderNumber: string, verificationInput?: string): Order | null {
  const cleanOrderNum = orderNumber.trim().toUpperCase();
  const order = MOCK_ORDERS.find((o) => o.orderNumber.toUpperCase() === cleanOrderNum);

  if (!order) return null;

  if (verificationInput && verificationInput.trim()) {
    const input = verificationInput.trim().toLowerCase();
    const matchesEmail = order.email.toLowerCase() === input;
    const matchesPhone = order.phone.replace(/\D/g, '').endsWith(input.replace(/\D/g, ''));
    if (!matchesEmail && !matchesPhone) {
      return null;
    }
  }

  return order;
}
