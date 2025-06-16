import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export default function App() {
  const [cvFile, setCvFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cvFile || !jobDescription) {
      alert("Please provide both CV and job description.");
      return;
    }

    const formData = new FormData();
    formData.append("cv_file", cvFile);
    formData.append("job_description", jobDescription);

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/generate/", formData);
      setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
    setLoading(false);
  };

  const generateDocx = async (content, filename) => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: content.split("\n").map(line => new Paragraph({ children: [new TextRun(line)] })),
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, filename);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-[#1F2937] p-10 rounded-3xl shadow-2xl border border-[#334155]">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-[#F1F5F9] tracking-tight">
          AI Resume Generator
        </h1>

        {loading && (
          <div className="w-full mb-6">
            <div className="relative w-full h-2 rounded-full bg-[#334155] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-loading-bar"></div>
            </div>
            <p className="mt-2 text-sm text-[#F1F5F9] text-center">Generating your CV & Cover Letter...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-[#F1F5F9] mb-2">Upload your CV (.pdf / .docx)</label>
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={(e) => setCvFile(e.target.files[0])}
              className="w-full border border-[#475569] bg-[#334155] text-[#F1F5F9] p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium text-[#F1F5F9] mb-2">Paste Job Description</label>
            <textarea
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              className="w-full border border-[#475569] bg-[#334155] text-[#F1F5F9] p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:brightness-110 transition"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>

        {result && (
          <>
            <div className="flex justify-end gap-4 mt-10">
              <button
                onClick={() => generateDocx(result.tailored_cv, "Tailored_CV.docx")}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:brightness-110 transition"
              >
                Download CV
              </button>
              <button
                onClick={() => generateDocx(result.cover_letter, "Cover_Letter.docx")}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:brightness-110 transition"
              >
                Download Cover Letter
              </button>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-[#F1F5F9]">Tailored CV</h2>
                <div className="bg-[#334155] p-6 rounded-xl border border-[#475569] prose prose-invert max-w-none">
                  <ReactMarkdown>{result.tailored_cv}</ReactMarkdown>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-[#F1F5F9]">Cover Letter</h2>
                <div className="bg-[#334155] p-6 rounded-xl border border-[#475569] prose prose-invert max-w-none">
                  <ReactMarkdown>{result.cover_letter}</ReactMarkdown>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
