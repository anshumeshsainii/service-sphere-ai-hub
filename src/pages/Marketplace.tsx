
import React, { useState } from 'react';
import ServiceCard from '@/components/marketplace/ServiceCard';
import ServiceMap from '@/components/marketplace/ServiceMap';
import BookingModal from '@/components/booking/BookingModal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { Service, Worker } from '@/types';

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  // Mock data - replace with real API calls
  const mockWorkers: Worker[] = [
    {
      id: '1',
      email: 'worker1@example.com',
      role: 'worker',
      name: 'Alice Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c',
      rating: 4.8,
      totalJobs: 127,
      isVerified: true,
      availability: 'available',
      hourlyRate: 25,
      description: 'Professional cleaner with 5+ years experience',
      skills: ['cleaning', 'organizing'],
      services: [],
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      email: 'worker2@example.com',
      role: 'worker',
      name: 'Bob Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      rating: 4.6,
      totalJobs: 89,
      isVerified: true,
      availability: 'available',
      hourlyRate: 35,
      description: 'Expert gardener and landscaper',
      skills: ['gardening', 'landscaping'],
      services: [],
      createdAt: '2024-01-01',
    },
  ];

  const mockServices: Service[] = [
    {
      id: '1',
      workerId: '1',
      title: 'Professional House Cleaning',
      description: 'Complete house cleaning including kitchen, bathrooms, bedrooms, and living areas. All supplies included.',
      category: 'cleaning',
      price: 80,
      duration: 120,
      images: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952'],
      location: { lat: 40.7128, lng: -74.0060, address: 'New York, NY' },
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      workerId: '2',
      title: 'Garden Maintenance & Landscaping',
      description: 'Complete garden care including pruning, weeding, planting, and basic landscaping services.',
      category: 'gardening',
      price: 120,
      duration: 180,
      images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b'],
      location: { lat: 40.7589, lng: -73.9851, address: 'Manhattan, NY' },
      createdAt: '2024-01-01',
    },
  ];

  const categories = ['all', 'cleaning', 'gardening', 'plumbing', 'electrical', 'painting'];

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBookService = (service: Service) => {
    const worker = mockWorkers.find(w => w.id === service.workerId);
    setSelectedService(service);
    setSelectedWorker(worker || null);
    setIsBookingModalOpen(true);
  };

  const handleBookingConfirm = (bookingData: any) => {
    console.log('Booking confirmed:', bookingData);
    // Here you would typically send the booking data to your backend
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Services Near You</h1>
          <p className="text-gray-600">Discover and book professional services in your area</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-1">
            <ServiceMap onLocationSelect={setSelectedLocation} />
          </div>

          {/* Services List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {filteredServices.length} services found
                  {selectedLocation && ` near ${selectedLocation.address}`}
                </h2>
              </div>

              <div className="grid gap-6">
                {filteredServices.map(service => {
                  const worker = mockWorkers.find(w => w.id === service.workerId);
                  return worker ? (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      worker={worker}
                      onBook={handleBookService}
                    />
                  ) : null;
                })}
              </div>

              {filteredServices.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No services found matching your criteria.</p>
                  <Button variant="outline" className="mt-4" onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          service={selectedService}
          worker={selectedWorker}
          onConfirm={handleBookingConfirm}
        />
      </div>
    </div>
  );
};

export default Marketplace;
