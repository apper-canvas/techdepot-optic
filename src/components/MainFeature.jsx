import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import ApperIcon from './ApperIcon'

function MainFeature({ currentView }) {
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Gaming Laptop RTX 4070',
      category: 'Laptops',
      price: 1299.99,
      stockQuantity: 5,
      specifications: { cpu: 'Intel i7-13700H', gpu: 'RTX 4070', ram: '16GB DDR5' },
      image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=300&fit=crop',
      description: 'High-performance gaming laptop with latest RTX graphics'
    },
    {
      id: '2',
      name: 'Mechanical Gaming Keyboard',
      category: 'Peripherals',
      price: 149.99,
      stockQuantity: 12,
      specifications: { switches: 'Cherry MX Blue', backlight: 'RGB', connectivity: 'USB-C' },
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop',
      description: 'Premium mechanical keyboard with RGB lighting'
    },
    {
      id: '3',
      name: 'Ultrawide Monitor 34"',
      category: 'Monitors',
      price: 599.99,
      stockQuantity: 8,
      specifications: { size: '34 inch', resolution: '3440x1440', refresh: '144Hz' },
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
      description: 'Curved ultrawide monitor perfect for gaming and productivity'
    }
  ])

  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customerId: 'CUST-001',
      customerName: 'John Smith',
      items: [{ productId: '1', quantity: 1, price: 1299.99 }],
      totalAmount: 1299.99,
      status: 'Pending',
      orderDate: new Date('2024-01-15'),
      shippingAddress: { street: '123 Tech St', city: 'Silicon Valley', zip: '90210' }
    },
    {
      id: 'ORD-002',
      customerId: 'CUST-002',
      customerName: 'Sarah Johnson',
      items: [{ productId: '2', quantity: 2, price: 149.99 }],
      totalAmount: 299.98,
      status: 'Shipped',
      orderDate: new Date('2024-01-14'),
      shippingAddress: { street: '456 Gamer Ave', city: 'Tech City', zip: '90211' }
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stockQuantity: '',
    description: '',
    specifications: { cpu: '', gpu: '', ram: '' }
  })

  const categories = ['All', 'Laptops', 'Desktops', 'Monitors', 'Peripherals', 'Components']

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddProduct = (e) => {
    e.preventDefault()
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast.error('Please fill in all required fields')
      return
    }

    const product = {
      id: Date.now().toString(),
      ...newProduct,
      price: parseFloat(newProduct.price),
      stockQuantity: parseInt(newProduct.stockQuantity) || 0,
      image: `https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop`
    }

    setProducts([...products, product])
    setNewProduct({
      name: '',
      category: '',
      price: '',
      stockQuantity: '',
      description: '',
      specifications: { cpu: '', gpu: '', ram: '' }
    })
    setShowAddProduct(false)
    toast.success('Product added successfully!')
  }

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
    toast.success(`Order ${orderId} status updated to ${newStatus}`)
  }

  const getLowStockProducts = () => products.filter(p => p.stockQuantity < 10)
  const getTotalRevenue = () => orders.reduce((sum, order) => sum + order.totalAmount, 0)
  const getPendingOrders = () => orders.filter(order => order.status === 'Pending').length

  const renderInventoryView = () => (
    <div className="space-y-6">
      {/* Header with Search and Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-surface-100">
            Inventory Management
          </h2>
          <p className="text-surface-600 dark:text-surface-400">
            Manage your product catalog and stock levels
          </p>
        </div>
        
        <motion.button
          onClick={() => setShowAddProduct(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium w-fit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ApperIcon name="Plus" className="w-5 h-5" />
          <span>Add Product</span>
        </motion.button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-surface-800 rounded-2xl p-4 sm:p-6 shadow-soft border border-surface-200 dark:border-surface-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div 
          className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 shadow-soft"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary mb-1">Total Products</p>
              <p className="text-2xl font-bold text-surface-900 dark:text-surface-100">{products.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
              <ApperIcon name="Package" className="w-6 h-6 text-primary" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-2xl p-6 shadow-soft"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary mb-1">Low Stock Items</p>
              <p className="text-2xl font-bold text-surface-900 dark:text-surface-100">{getLowStockProducts().length}</p>
            </div>
            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
              <ApperIcon name="AlertTriangle" className="w-6 h-6 text-secondary" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-6 shadow-soft sm:col-span-2 lg:col-span-1"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-accent mb-1">Total Value</p>
              <p className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                ${products.reduce((sum, p) => sum + (p.price * p.stockQuantity), 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
              <ApperIcon name="DollarSign" className="w-6 h-6 text-accent" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft border border-surface-200 dark:border-surface-700 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    product.stockQuantity < 10 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {product.stockQuantity < 10 ? 'Low Stock' : 'In Stock'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-primary font-medium">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-surface-900 dark:text-surface-100">
                      ${product.price}
                    </p>
                    <p className="text-sm text-surface-600 dark:text-surface-400">
                      Stock: {product.stockQuantity}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-surface-600 dark:text-surface-400 mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="space-y-2 mb-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    value && (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-surface-600 dark:text-surface-400 capitalize">{key}:</span>
                        <span className="text-surface-900 dark:text-surface-100 font-medium">{value}</span>
                      </div>
                    )
                  ))}
                </div>

                <div className="flex space-x-2">
                  <motion.button
                    className="flex-1 bg-primary text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ApperIcon name="MoreVertical" className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowAddProduct(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100">Add New Product</h3>
                <button
                  onClick={() => setShowAddProduct(false)}
                  className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Category *
                    </label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select category</option>
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Price *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      value={newProduct.stockQuantity}
                      onChange={(e) => setNewProduct({...newProduct, stockQuantity: e.target.value})}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Enter product description"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      CPU
                    </label>
                    <input
                      type="text"
                      value={newProduct.specifications.cpu}
                      onChange={(e) => setNewProduct({
                        ...newProduct, 
                        specifications: {...newProduct.specifications, cpu: e.target.value}
                      })}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="e.g., Intel i7"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      GPU
                    </label>
                    <input
                      type="text"
                      value={newProduct.specifications.gpu}
                      onChange={(e) => setNewProduct({
                        ...newProduct, 
                        specifications: {...newProduct.specifications, gpu: e.target.value}
                      })}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="e.g., RTX 4070"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      RAM
                    </label>
                    <input
                      type="text"
                      value={newProduct.specifications.ram}
                      onChange={(e) => setNewProduct({
                        ...newProduct, 
                        specifications: {...newProduct.specifications, ram: e.target.value}
                      })}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="e.g., 16GB DDR5"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                  >
                    Add Product
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddProduct(false)}
                    className="flex-1 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 py-3 px-6 rounded-xl font-medium hover:bg-surface-200 dark:hover:bg-surface-600 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const renderOrdersView = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-surface-100">
            Order Management
          </h2>
          <p className="text-surface-600 dark:text-surface-400">
            Track and manage customer orders
          </p>
        </div>
      </div>

      {/* Orders Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div 
          className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700 rounded-2xl p-6 shadow-soft"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-surface-900 dark:text-surface-100">{orders.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-xl flex items-center justify-center">
              <ApperIcon name="ShoppingCart" className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border border-orange-200 dark:border-orange-700 rounded-2xl p-6 shadow-soft"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-1">Pending Orders</p>
              <p className="text-2xl font-bold text-surface-900 dark:text-surface-100">{getPendingOrders()}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-800 rounded-xl flex items-center justify-center">
              <ApperIcon name="Clock" className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700 rounded-2xl p-6 shadow-soft sm:col-span-2 lg:col-span-1"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                ${getTotalRevenue().toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-xl flex items-center justify-center">
              <ApperIcon name="DollarSign" className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            className="bg-white dark:bg-surface-800 rounded-2xl p-4 sm:p-6 shadow-soft border border-surface-200 dark:border-surface-700 hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <h3 className="font-semibold text-surface-900 dark:text-surface-100">
                    Order {order.id}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${
                    order.status === 'Pending' 
                      ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                      : order.status === 'Shipped'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="text-surface-600 dark:text-surface-400">Customer:</span>
                    <span className="ml-2 font-medium text-surface-900 dark:text-surface-100">
                      {order.customerName}
                    </span>
                  </div>
                  <div>
                    <span className="text-surface-600 dark:text-surface-400">Total:</span>
                    <span className="ml-2 font-bold text-green-600 dark:text-green-400">
                      ${order.totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-surface-600 dark:text-surface-400">Date:</span>
                    <span className="ml-2 font-medium text-surface-900 dark:text-surface-100">
                      {format(order.orderDate, 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-surface-600 dark:text-surface-400">Items:</span>
                  <span className="ml-2 text-surface-900 dark:text-surface-100">
                    {order.items.length} item(s)
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  className="px-4 py-2 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                
                <motion.button
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Details
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderDefaultView = () => (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="Wrench" className="w-12 h-12 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
        Feature Coming Soon
      </h3>
      <p className="text-surface-600 dark:text-surface-400">
        This feature is currently under development and will be available soon.
      </p>
    </div>
  )

  return (
    <div className="w-full">
      {currentView === 'inventory' && renderInventoryView()}
      {currentView === 'orders' && renderOrdersView()}
      {(currentView === 'customers' || currentView === 'repairs' || currentView === 'analytics') && renderDefaultView()}
    </div>
  )
}

export default MainFeature