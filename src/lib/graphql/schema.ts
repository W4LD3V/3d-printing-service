import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    role: Role!
    orders: [Order!]!
    createdAt: String!
    updatedAt: String!
  }

  type Order {
    id: ID!
    userId: String!
    modelUrl: String!
    plasticId: String!
    colorId: String!
    status: OrderStatus!
    totalPrice: Float!
    user: User!
    plastic: Plastic!
    color: Color!
    createdAt: String!
    updatedAt: String!
  }

  type Plastic {
    id: ID!
    name: String!
    price: Float!
    description: String
    orders: [Order!]!
    createdAt: String!
    updatedAt: String!
  }

  type Color {
    id: ID!
    name: String!
    hexCode: String!
    orders: [Order!]!
    createdAt: String!
    updatedAt: String!
  }

  enum Role {
    USER
    ADMIN
  }

  enum OrderStatus {
    PENDING
    PROCESSING
    COMPLETED
    CANCELLED
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    orders: [Order!]!
    order(id: ID!): Order
    userOrders(userId: ID!): [Order!]!
    plastics: [Plastic!]!
    plastic(id: ID!): Plastic
    colors: [Color!]!
    color(id: ID!): Color
  }

  type Mutation {
    createUser(email: String!, name: String, password: String!): User!
    updateUser(id: ID!, email: String, name: String): User!
    deleteUser(id: ID!): Boolean!

    createOrder(
      userId: ID!
      modelUrl: String!
      plasticId: ID!
      colorId: ID!
    ): Order!
    updateOrder(id: ID!, status: OrderStatus): Order!
    deleteOrder(id: ID!): Boolean!

    createPlastic(name: String!, price: Float!, description: String): Plastic!
    updatePlastic(
      id: ID!
      name: String
      price: Float
      description: String
    ): Plastic!
    deletePlastic(id: ID!): Boolean!

    createColor(name: String!, hexCode: String!): Color!
    updateColor(id: ID!, name: String, hexCode: String): Color!
    deleteColor(id: ID!): Boolean!
  }
`;
