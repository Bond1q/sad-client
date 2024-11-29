export interface Tariff {
  id: number;
  name: string;
  description?: string;
  internetSpeed: number;
  dataLimit: number;
  price: number;
  televisionOption?: Television;
}

export interface Television {
  id: number;
  packageType: string;
  description?: string;
  price: number;
}

export interface Subscription {
  id: number;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  user: User;
  tariff: Tariff;
}

export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: Address;
  subscriptions?: Subscription[];
  role: Role;
}

export interface Address {
  city: string;
  country: string;
  id: number;
  postalCode: string;
  streetName: string;
}
