import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import request from 'supertest';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import { Booking } from '../src/modules/booking/booking.entity';
import { Listing } from '../src/modules/listings/listing.entity';
import { User } from '../src/modules/users/user.entity';
import { Vehicle } from '../src/modules/vehicles/vehicle.entity';

describe('Owner Pages (e2e)', () => {
  let app: INestApplication;
  let userRepo: Repository<User>;
  let listingRepo: Repository<Listing>;
  let vehicleRepo: Repository<Vehicle>;
  let bookingRepo: Repository<Booking>;

  let ownerId: string;
  let renterId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userRepo = moduleFixture.get(getRepositoryToken(User));
    listingRepo = moduleFixture.get(getRepositoryToken(Listing));
    vehicleRepo = moduleFixture.get(getRepositoryToken(Vehicle));
    bookingRepo = moduleFixture.get(getRepositoryToken(Booking));

    // Seed Data
    // 1. Create Users
    // use save(create) but cast result or pass object directly to save
    const owner = await userRepo.save({
      email: 'owner@test.com',
      firstName: 'Owner',
      lastName: 'One',
      passwordHash: 'hash',
      phoneNumber: '111',
    } as unknown as User);
    ownerId = owner.userId;

    const renter = await userRepo.save({
      email: 'renter@test.com',
      firstName: 'Renter',
      lastName: 'Two',
      passwordHash: 'hash',
      phoneNumber: '222',
    } as unknown as User);
    renterId = renter.userId;

    // 2. Create Listing
    const listing = await listingRepo.save({
      hostId: ownerId,
      title: 'Downtown Lot',
      addressLine1: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      hourlyRate: 10.00,
      spaceType: 'lot',
      location: { type: 'Point', coordinates: [0, 0] },
    } as unknown as Listing);

    // 3. Create Vehicle
    const vehicle = await vehicleRepo.save({
      ownerId: renterId,
      make: 'Tesla',
      model: 'Model 3',
      year: 2023,
      licensePlate: 'TESLA1',
    } as unknown as Vehicle);

    // 4. Create Bookings
    // Past Booking (Completed)
    await bookingRepo.save({
      spaceId: listing.spaceId,
      renterId: renterId,
      vehicleId: vehicle.vehicleId,
      startTime: new Date(Date.now() - 10000000),
      endTime: new Date(Date.now() - 9000000),
      status: 'completed',
      totalPrice: 20.00
    } as unknown as Booking);

    // Future Booking (Confirmed)
    await bookingRepo.save({
      spaceId: listing.spaceId,
      renterId: renterId,
      vehicleId: vehicle.vehicleId,
      startTime: new Date(Date.now() + 10000000),
      endTime: new Date(Date.now() + 20000000),
      status: 'confirmed',
      totalPrice: 30.00
    } as unknown as Booking);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/graphql (ownerDashboard)', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            ownerDashboard(ownerId: "${ownerId}") {
              totalEarningsAllTime
              spotsCurrentlyInUse
              bookingsNotStarted
              topActiveListings {
                listingName
                lifetimeEarnings
              }
            }
          }
        `,
      })
      .expect(200)
      .expect((res) => {
        // console.log(JSON.stringify(res.body, null, 2));
        const data = res.body.data.ownerDashboard;
        expect(data.totalEarningsAllTime).toBe(20);
        expect(data.bookingsNotStarted).toBe(1);
        expect(data.topActiveListings.length).toBeGreaterThan(0);
        expect(data.topActiveListings[0].listingName).toBe('Downtown Lot');
      });
  });

  it('/graphql (ownerBookings)', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            ownerBookings(ownerId: "${ownerId}") {
              bookingId
              carModelName
              bookingStatus
              bookingTotalPrice
            }
          }
        `,
      })
      .expect(200)
      .expect((res) => {
        const data = res.body.data.ownerBookings;
        expect(data.length).toBe(2);
        expect(data[0].carModelName).toBe('2023 Tesla Model 3');
      });
  });
});
