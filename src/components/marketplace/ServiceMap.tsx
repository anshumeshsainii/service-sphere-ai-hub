
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Filter } from 'lucide-react';

interface ServiceMapProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
}

const ServiceMap: React.FC<ServiceMapProps> = ({ onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);

  // Mock map functionality - in real app, integrate with Mapbox GL JS
  const mockLocations = [
    { lat: 40.7128, lng: -74.0060, address: 'New York, NY', services: 15 },
    { lat: 34.0522, lng: -118.2437, address: 'Los Angeles, CA', services: 12 },
    { lat: 41.8781, lng: -87.6298, address: 'Chicago, IL', services: 8 },
    { lat: 29.7604, lng: -95.3698, address: 'Houston, TX', services: 6 },
  ];

  const handleLocationClick = (location: typeof mockLocations[0]) => {
    const locationData = { lat: location.lat, lng: location.lng, address: location.address };
    setSelectedLocation(locationData);
    onLocationSelect(locationData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          Service Locations
        </CardTitle>
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Mock map visualization */}
        <div className="bg-gray-100 rounded-lg h-64 mb-4 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <MapPin className="h-12 w-12 mx-auto mb-2" />
            <p>Interactive Map</p>
            <p className="text-sm">(Mapbox GL JS integration needed)</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm text-gray-700">Popular Locations</h4>
          {mockLocations.map((location, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedLocation?.address === location.address
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleLocationClick(location)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{location.address}</p>
                  <p className="text-sm text-gray-500">{location.services} services available</p>
                </div>
                <Badge variant="secondary">{location.services}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceMap;
