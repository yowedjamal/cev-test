import React, { useState } from 'react';
import { validateData, generateCev } from './services/api';
import { 
  DEFAULT_VALIDATION_PAYLOAD, 
  DEFAULT_GENERATION_PAYLOAD 
} from './constants';
import { StatusBadge } from './components/StatusBadge';
import { JsonPreview } from './components/JsonPreview';
import { GenerationResponseData } from './types';

// Icons
const CheckCircleIcon = () => (
  <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AlertCircleIcon = () => (
  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const App: React.FC = () => {
  // --- Validation State ---
  const [valStatus, setValStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [valMessage, setValMessage] = useState<string>('');
  const [valErrors, setValErrors] = useState<string[]>([]);

  // --- Generation State ---
  const [genStatus, setGenStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [genMessage, setGenMessage] = useState<string>('');
  const [genImage, setGenImage] = useState<string | null>(null);

  const handleValidation = async () => {
    setValStatus('loading');
    setValMessage('');
    setValErrors([]);

    const response = await validateData(DEFAULT_VALIDATION_PAYLOAD);

    if (response.success) {
      setValStatus('success');
      setValMessage(response.message);
    } else {
      setValStatus('error');
      setValMessage(response.message);
      if (Array.isArray(response.data)) {
        setValErrors(response.data);
      }
    }
  };

  const handleGeneration = async () => {
    setGenStatus('loading');
    setGenMessage('');
    setGenImage(null);

    const response = await generateCev(DEFAULT_GENERATION_PAYLOAD);

    if (response.success) {
      // Type guard to ensure data has 'cev'
      const data = response.data as GenerationResponseData;
      if (data && data.cev) {
        setGenStatus('success');
        setGenMessage(response.message || 'CEV Created Successfully');
        setGenImage(data.cev);
      } else {
        setGenStatus('error');
        setGenMessage('Success reported but no image data found.');
      }
    } else {
      setGenStatus('error');
      setGenMessage(response.message || 'Unknown error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            VDS Dashboard
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Identity Validation & Secure Token Generation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Step 1: Validation Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 bg-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">1. Payload Validation</h2>
                <p className="text-sm text-slate-500 mt-1">Validate personnel identity format</p>
              </div>
              <StatusBadge status={valStatus} />
            </div>
            
            <div className="p-6 flex-grow">
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Sends the personnel data structure to the verification endpoint to ensure all required fields are present and correctly formatted.
              </p>

              {/* Action Button */}
              <button
                onClick={handleValidation}
                disabled={valStatus === 'loading'}
                className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-200
                  ${valStatus === 'loading' 
                    ? 'bg-indigo-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 active:transform active:scale-[0.98]'}`}
              >
                {valStatus === 'loading' ? 'Validating...' : 'Run Validation'}
                {valStatus !== 'loading' && <ArrowRightIcon />}
              </button>

              <JsonPreview data={DEFAULT_VALIDATION_PAYLOAD} title="View Payload JSON" />

              {/* Result Area */}
              {(valStatus === 'success' || valStatus === 'error') && (
                <div className={`mt-6 p-4 rounded-lg border ${valStatus === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-start">
                    {valStatus === 'success' ? (
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                       <div className="flex-shrink-0">
                        <AlertCircleIcon />
                      </div>
                    )}
                    <div className="ml-3">
                      <h3 className={`text-sm font-medium ${valStatus === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                        {valMessage}
                      </h3>
                      {valErrors.length > 0 && (
                        <div className={`mt-2 text-sm ${valStatus === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                          <ul className="list-disc pl-5 space-y-1">
                            {valErrors.map((err, idx) => (
                              <li key={idx}>{err}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Step 2: Generation Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col">
             <div className="p-6 border-b border-slate-100 bg-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">2. VDS Generation</h2>
                <p className="text-sm text-slate-500 mt-1">Create secured digital asset</p>
              </div>
              <StatusBadge status={genStatus} />
            </div>

            <div className="p-6 flex-grow">
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Generates a CEV (Visible Digital Seal) for the validated owner and device. Requires secure bearer token authentication.
              </p>

               {/* Action Button */}
               <button
                onClick={handleGeneration}
                disabled={genStatus === 'loading'}
                className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-200
                  ${genStatus === 'loading' 
                    ? 'bg-sky-400 cursor-not-allowed' 
                    : 'bg-sky-600 hover:bg-sky-700 active:transform active:scale-[0.98]'}`}
              >
                {genStatus === 'loading' ? 'Generating...' : 'Generate VDS'}
                {genStatus !== 'loading' && <ArrowRightIcon />}
              </button>

              <JsonPreview data={DEFAULT_GENERATION_PAYLOAD} title="View Payload JSON" />

               {/* Result Area */}
               {(genStatus === 'success' || genStatus === 'error') && (
                <div className={`mt-6 p-4 rounded-lg border ${genStatus === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                   {genStatus === 'error' && (
                    <div className="flex items-center">
                       <AlertCircleIcon />
                       <span className="ml-2 text-sm font-medium text-red-800">{genMessage}</span>
                    </div>
                   )}

                   {genStatus === 'success' && (
                     <div className="flex flex-col items-center justify-center text-center space-y-4">
                        <div className="flex items-center space-x-2 text-green-700">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                          <span className="font-medium">{genMessage}</span>
                        </div>
                        
                        {genImage && (
                          <div className="bg-white p-4 rounded-xl shadow-inner border border-slate-200 mt-4">
                            <img 
                              src={genImage} 
                              alt="Generated CEV" 
                              className="max-w-[200px] h-auto mx-auto" 
                            />
                            <p className="text-xs text-slate-400 mt-2 font-mono break-all">
                              Base64 Output
                            </p>
                          </div>
                        )}
                     </div>
                   )}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Download Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row items-