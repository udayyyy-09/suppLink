import React from 'react';
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
    { name: 'Payment', icon: CreditCard, path: '/payment' },
    // { name: 'Accounts', icon: Users, path: '/accounts' },
    { name: 'Help', icon: HelpCircle, path: '/help' }
  ];

  const NavItem = ({ item }) => (
    <button
      onClick={() => navigate(item.path)}
      className={`w-full flex items-center px-4 py-3 text-sm transition-colors ${
        location.pathname === item.path
          ? 'bg-blue-50 text-blue-600 '
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
          <div className="w-9 h-7 bg-indigo-600 rounded-full text-white mt-1"> S </div>
          <Link to ={'/'}>

            <span className="text-xl font-semibold hover:text-blue-400 ">SupplyLink</span>
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

export default LeftBar;