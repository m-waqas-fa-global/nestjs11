### What is an Enum?

An Enum (short for Enumeration) is a way to define a set of named constants.
Best for: Roles, status codes, days of the week, or configurations

// Definition
export enum OrderStatus {
  PENDING = 'PENDING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
}

// Usage
const currentStatus = OrderStatus.PENDING; 


###  What is an Interface?

An Interface is a virtual blueprint that defines the shape, structure, and data types of an object.

// Definition
export interface User {
  id: number;
  username: string;
  email: string;
  isActive: boolean;
  phoneNumber?: string; // Optional property
}

// Usage
const newUser: User = {
  id: 1,
  username: 'john_doe',
  email: 'john@example.com',
  isActive: true,
};

