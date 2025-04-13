'use client';

import { useSearchParams } from 'next/navigation';

const MOCK_PHARMACIES = [
  {
    name: 'Al Shifa Pharmacy',
    location: 'Gaza City – Al Remal',
    availableDrugs: ['Panadol Extra', 'Paracetamol', 'Ibuprofen', 'Amoxicillin'],
  },
  {
    name: 'Al Rawda Pharmacy',
    location: 'Gaza – Al Nasser Street',
    availableDrugs: ['Augmentin', 'Panadol Night', 'Cough Syrup', 'Vitamin C'],
  },
  {
    name: 'Hayat Pharmacy',
    location: 'Khan Younis – Main Road',
    availableDrugs: ['Paracetamol', 'Vitamin D', 'Omeprazole', 'Ibuprofen'],
  },
];

export default function PharmaciesPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('drug') || '';
  const requestedDrugs = query.split(',').map(d => d.trim().toLowerCase());

  const matchedPharmacies = MOCK_PHARMACIES.filter(pharmacy =>
    requestedDrugs.some(drug =>
      pharmacy.availableDrugs.some(d => d.toLowerCase().includes(drug))
    )
  );

  return (
    <main className="max-w-2xl mx-auto py-20 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Nearby Pharmacies</h1>

      {matchedPharmacies.length > 0 ? (
        matchedPharmacies.map((pharmacy, index) => (
          <div key={index} className="bg-white shadow rounded p-4 mb-5">
            <h2 className="text-lg font-semibold">{pharmacy.name}</h2>
            <p className="text-gray-600">{pharmacy.location}</p>
            <p className="mt-2 text-sm text-green-700">
              Available: {pharmacy.availableDrugs.join(', ')}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-red-500">No matching pharmacies found.</p>
      )}
    </main>
  );
}
