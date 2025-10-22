import mongoose from 'mongoose';

const seedData = {
  roles: [
    { _id: 1, name: 'Super Admin', description: 'System owner who manages all tenants, admins, and system-level settings.', department: 'System' },
    { _id: 2, name: 'Admin', description: 'Manages properties, agents, and clients for their company.', department: 'Operations' },
    { _id: 3, name: 'Agent', description: 'Handles client listings, property management, and leads.', department: 'Sales' }
  ],

  policies: [
    { _id: 1, name: 'Manage Admins', description: 'Create, edit, or deactivate admins.', department: 'System' },
    { _id: 2, name: 'Manage Plans', description: 'Add or modify subscription plans.', department: 'Billing' },
    { _id: 3, name: 'Manage Features', description: 'Add or modify plan features.', department: 'Billing' },
    { _id: 4, name: 'Manage Properties', description: 'Create, update, or delete properties.', department: 'Operations' },
    { _id: 5, name: 'Manage Agents', description: 'Create and manage agent accounts.', department: 'Operations' },
    { _id: 6, name: 'View Reports', description: 'Access company-level analytics and reports.', department: 'Analytics' },
    { _id: 7, name: 'Manage Clients', description: 'Manage clients and inquiries.', department: 'Sales' },
    { _id: 8, name: 'Assign Plans', description: 'Assign plans or features to agents.', department: 'Billing' }
  ],

  rolePolicies: [
    { roleId: 1, policyId: 1, notes: 'Full access' },
    { roleId: 1, policyId: 2, notes: 'Full access' },
    { roleId: 1, policyId: 3, notes: 'Full access' },
    { roleId: 1, policyId: 4, notes: 'Full access' },
    { roleId: 1, policyId: 5, notes: 'Full access' },
    { roleId: 1, policyId: 6, notes: 'Full access' },
    { roleId: 1, policyId: 7, notes: 'Full access' },
    { roleId: 1, policyId: 8, notes: 'Full access' },
    { roleId: 2, policyId: 4, notes: 'Can manage agents, clients, and plans' },
    { roleId: 2, policyId: 5, notes: 'Can manage agents, clients, and plans' },
    { roleId: 2, policyId: 6, notes: 'Can manage agents, clients, and plans' },
    { roleId: 2, policyId: 7, notes: 'Can manage agents, clients, and plans' },
    { roleId: 2, policyId: 8, notes: 'Can manage agents, clients, and plans' },
    { roleId: 3, policyId: 4, notes: 'Can manage properties and clients' },
    { roleId: 3, policyId: 7, notes: 'Can manage properties and clients' }
  ],

  plans: [
    { _id: 1, name: 'Starter', description: 'Basic access for individual agents.', price: 1000, currency: 'USD', durationInDays: 30 },
    { _id: 2, name: 'Professional', description: 'Includes premium features and analytics.', price: 2500, currency: 'USD', durationInDays: 30 },
    { _id: 3, name: 'Enterprise', description: 'For large agencies with team management.', price: 5000, currency: 'USD', durationInDays: 90 }
  ],

  features: [
    { _id: 1, name: 'Property Listings', description: 'Number of properties an agent can list.', isCore: false, hasQuantity: true },
    { _id: 2, name: 'Lead Management', description: 'Access to CRM-style client tracking.', isCore: true, hasQuantity: false },
    { _id: 3, name: 'Featured Property', description: 'Number of featured listings allowed.', isCore: false, hasQuantity: true },
    { _id: 4, name: 'Analytics Dashboard', description: 'View property and client analytics.', isCore: false, hasQuantity: false },
    { _id: 5, name: 'Team Members', description: 'Number of sub-agents under an admin.', isCore: false, hasQuantity: true }
  ],

  planFeatures: [
    { planId: 1, featureId: 1, quantity: 10 },
    { planId: 1, featureId: 2, quantity: null },
    { planId: 2, featureId: 1, quantity: 50 },
    { planId: 2, featureId: 3, quantity: 5 },
    { planId: 2, featureId: 4, quantity: null },
    { planId: 3, featureId: 1, quantity: 200 },
    { planId: 3, featureId: 3, quantity: 20 },
    { planId: 3, featureId: 4, quantity: null },
    { planId: 3, featureId: 5, quantity: 10 }
  ]
};

export default seedData;
