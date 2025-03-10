import React, { useState } from 'react';
import { Search, Menu, Home, Package, Users, FileText, Settings, CreditCard, HelpCircle, ChevronDown, Plus, Minus } from 'lucide-react';
import LeftBar from './leftBar';

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('vendor');
  const [quantities, setQuantities] = useState({});

  const updateQuantity = (productId, increment, maxStock) => {
    setQuantities(prev => {
      const currentQty = prev[productId] || 0;
      const newQty = increment 
        ? Math.min(currentQty + 1, maxStock) // Don't exceed available stock
        : Math.max(0, currentQty - 1);
      return { ...prev, [productId]: newQty };
    });
  };
  
  const productData = {
    'Snacks': [
      {
        id: 1,
        name: 'Lays Chips',
        price: 20,
        stock: 20,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/images/products/sliding_image/289152a.jpg?ts=1684345618'
      },
      {
        id: 2,
        name: 'Biscuit',
        price: 30,
        stock: 25,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/da/cms-assets/cms/product/large_images/331e763a-1580-4d41-9e17-973a6ab507c5.jpg?ts=1734591638'
      },
      {
        id: 3,
        name: 'Potato Chips',
        price: 15,
        stock: 100,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/assets/products/sliding_images/jpeg/637aa24b-46a7-42a3-9fb6-ee8d524caf05.jpg?ts=1727092588'
      },
      {
        id: 4,
        name: 'Chocolate',
        price: 60,
        stock: 25,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/da/cms-assets/cms/product/large_images/759ba37d-7111-4c3a-b1c5-9c0fd40a96d8.jpg?ts=1733988690'
      }
    ],
    'Kitchen needs': [
      {
        id: 5,
        name: 'Kitchen Towel',
        price: 350,
        stock: 30,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/assets/products/sliding_images/jpeg/f1d4de38-ebad-49d6-b60d-235260a22b87.jpg?ts=1727293255'
      },
      {
        id: 6,
        name: 'Dish Soap',
        price: 280,
        stock: 45,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/images/products/sliding_image/521552a.jpg?ts=1684137748'
      },
      {
        id: 7,
        name: 'Sponge',
        price: 150,
        stock: 60,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/assets/products/sliding_images/jpeg/a2e2f141-f47d-4db0-9d32-4fc28a9e0f93.jpg?ts=1720089728'
      },
      {
        id: 8,
        name: 'Trash Bags',
        price: 220,
        stock: 40,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/images/products/full_screen/pro_481671.jpg?ts=1685974162'
      }
    ],
    "Men's Grooming": [
      {
        id: 9,
        name: 'Shaving Cream',
        price: 450,
        stock: 35,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/images/products/full_screen/pro_11732.jpg?ts=1696176214'
      },
      {
        id: 10,
        name: 'Razor',
        price: 380,
        stock: 50,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/assets/products/large_images/jpeg/599a1074-64b5-410f-be52-9483544aa6f8.jpg?ts=1719924941'
      },
      {
        id: 11,
        name: 'After Shave',
        price: 550,
        stock: 20,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/assets/products/large_images/jpeg/53be71d5-1f73-4e17-9380-819cdb0106d7.jpg?ts=1722757446'
      },
      {
        id: 12,
        name: 'Face Wash',
        price: 320,
        stock: 55,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/da/cms-assets/cms/product/large_images/fe1bd504-bc79-4ceb-8871-712b617ebe70.jpg?ts=1733374316'
      }
    ]
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <LeftBar />

      <div className="ml-64 flex-1">
        <header className="fixed top-0 right-0 left-64 bg-white shadow z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="relative w-96">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => {/* Add vendor selection logic */}}
                className="flex items-center space-x-1 text-gray-700"
              >
                <span>{selectedVendor}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-6 mt-16">
          {Object.entries(productData).map(([category, products]) => (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {category}
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="bg-gray-50 p-8 rounded-lg shadow">
                    <div className="relative">
                      <div className="w-full h-48 rounded-lg mb-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-none rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">{product.name}</div>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">₹{product.price}</div>
                        <div className="text-xs text-gray-500">Stock: {product.stock}</div>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-2">
                          <button 
                            onClick={() => updateQuantity(product.id, false, product.stock)}
                            className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                            disabled={!quantities[product.id]}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-sm">
                            {quantities[product.id] || 0}
                          </span>
                          <button 
                            onClick={() => updateQuantity(product.id, true, product.stock)}
                            className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                            disabled={quantities[product.id] >= product.stock}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button 
                          onClick={() => {/* Add to cart logic */}}
                          className="hover:bg-[#5A67BA] bg-[#9aa1c7] text-black hover:text-white px-3 py-1 rounded text-sm"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Inventory;