import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
}

interface Booking {
  id: string;
  userId: string;
  scheduledTime: Date;
  status: 'scheduled' | 'active' | 'completed';
}

interface RoomStatus {
  isOpen: boolean;
  nextAvailableTime: Date | null;
}

interface AppState {
  user: User | null;
  booking: Booking | null;
  roomStatus: RoomStatus;
  setUser: (user: User | null) => void;
  setBooking: (booking: Booking | null) => void;
  setRoomStatus: (status: RoomStatus) => void;
  logout: () => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  booking: null,
  roomStatus: {
    isOpen: true,
    nextAvailableTime: null,
  },
  setUser: (user) => set({ user }),
  setBooking: (booking) => set({ booking }),
  setRoomStatus: (roomStatus) => set({ roomStatus }),
  logout: () => set({ user: null, booking: null }),
}));
