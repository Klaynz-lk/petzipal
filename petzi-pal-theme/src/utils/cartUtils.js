// Cart utility functions for localStorage management

const CART_KEY = 'petzi_pal_cart';

// Get cart from localStorage
export const getCart = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error getting cart from localStorage:', error);
    return [];
  }
};

// Save cart to localStorage
export const saveCart = (cart) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Add item to cart
export const addToCart = (service, quantity = 1) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === service.id);
  
  if (existingItemIndex > -1) {
    // Update quantity if item already exists
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    const cartItem = {
      id: service.id,
      name: service.name,
      price: service.price || 0,
      image: service.image || service.images?.[0] || 'assets/images/bg/banner-img.jpg',
      provider: service.provider_name || service.vet_name || 'Unknown Provider',
      location: service.location?.city || service.location?.name || service.location || 'Available',
      duration: service.duration || '40 min',
      quantity: quantity,
      addedAt: new Date().toISOString()
    };
    cart.push(cartItem);
  }
  
  saveCart(cart);
  return cart;
};

// Remove item from cart
export const removeFromCart = (serviceId) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== serviceId);
  saveCart(updatedCart);
  return updatedCart;
};

// Update item quantity in cart
export const updateCartQuantity = (serviceId, quantity) => {
  const cart = getCart();
  const updatedCart = cart.map(item => 
    item.id === serviceId ? { ...item, quantity: Math.max(0, quantity) } : item
  ).filter(item => item.quantity > 0);
  
  saveCart(updatedCart);
  return updatedCart;
};

// Clear entire cart
export const clearCart = () => {
  saveCart([]);
  return [];
};

// Get cart total
export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Get cart item count
export const getCartItemCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

// Check if item is in cart
export const isInCart = (serviceId) => {
  const cart = getCart();
  return cart.some(item => item.id === serviceId);
};

// Get cart item by ID
export const getCartItem = (serviceId) => {
  const cart = getCart();
  return cart.find(item => item.id === serviceId);
};
