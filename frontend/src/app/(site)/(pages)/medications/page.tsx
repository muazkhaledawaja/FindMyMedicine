import Breadcrumb from "@/components/Common/Breadcrumb";
import React from "react";

const medications = [
  {
    name: "Paracetamol",
    dosage: "500mg",
    schedule: "Every 6 hours",
    time: "08:00 AM",
  },
  {
    name: "Metformin",
    dosage: "850mg",
    schedule: "Once daily",
    time: "09:00 AM",
  },
  {
    name: "Amoxicillin",
    dosage: "250mg",
    schedule: "Every 8 hours",
    time: "07:00 AM",
  },
  {
    name: "Ibuprofen",
    dosage: "400mg",
    schedule: "Twice daily",
    time: "12:00 PM",
  },
  {
    name: "Loratadine",
    dosage: "10mg",
    schedule: "Once daily",
    time: "10:00 AM",
  },
  {
    name: "Omeprazole",
    dosage: "20mg",
    schedule: "Before breakfast",
    time: "07:30 AM",
  },
  {
    name: "Vitamin D",
    dosage: "1000 IU",
    schedule: "Once every 2 days",
    time: "06:00 PM",
  },
  {
    name: "Azithromycin",
    dosage: "500mg",
    schedule: "Once daily for 3 days",
    time: "11:00 AM",
  },
];


export default function MedicationManagement() {
  return (
    <main>
      <Breadcrumb title={"Medications Details"} pages={["Medications details"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-dark text-2xl">Your Medications</h2>
            <button className="text-orange-600 hover:underline">Clear All</button>
          </div>
  
          <div className="bg-white rounded-[10px] shadow">
            <div className="w-full overflow-x-auto">
              <div className="min-w-[1170px]">
                {/* Header */}
                <div className="flex items-center py-6 px-10 bg-gray-50 border-b">
                  <div className="min-w-[300px]">
                    <p className="text-dark font-medium">Medication</p>
                  </div>
                  <div className="min-w-[200px]">
                    <p className="text-dark font-medium">Dosage</p>
                  </div>
                  <div className="min-w-[300px]">
                    <p className="text-dark font-medium">Schedule</p>
                  </div>
                  <div className="min-w-[150px] text-right">
                    <p className="text-dark font-medium">Action</p>
                  </div>
                </div>
  
                {/* Items */}
                {medications.map((med, idx) => (
                  <div
                    key={idx}
                    className="flex items-center border-t border-gray-3 py-5 px-10"
                  >
                    <div className="min-w-[300px]">
                      <p className="text-dark">{med.name}</p>
                    </div>
                    <div className="min-w-[200px]">
                      <p>{med.dosage}</p>
                    </div>
                    <div className="min-w-[300px]">
                      <p>{med.schedule} at {med.time}</p>
                    </div>
                    <div className="min-w-[150px] text-right">
                      <button className="text-red-500 hover:underline">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
