import React, { useState } from 'react';
import { Package, Truck, MapPin, CheckCircle, Loader, Search, ChevronDown } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate, useLocation } from 'react-router-dom';
import LeftBar from './leftBar'; // Assuming LeftBar is in the same directory

// Keep existing mockShipments data
const mockShipments = [
  {
    id: "SHP123456",
    origin: "New York, NY",
    destination: "Los Angeles, CA",
    status: "In Transit",
    currentLocation: "Denver, CO",
    estimatedDelivery: "2025-01-22",
    coordinates: {
      origin: { lat: 40.7128, lng: -74.0060 },
      destination: { lat: 34.0522, lng: -118.2437 },
      current: { lat: 39.7392, lng: -104.9903 }
    },
    updates: [
      { date: "2025-01-15", location: "New York, NY", status: "Picked up", coordinates: { lat: 40.7128, lng: -74.0060 } },
      { date: "2025-01-16", location: "Cleveland, OH", status: "In Transit", coordinates: { lat: 41.4993, lng: -81.6944 } },
      { date: "2025-01-17", location: "Denver, CO", status: "In Transit", coordinates: { lat: 39.7392, lng: -104.9903 } },
    ]
  },
  {
    id: "SHP789012",
    origin: "Seattle, WA",
    destination: "Miami, FL",
    status: "Delivered",
    currentLocation: "Miami, FL",
    estimatedDelivery: "2025-01-18",
    coordinates: {
      origin: { lat: 47.6062, lng: -122.3321 },
      destination: { lat: 25.7617, lng: -80.1918 },
      current: { lat: 25.7617, lng: -80.1918 }
    },
    updates: [
      { date: "2025-01-14", location: "Seattle, WA", status: "Picked up", coordinates: { lat: 47.6062, lng: -122.3321 } },
      { date: "2025-01-15", location: "Chicago, IL", status: "In Transit", coordinates: { lat: 41.8781, lng: -87.6298 } },
      { date: "2025-01-16", location: "Atlanta, GA", status: "In Transit", coordinates: { lat: 33.7490, lng: -84.3880 } },
      { date: "2025-01-18", location: "Miami, FL", status: "Delivered", coordinates: { lat: 25.7617, lng: -80.1918 } },
    ]
  }
];

const createIcon = (color) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });
};

const MapBounds = ({ coordinates }) => {
  const map = useMap();
  
  React.useEffect(() => {
    const bounds = L.latLngBounds(coordinates);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [coordinates, map]);
  
  return null;
};

const ShipmentTracker = () => {
  const [selectedShipment, setSelectedShipment] = useState(mockShipments[0]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('vendor');

  const getPathCoordinates = (shipment) => {
    return shipment.updates.map(update => [update.coordinates.lat, update.coordinates.lng]);
  };

  const MapComponent = ({ shipment }) => {
    const coordinates = getPathCoordinates(shipment);
    const center = [
      (shipment.coordinates.origin.lat + shipment.coordinates.destination.lat) / 2,
      (shipment.coordinates.origin.lng + shipment.coordinates.destination.lng) / 2
    ];

    return (
      <MapContainer
        center={center}
        zoom={4}
        className="h-[400px] w-full"
        whenReady={() => setMapLoaded(true)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <Polyline
          positions={coordinates}
          color="#3b82f6"
          weight={3}
        />
        
        <Marker
          position={[shipment.coordinates.origin.lat, shipment.coordinates.origin.lng]}
          icon={createIcon('#22c55e')}
        />
        
        <Marker
          position={[shipment.coordinates.destination.lat, shipment.coordinates.destination.lng]}
          icon={createIcon('#ef4444')}
        />
        
        <Marker
          position={[shipment.coordinates.current.lat, shipment.coordinates.current.lng]}
          icon={createIcon('#3b82f6')}
        />
        
        <MapBounds coordinates={coordinates} />
      </MapContainer>
    );
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
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex gap-4 mb-6">
              {mockShipments.map(shipment => (
                <button
                  key={shipment.id}
                  onClick={() => setSelectedShipment(shipment)}
                  className={`flex-1 p-4 rounded-lg border transition-colors ${
                    selectedShipment.id === shipment.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium">{shipment.id}</div>
                  <div className="text-sm text-gray-500">{shipment.origin} → {shipment.destination}</div>
                </button>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center gap-2 font-semibold text-lg">
                  <Package className="h-5 w-5" />
                  Shipment Details
                </div>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Origin</div>
                    <div className="mt-1">{selectedShipment.origin}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Destination</div>
                    <div className="mt-1">{selectedShipment.destination}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Status</div>
                    <div className="mt-1 translate-x-[85px] flex items-center gap-2">
                      <span className={`inline-block w-2 h-2 rounded-full ${
                        selectedShipment.status === 'Delivered' ? 'bg-green-500' : 'bg-blue-500'
                      }`}></span>
                      {selectedShipment.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center gap-2 font-semibold text-lg">
                  <MapPin className="h-5 w-5" />
                  Tracking Map
                </div>
              </div>
              <div className="p-6">
                <div className="relative">
                  <MapComponent shipment={selectedShipment} />
                  {!mapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                      <Loader className="w-8 h-8 animate-spin text-blue-500" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center gap-2 font-semibold text-lg">
                  <Truck className="h-5 w-5" />
                  Shipment Updates
                </div>
              </div>
              <div className="p-6">
                <div className="relative">
                  {selectedShipment.updates.map((update, index) => (
                    <div key={index} className="flex gap-4 mb-4">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        {index !== selectedShipment.updates.length - 1 && (
                          <div className="absolute top-8 left-4 w-0.5 h-full -ml-px bg-blue-200"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{update.status}</div>
                        <div className="text-sm text-gray-500">{update.location}</div>
                        <div className="text-sm text-gray-500">{update.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShipmentTracker;