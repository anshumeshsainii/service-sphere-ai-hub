
export interface User {
  id: string;
  email: string;
  role: 'user' | 'worker' | 'admin';
  name: string;
  avatar?: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  createdAt: string;
}

export interface Worker extends User {
  role: 'worker';
  services: Service[];
  rating: number;
  totalJobs: number;
  isVerified: boolean;
  availability: 'available' | 'busy' | 'offline';
  hourlyRate: number;
  description: string;
  skills: string[];
}

export interface Service {
  id: string;
  workerId: string;
  title: string;
  description: string;
  category: string;
  price: number;
  duration: number; // in minutes
  images: string[];
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  createdAt: string;
}

export interface Booking {
  id: string;
  customerId: string;
  workerId: string;
  serviceId: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  scheduledAt: string;
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  bookingId: string;
  senderId: string;
  message: string;
  timestamp: string;
  type: 'text' | 'system';
}
