import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Package, FileText, Truck, Settings, CreditCard, Users, HelpCircle } from 'lucide-react';
import {Link} from 'react-router-dom';
const LeftBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Inventory', icon: Package, path: '/inventory' },
    { name: 'Vendor Order', icon: FileText, path: '/vendor-order' },
    { name: 'Tracker', icon: Truck, path: '/shipment-tracker' }
  ];

  const otherItems = [
    // { name: 'Settings', icon: Settings, path: '/settings' },
    { name: 'Payment', icon: CreditCard, path: '/payment' },
    // { name: 'Accounts', icon: Users, path: '/accounts' },
    { name: 'Help', icon: HelpCircle, path: '/help' }
  ];

  const NavItem = ({ item }) => (
    <button
      onClick={() => navigate(item.path)}
      className={`w-full flex items-center px-4 py-3 text-sm transition-colors ${
        location.pathname === item.path
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-700 hover:bg-gray-300'
      }`}
    >
      <item.icon className="w-5 h-5 mr-3" />
      {item.name}
    </button>
  );

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-white shadow-lg">
      <div className="pt-4 px-4 pb-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-7 bg-indigo-500 rounded-full text-white "> S </div>
          <Link to = {'/'}>

            <span className="text-xl font-semibold hover: text-gray-700">SupplyLink</span>
          </Link>
        </div>
      </div>
      
      <div className="px-4 py-2 text-sm text-gray-600 font-medium">MENU</div>
      
      <nav className="mb-6">
        {menuItems.map((item) => (
          <NavItem key={item.name} item={item} />
        ))}
      </nav>
      
      <div className="px-4 py-2 text-sm text-gray-600 font-medium">OTHERS</div>
      
      <nav>
        {otherItems.map((item) => (
          <NavItem key={item.name} item={item} />
        ))}
      </nav>
    </aside>
  );
};

const Dashboard = () => {
  const barData = [
    { day: 'D1', lastWeek: 800, yesterday: 100 },
    { day: 'D2', lastWeek: 600, yesterday: 75 },
    { day: 'D3', lastWeek: 700, yesterday: 80 },
    { day: 'D4', lastWeek: 550, yesterday: 65 },
    { day: 'D5', lastWeek: 900, yesterday: 95 },
    { day: 'D6', lastWeek: 1000, yesterday: 110 },
  ];

  const lineData = [
    { month: '01', sales: 2400 },
    { month: '02', sales: 1800 },
    { month: '03', sales: 3200 },
    { month: '04', sales: 2800 },
    { month: '05', sales: 2600 },
    { month: '06', sales: 3800 }
  ];

  const pieData = [
    { name: 'Morning', value: 28, color: '#E5E7EB' },
    { name: 'Evening', value: 32, color: '#93C5FD' },
    { name: 'Afternoon', value: 40, color: '#3B82F6' }
  ];

  const mostOrderedFood = [
    { name: 'Fresh Salad Bowl', price: 'IDR 45,000', img: '/api/placeholder/40/40' },
    { name: 'Chicken Noodles', price: 'IDR 75,000', img: '/api/placeholder/40/40' },
    { name: 'Smoothie Fruits', price: 'IDR 45,000', img: '/api/placeholder/40/40' },
    { name: 'Hot Chicken Wings', price: 'IDR 45,000', img: '/api/placeholder/40/40' }
  ];

  return (
    <div className="flex">
      <LeftBar />
      <main className="ml-64 flex-1">
        <div className="p-6">
          <h1 className="text-4xl font-ubuntu mb-6 mt-2">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Revenue Card */}
            <div className="col-span-2 bg-white rounded-lg shadow-md">
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-l text-gray-700 items-center ">Revenue</h2>
                    <div className="text-2xl font-bold mt-2">IDR 7,852,000</div>
                    <div className="text-sm text-green-500">↑ 2.1% vs last week</div>
                  </div>
                  <button className="text-blue-600 text-sm hover:text-gray-400">View Report</button>
                </div>
              </div>
              <div className="p-4 h-64 ">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="yesterday" fill="#3B82F6" />
                    <Bar dataKey="lastWeek" fill="gray" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Order Time Card */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-l text-gray-700">Order Time</h2>
                  <button className="text-blue-600 text-sm hover:text-gray-400">View Report</button>
                </div>
              </div>
              <div className="p-4 h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-lg font-bold">1,890</div>
                  <div className="text-lg text-gray-500">orders</div>
                </div>
              </div>
            </div>

            {/* Orders Card */}
            <div className="col-span-2 bg-white rounded-lg shadow-md">
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg text-gray-700">Order</h2>
                    <div className="text-2xl font-bold mt-2">2,568</div>
                    <div className="text-sm text-red-500">↓ 2.1% vs last week</div>
                  </div>
                  <button className="text-blue-600 text-sm hover:text-gray-400">View Report</button>
                </div>
              </div>
              <div className="p-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Most Ordered Food Card */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                <h2 className="text-l text-gray-700">Most Ordered Food</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {mostOrderedFood.map((food, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <img src={food.img} alt={food.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="text-sm font-medium">{food.name}</div>
                        <div className="text-sm text-gray-500">{food.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;