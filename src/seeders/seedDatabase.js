import seedData from './initialData.js';
import {
  Role,
  Policy,
  RolePolicy,
  Plan,
  Feature,
  PlanFeature
} from '../models/index.js';

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Seed Roles
    console.log('   Checking Roles...');
    for (const roleData of seedData.roles) {
      const exists = await Role.findOne({ _id: roleData._id });
      if (!exists) {
        await Role.create(roleData);
        console.log(`   ✓ Created role: ${roleData.name}`);
      }
    }

    // Seed Policies
    console.log('   Checking Policies...');
    for (const policyData of seedData.policies) {
      const exists = await Policy.findOne({ _id: policyData._id });
      if (!exists) {
        await Policy.create(policyData);
        console.log(`   ✓ Created policy: ${policyData.name}`);
      }
    }

    // Seed RolePolicies
    console.log('   Checking RolePolicies...');
    for (const rpData of seedData.rolePolicies) {
      const exists = await RolePolicy.findOne({
        roleId: rpData.roleId,
        policyId: rpData.policyId
      });
      if (!exists) {
        await RolePolicy.create(rpData);
        console.log(`   ✓ Created RolePolicy: Role ${rpData.roleId} - Policy ${rpData.policyId}`);
      }
    }

    // Seed Plans
    console.log('   Checking Plans...');
    for (const planData of seedData.plans) {
      const exists = await Plan.findOne({ _id: planData._id });
      if (!exists) {
        await Plan.create(planData);
        console.log(`   ✓ Created plan: ${planData.name}`);
      }
    }

    // Seed Features
    console.log('   Checking Features...');
    for (const featureData of seedData.features) {
      const exists = await Feature.findOne({ _id: featureData._id });
      if (!exists) {
        await Feature.create(featureData);
        console.log(`   ✓ Created feature: ${featureData.name}`);
      }
    }

    // Seed PlanFeatures
    console.log('   Checking PlanFeatures...');
    for (const pfData of seedData.planFeatures) {
      const exists = await PlanFeature.findOne({
        planId: pfData.planId,
        featureId: pfData.featureId
      });
      if (!exists) {
        await PlanFeature.create(pfData);
        console.log(`   ✓ Created PlanFeature: Plan ${pfData.planId} - Feature ${pfData.featureId}`);
      }
    }

    console.log('✅ Database seeding completed successfully!\n');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

export default seedDatabase;
