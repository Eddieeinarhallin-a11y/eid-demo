"use client";
import { useState } from "react";

export default function GenericAgeCheckDemo() {
  const [birthDate, setBirthDate] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const calculateAge = (dateString: string) => {
    if (!dateString) return null;
    const today = new Date();
    const birth = new Date(dateString);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const age = calculateAge(birthDate);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 p-4 text-zinc-900">
      <div className="mb-4 rounded-md bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
        UX-PROTOTYP / TESTLÄGE — EJ EN GILTIG LEGITIMATION
      </div>

      <div className="w-full max-w-sm rounded-2xl border border-zinc-300 bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-lg font-bold">Åldersberäkning (Demo)</h1>

        {!submitted ? (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-600">
                Välj testbild
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-xs text-zinc-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-600">
                Välj födelsedatum
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 p-2 text-sm"
              />
            </div>

            <button
              disabled={!birthDate}
              onClick={() => setSubmitted(true)}
              className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-medium text-white disabled:opacity-40"
            >
              Visa testresultat
            </button>
          </div>
        ) : (
          <div className="text-center">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Förhandsvisning"
                className="mx-auto mb-3 h-24 w-24 rounded-full object-cover border border-zinc-300"
              />
            )}
            <p className="text-sm text-zinc-600">Födelsedatum: {birthDate}</p>
            <p className="mt-1 text-xl font-bold">
              Beräknad ålder: {age !== null ? `${age} år` : "Ogiltigt datum"}
            </p>
            <p className="mt-2 text-xs font-medium text-emerald-700">
              {age !== null && age >= 18 ? "✓ Uppfyller 18-årsgräns (Demo)" : "✕ Under 18 år (Demo)"}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-5 text-xs text-zinc-500 underline"
            >
              Börja om
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
