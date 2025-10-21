// client/src/pages/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Plus, Edit, Trash2, ShoppingBag, X, Save, Eye, LogOut } from 'lucide-react';
import { productAPI, orderAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check if user is admin
  useEffect(() => {
    if (!isAuthenticated) {
      alert('Please login as admin to access this page');
      navigate('/login');
      return;
    }

    if (user?.role !== 'admin') {
      alert('Access denied. Admin privileges required.');
      navigate('/');
      return;
    }
  }, [isAuthenticated, user, navigate]);

  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    category: 'Rings',
    metalType: 'Gold',
    purity: '22K',
    weight: '',
    price: '',
    stock: '',
    featured: false,
    images: []
  });

  const categories = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Bangles', 'Pendants', 'Sets'];
  const metalTypes = ['Gold', 'Silver', 'Platinum', 'Rose Gold', 'White Gold'];
  const orderStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAllProducts();
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      if (error.response?.status === 403) {
        alert('Access denied. Please login as admin.');
        navigate('/login');
      }
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getUserOrders();
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      fetchProducts();
      fetchOrders();
    }
  }, [isAuthenticated, user]);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingProduct) {
        await productAPI.updateProduct(editingProduct._id, productForm);
        alert('Product updated successfully!');
      } else {
        await productAPI.createProduct(productForm);
        alert('Product added successfully!');
      }
      
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      const errorMessage = error.response?.data?.message || 'Error saving product. Please try again.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setProductForm({
      name: '',
      description: '',
      category: 'Rings',
      metalType: 'Gold',
      purity: '22K',
      weight: '',
      price: '',
      stock: '',
      featured: false,
      images: []
    });
    setEditingProduct(null);
    setShowAddProduct(false);
  };

  const handleEdit = (product) => {
    setProductForm(product);
    setEditingProduct(product);
    setShowAddProduct(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.deleteProduct(id);
        fetchProducts();
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
      }
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderAPI.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      alert('Order status updated!');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order status.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Don't render if not admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-400 mb-6">You need admin privileges to access this page</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gold text-dark-bg px-6 py-2 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100">
      {/* Header */}
      <div className="bg-dark-card border-b border-dark-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gold">Patil Jewellers Admin</h1>
            <p className="text-sm text-gray-400">Welcome, {user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-dark-card min-h-screen border-r border-dark-border">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'products' ? 'bg-gold text-dark-bg' : 'text-gray-300 hover:bg-dark-elevated'
              }`}
            >
              <Package size={20} />
              <span>Products</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'orders' ? 'bg-gold text-dark-bg' : 'text-gray-300 hover:bg-dark-elevated'
              }`}
            >
              <ShoppingBag size={20} />
              <span>Orders</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Product Management</h2>
                <button
                  onClick={() => setShowAddProduct(true)}
                  className="bg-gold hover:bg-gold-dark text-dark-bg px-4 py-2 rounded-lg flex items-center gap-2 font-medium"
                >
                  <Plus size={20} />
                  Add Product
                </button>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product._id} className="bg-dark-card rounded-lg border border-dark-border overflow-hidden">
                    <div className="aspect-square bg-dark-elevated flex items-center justify-center">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package size={48} className="text-gray-500" />
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{product.name}</h3>
                        {product.featured && (
                          <span className="bg-gold text-dark-bg text-xs px-2 py-1 rounded font-medium">Featured</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{product.category} • {product.metalType}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gold font-bold">₹{product.price?.toLocaleString()}</span>
                        <span className="text-sm text-gray-400">Stock: {product.stock}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center gap-2"
                        >
                          <Edit size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded flex items-center justify-center gap-2"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Order Management</h2>
              
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order._id} className="bg-dark-card rounded-lg border border-dark-border p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">Order #{order._id}</h3>
                        <p className="text-sm text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className="bg-dark-elevated border border-dark-border rounded px-3 py-1 text-sm"
                      >
                        {orderStatuses.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="border-t border-dark-border pt-4">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-400">Customer</p>
                          <p className="font-medium">{order.user?.name || 'N/A'}</p>
                          <p className="text-sm text-gray-400">{order.user?.email || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Total Amount</p>
                          <p className="font-bold text-gold text-xl">₹{order.totalAmount?.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-gold hover:text-gold-dark text-sm flex items-center gap-2"
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-dark-border">
            <div className="flex justify-between items-center p-6 border-b border-dark-border">
              <h3 className="text-xl font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleProductSubmit} className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">Product Name *</label>
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                      required
                      className="w-full bg-dark-elevated border border-dark-border rounded px-4 py-2 focus:outline-none focus:border-gold"
                      placeholder="e.g., Gold Diamond Ring"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={productForm.description}
                      onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                      className="w-full bg-dark-elevated border border-dark-border rounded px-4 py-2 h-24 focus:outline-none focus:border-gold"
                      placeholder="Product description..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                      className="w-full bg-dark-elevated border border-dark-border rounded px-4 py-2 focus:outline-none focus:border-gold"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Metal Type *</label>
                    <select
                      value={productForm.metalType}
                      onChange={(e) => setProductForm({...productForm, metalType: e.target.value})}
                      className="w-full bg-dark-elevated border border-dark-border rounded px-4 py-2 focus:outline-none focus:border-gold"
                    >
                      {metalTypes.map(metal => (
                        <option key={metal} value={metal}>{metal}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Purity *</label>
                    <input
                      type="text"
                      value={productForm.purity}
                      onChange={(e) => setProductForm({...productForm, purity: e.target.value})}
                      required
                      className="w-full bg-dark-elevated border border-dark-border rounded px-4 py-2 focus:outline-none focus:border-gold"
                      placeholder="e.g., 22K, 925"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Weight (grams) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={productForm.weight}
                      onChange={(e) => setProductForm({...productForm, weight: parseFloat(e.target.value)})}
                      required
                      className="w-full bg-dark-elevated border border-dark-border rounded px-4 py-2 focus:outline-none focus:border-gold"
                      placeholder="e.g., 5.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Price (₹) *</label>
                    <input
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm({...productForm, price: parseInt(e.target.value)})}
                      required
                      className="w-full bg-dark-elevated border border-dark-border rounded px-4 py-2 focus:outline-none focus:border-gold"
                      placeholder="e.g., 45000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Stock Quantity *</label>
                    <input
                      type="number"
                      value={productForm.stock}
                      onChange={(e) => setProductForm({...productForm, stock: parseInt(e.target.value)})}
                      required
                      className="w-full bg-dark-elevated border border-dark-border rounded px-4 py-2 focus:outline-none focus:border-gold"
                      placeholder="e.g., 10"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.featured}
                        onChange={(e) => setProductForm({...productForm, featured: e.target.checked})}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">Mark as Featured Product</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gold hover:bg-gold-dark text-dark-bg py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Save size={20} />
                    {loading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 bg-dark-elevated hover:bg-dark-border text-white py-3 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-card rounded-lg max-w-2xl w-full border border-dark-border">
            <div className="flex justify-between items-center p-6 border-b border-dark-border">
              <h3 className="text-xl font-bold">Order Details</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Order ID</p>
                  <p className="font-medium">{selectedOrder._id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <p className="font-medium capitalize">{selectedOrder.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Customer Name</p>
                  <p className="font-medium">{selectedOrder.user?.name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-medium">{selectedOrder.user?.email || 'N/A'}</p>
                </div>
              </div>

              <div className="border-t border-dark-border pt-4">
                <h4 className="font-bold mb-3">Order Items</h4>
                {selectedOrder.items?.map((item, index) => (
                  <div key={index} className="flex justify-between py-2">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-dark-border pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-gold">₹{selectedOrder.totalAmount?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;