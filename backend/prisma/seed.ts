import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function ensureLocation(city: string, address: string, zipCode: string) {
  const existing = await prisma.locations.findFirst({
    where: {
      city,
      address,
      zip_code: zipCode,
    },
  });

  if (existing) return existing;

  return prisma.locations.create({
    data: {
      city,
      address,
      zip_code: zipCode,
    },
  });
}

async function ensureProduct(data: {
  owner_id: number;
  category_id: number;
  location_id: number;
  title: string;
  description: string;
  price_per_day: string;
  available_from: Date;
  available_to: Date;
}) {
  const existing = await prisma.products.findFirst({
    where: {
      owner_id: data.owner_id,
      title: data.title,
    },
  });

  if (existing) return existing;

  return prisma.products.create({
    data,
  });
}

async function ensureRental(data: {
  product_id: number;
  renter_id: number;
  start_date: Date;
  end_date: Date;
  status: string;
}) {
  const existing = await prisma.rentals.findFirst({
    where: {
      product_id: data.product_id,
      renter_id: data.renter_id,
      start_date: data.start_date,
      end_date: data.end_date,
    },
  });

  if (existing) return existing;

  return prisma.rentals.create({
    data,
  });
}

async function main() {
  const adminRole = await prisma.roles.upsert({
    where: { role_name: 'Admin' },
    update: {},
    create: {
      role_name: 'Admin',
      description: 'System administrator',
    },
  });

  const clientRole = await prisma.roles.upsert({
    where: { role_name: 'Client' },
    update: {},
    create: {
      role_name: 'Client',
      description: 'Regular platform user',
    },
  });

  const toolsCategory = await prisma.categories.upsert({
    where: { name: 'Tools' },
    update: {},
    create: {
      name: 'Tools',
      description: 'Equipment and tools',
    },
  });

  const transportCategory = await prisma.categories.upsert({
    where: { name: 'Transport' },
    update: {},
    create: {
      name: 'Transport',
      description: 'Cars, bikes and scooters',
    },
  });

  const kyivLocation = await ensureLocation('Kyiv', 'Khreshchatyk 1', '01001');
  const lvivLocation = await ensureLocation('Lviv', 'Rynok Square 10', '79000');

  const adminUser = await prisma.users.upsert({
    where: { email: 'admin@shareit.local' },
    update: {},
    create: {
      role_id: adminRole.role_id,
      location_id: kyivLocation.location_id,
      first_name: 'System',
      last_name: 'Admin',
      email: 'admin@shareit.local',
      password_hash: 'seed_hash_admin',
    },
  });

  const ownerUser = await prisma.users.upsert({
    where: { email: 'owner@shareit.local' },
    update: {},
    create: {
      role_id: clientRole.role_id,
      location_id: lvivLocation.location_id,
      first_name: 'Olena',
      last_name: 'Owner',
      email: 'owner@shareit.local',
      password_hash: 'seed_hash_owner',
    },
  });

  const renterUser = await prisma.users.upsert({
    where: { email: 'renter@shareit.local' },
    update: {},
    create: {
      role_id: clientRole.role_id,
      location_id: kyivLocation.location_id,
      first_name: 'Roman',
      last_name: 'Renter',
      email: 'renter@shareit.local',
      password_hash: 'seed_hash_renter',
    },
  });

  const productA = await ensureProduct({
    owner_id: ownerUser.user_id,
    category_id: toolsCategory.category_id,
    location_id: lvivLocation.location_id,
    title: 'Electric Drill Bosch',
    description: 'Professional electric drill, great condition',
    price_per_day: '250.00',
    available_from: new Date('2026-03-01'),
    available_to: new Date('2026-12-31'),
  });

  const productB = await ensureProduct({
    owner_id: ownerUser.user_id,
    category_id: transportCategory.category_id,
    location_id: kyivLocation.location_id,
    title: 'City Bike Trek',
    description: 'Comfortable city bike for daily rides',
    price_per_day: '180.00',
    available_from: new Date('2026-03-01'),
    available_to: new Date('2026-10-31'),
  });

  await prisma.favorites.createMany({
    data: [
      { user_id: renterUser.user_id, product_id: productA.product_id },
      { user_id: adminUser.user_id, product_id: productB.product_id },
    ],
    skipDuplicates: true,
  });

  const rentalA = await ensureRental({
    product_id: productA.product_id,
    renter_id: renterUser.user_id,
    start_date: new Date('2026-03-10'),
    end_date: new Date('2026-03-14'),
    status: 'Completed',
  });

  const rentalB = await ensureRental({
    product_id: productB.product_id,
    renter_id: adminUser.user_id,
    start_date: new Date('2026-03-20'),
    end_date: new Date('2026-03-23'),
    status: 'Pending',
  });

  await prisma.reviews.upsert({
    where: { rental_id: rentalA.rental_id },
    update: {},
    create: {
      rental_id: rentalA.rental_id,
      reviewer_id: renterUser.user_id,
      rating: 5,
      comment: 'Great experience, recommended',
    },
  });

  await prisma.reviews.upsert({
    where: { rental_id: rentalB.rental_id },
    update: {},
    create: {
      rental_id: rentalB.rental_id,
      reviewer_id: adminUser.user_id,
      rating: 4,
      comment: 'Booking created successfully',
    },
  });

  const counts = await Promise.all([
    prisma.roles.count(),
    prisma.locations.count(),
    prisma.users.count(),
    prisma.categories.count(),
    prisma.products.count(),
    prisma.favorites.count(),
    prisma.rentals.count(),
    prisma.reviews.count(),
  ]);

  console.log('Seed completed');
  console.log({
    roles: counts[0],
    locations: counts[1],
    users: counts[2],
    categories: counts[3],
    products: counts[4],
    favorites: counts[5],
    rentals: counts[6],
    reviews: counts[7],
  });
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
