import clientPromise from '@/lib/mongodb';
import AddCarsFilter from './AddCarsFilter';
import AddCarPage from './AddCar';

// Server-side fetching (SSR) using a server component
export default async function CarsPage() {
  const client = await clientPromise;
  const db = client.db('carDatabase');
  const cars = await db.collection('cars').find({}).toArray();

  return (
    <div>
      <h1>Cars Page</h1>
      {/* Pass the fetched cars data to a client component */}
      <AddCarsFilter initialCars={cars} />
      <AddCarPage />
    </div>
  );
}