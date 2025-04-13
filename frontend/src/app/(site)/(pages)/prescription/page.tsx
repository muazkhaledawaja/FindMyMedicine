'use client';

import { useState } from 'react';
import Tesseract from 'tesseract.js';
import { useRouter } from 'next/navigation';

export default function OCRComponent() {
  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleScan = () => {
    if (!image) return;

    setLoading(true);
    Tesseract.recognize(image, 'eng', {
      logger: m => console.log(m),
    })
      .then(({ data: { text } }) => {
        setText(text);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleFindPharmacy = () => {
    if (!text.trim()) return;

    const query = encodeURIComponent(text.trim().replace(/\n+/g, ', '));
    router.push(`/pharmacies?drug=${query}`);
  };

  return (
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-xl font-bold mb-4">Scan Prescription (OCR)</h2>

      <input
        type="file"
        accept="image/*"
        onChange={e => setImage(e.target.files?.[0] || null)}
        className="mb-4"
      />

      {image && <img src={URL.createObjectURL(image)} alt="preview" className="mx-auto mb-4 max-h-64" />}

      <button
        onClick={handleScan}
        disabled={!image || loading}
        className="bg-orange text-white py-2 px-6 rounded mb-6 hover:bg-orange-dark active:bg-orange-600 disabled:opacity-50"
      >
        {loading ? 'Scanning...' : 'Scan Prescription'}
      </button>

      <div className="text-left bg-white p-4 rounded shadow mb-6">
        <strong>Detected Text:</strong>
        <p className="mt-2 whitespace-pre-wrap">{text || 'No text detected.'}</p>
      </div>

      <button
        onClick={handleFindPharmacy}
        disabled={!text.trim()}
        className="bg-orange text-white py-2 px-6 rounded hover:bg-orange-dark active:bg-orange-600 disabled:opacity-40"
      >
        Find Pharmacies
      </button>
    </div>
  );
}
