import React, { useContext, useState } from "react";
import { FormContext } from "../context/FormContext";
import { aiGenerate } from "../services/aiService"; 

export default function AITextPopup({ field, setAiField }) {
  const { formData, setFormData } = useContext(FormContext);
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await aiGenerate(
        formData[field] || "Write a short, professional version of my text."
      );
      setSuggestion(response);
    } catch (err) {
      console.error(err);
      setError("⚠️ Error generating suggestion. Try again.");
    }
    setLoading(false);
  };

  const handleAccept = () => {
    setFormData({ ...formData, [field]: suggestion });
    setAiField(null);
  };

  const handleDiscard = () => {
    setAiField(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h3 className="font-semibold text-lg mb-2">AI Suggestion</h3>

        {loading ? (
          <p className="text-gray-500">⏳ Generating...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <textarea
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            rows="5"
            className="border p-2 rounded w-full mb-4"
            placeholder="Generated text will appear here..."
          />
        )}

        <div className="flex justify-end gap-2">
          {!loading && (
            <>
              <button
                onClick={handleDiscard}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                Discard
              </button>
              {!suggestion && (
                <button
                  onClick={handleGenerate}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Generate
                </button>
              )}
              {suggestion && (
                <button
                  onClick={handleAccept}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Accept
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
