'use client'

import Image from "next/image";
import { useState } from "react";

const drug = {
  name: "Paracetamol",
  description:
    "Paracetamol is a common pain reliever used to treat mild to moderate pain and reduce fever.",
  price: "₪15",
  usage: "Take one tablet every 6 hours after meals.",
  sideEffects: ["Nausea", "Liver damage with overdose", "Rash"],
  manufacturer: "PharmaCorp",
  image: "/images/products/panadol-extra-bg-1.jpg",
};

export default function DrugDetails() {
  const [tab, setTab] = useState<"desc" | "info" | "reviews">("desc");

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="bg-white p-6 rounded shadow flex items-center justify-center">
          <Image
            src={drug.image}
            alt={drug.name}
            width={300}
            height={300}
            className="rounded"
          />
        </div>

        {/* Info */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{drug.name}</h2>
          <p className="text-gray-500 mb-4">{drug.usage}</p>
          <div className="text-xl text-orange-600 font-semibold mb-4">
            Price: {drug.price}
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setTab("desc")}
              className={`border-b-2 pb-1 ${
                tab === "desc" ? "border-orange-600 text-orange-600" : "border-transparent"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setTab("info")}
              className={`border-b-2 pb-1 ${
                tab === "info" ? "border-orange-600 text-orange-600" : "border-transparent"
              }`}
            >
              Info
            </button>
            <button
              onClick={() => setTab("reviews")}
              className={`border-b-2 pb-1 ${
                tab === "reviews" ? "border-orange-600 text-orange-600" : "border-transparent"
              }`}
            >
              Reviews
            </button>
          </div>

          {/* Tabs */}
          {tab === "desc" && <p className="text-gray-700">{drug.description}</p>}
          {tab === "info" && (
            <ul className="text-gray-700 space-y-2">
              <li>
                <strong>Manufacturer:</strong> {drug.manufacturer}
              </li>
              <li>
                <strong>Usage:</strong> {drug.usage}
              </li>
              <li>
                <strong>Side Effects:</strong> {drug.sideEffects.join(", ")}
              </li>
            </ul>
          )}
          {tab === "reviews" && (
            <p className="text-gray-500 italic">No reviews available yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
