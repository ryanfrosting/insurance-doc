import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { InsuranceCardData, SheetViewMode, EightSquarePattern } from './types';
import { PRESET_EXACT_CLONE } from './data/presets';
import { SheetLayout } from './components/SheetLayout';
import { InsuranceDocClone } from './components/InsuranceDocClone';
import { FormControls } from './components/FormControls';
import { EmailModal } from './components/EmailModal';
import { sanitizeClonedDocForHtml2Canvas } from './utils/html2canvasSanitizer';
import { 
  Download, 
  Mail, 
  Printer, 
  ShieldCheck, 
  LayoutGrid, 
  Layers, 
  CreditCard, 
  CheckCircle2, 
  FileDown, 
  Info,
  Copy,
  Grid,
  FileText
} from 'lucide-react';

export default function App() {
  const [data, setData] = useState<InsuranceCardData>(PRESET_EXACT_CLONE);
  // Default to td-temporary (1-for-1 Clone) as requested by user
  const [viewMode, setViewMode] = useState<SheetViewMode>('td-temporary');
  const [tdPage, setTdPage] = useState<1 | 2>(1);
  const [eightSquarePattern, setEightSquarePattern] = useState<EightSquarePattern>('standard');
  const [customCardTypes, setCustomCardTypes] = useState<('front' | 'back')[]>([
    'front', 'front',
    'back', 'back',
    'front', 'front',
    'back', 'back',
  ]);
  const [showWatermark, setShowWatermark] = useState<boolean>(false);
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(0.20);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isBlank, setIsBlank] = useState<boolean>(false);

  const sheetRef = useRef<HTMLDivElement>(null);
  const hiddenTdPage1Ref = useRef<HTMLDivElement>(null);
  const hiddenTdPage2Ref = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleCardType = (index: number) => {
    setCustomCardTypes((prev) => {
      const next = [...prev];
      next[index] = next[index] === 'front' ? 'back' : 'front';
      return next;
    });
  };

  const handlePatternChange = (pattern: EightSquarePattern) => {
    setEightSquarePattern(pattern);
    if (pattern === 'standard') {
      setCustomCardTypes(['front', 'front', 'back', 'back', 'front', 'front', 'back', 'back']);
    } else if (pattern === 'all-front') {
      setCustomCardTypes(['front', 'front', 'front', 'front', 'front', 'front', 'front', 'front']);
    } else if (pattern === 'all-back') {
      setCustomCardTypes(['back', 'back', 'back', 'back', 'back', 'back', 'back', 'back']);
    } else if (pattern === 'alternating') {
      setCustomCardTypes(['front', 'back', 'front', 'back', 'front', 'back', 'front', 'back']);
    }
  };

  const handleDownloadPdf = async () => {
    setIsGenerating(true);
    try {
      if (viewMode === 'td-temporary') {
        const p1Element = hiddenTdPage1Ref.current || (tdPage === 1 ? sheetRef.current : null);
        const p2Element = hiddenTdPage2Ref.current || (tdPage === 2 ? sheetRef.current : null);

        if (!p1Element) {
          throw new Error('Could not find Page 1 element');
        }

        const canvas1 = await html2canvas(p1Element, {
          scale: 2.5,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
          onclone: (clonedDoc) => {
            sanitizeClonedDocForHtml2Canvas(clonedDoc);
          },
        });

        const imgData1 = canvas1.toDataURL('image/png', 1.0);

        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'letter',
        });

        const pdfWidth = 215.9;
        const pdfHeight = 279.4;

        pdf.addImage(imgData1, 'PNG', 0, 0, pdfWidth, pdfHeight);

        if (p2Element) {
          const canvas2 = await html2canvas(p2Element, {
            scale: 2.5,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false,
            onclone: (clonedDoc) => {
              sanitizeClonedDocForHtml2Canvas(clonedDoc);
            },
          });
          const imgData2 = canvas2.toDataURL('image/png', 1.0);
          pdf.addPage();
          pdf.addImage(imgData2, 'PNG', 0, 0, pdfWidth, pdfHeight);
        }

        pdf.save(`Temporary Automobile Liability Insurance Card_${data.policyNumber || '00157475039'}.pdf`);
        showToast('Official 2-Page Temporary Insurance Certificate PDF downloaded!');
      } else if (viewMode === 'single-card') {
        if (!sheetRef.current) return;
        const canvas = await html2canvas(sheetRef.current, {
          scale: 2.5,
          useCORS: true,
          backgroundColor: '#fcecee',
          logging: false,
          onclone: (clonedDoc) => {
            sanitizeClonedDocForHtml2Canvas(clonedDoc);
          },
        });

        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: [85, 54],
          compress: true,
        });
        pdf.addImage(imgData, 'JPEG', 0, 0, 85, 54);
        pdf.save(`Canada_Pink_Slip_${data.policyNumber || 'Blank'}.pdf`);
        showToast('Single Card PDF downloaded!');
      } else {
        if (!sheetRef.current) return;
        const canvas = await html2canvas(sheetRef.current, {
          scale: 2.0,
          useCORS: true,
          backgroundColor: '#fcecee',
          logging: false,
          onclone: (clonedDoc) => {
            sanitizeClonedDocForHtml2Canvas(clonedDoc);
          },
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.9);
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'letter',
          compress: true,
        });
        const pdfWidth = 215.9;
        const margin = 8;
        const renderWidth = pdfWidth - margin * 2;
        const renderHeight = (canvas.height * renderWidth) / canvas.width;
        
        const maxHeight = 279.4 - 16;
        let finalWidth = renderWidth;
        let finalHeight = renderHeight;
        let finalMarginLeft = margin;

        if (renderHeight > maxHeight) {
          finalHeight = maxHeight;
          finalWidth = (canvas.width * finalHeight) / canvas.height;
          finalMarginLeft = (pdfWidth - finalWidth) / 2;
        }

        let filename = `Canada_Auto_Insurance_Sheet_${data.policyNumber || 'Blank'}.pdf`;
        if (viewMode === 'eight-squares') {
          filename = `Canada_Auto_Insurance_8_Cards_${data.policyNumber || 'Blank'}.pdf`;
        } else if (viewMode === 'four-squares') {
          filename = `Canada_Auto_Insurance_4_Cards_${data.policyNumber || 'Blank'}.pdf`;
        } else if (viewMode === 'front-back') {
          filename = `Canada_Auto_Insurance_FrontBack_${data.policyNumber || 'Blank'}.pdf`;
        }

        pdf.addImage(imgData, 'JPEG', finalMarginLeft, 8, finalWidth, finalHeight);
        pdf.save(filename);
        showToast('Sheet PDF successfully downloaded!');
      }
    } catch (error) {
      console.error('PDF generation failed:', error);
      showToast('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePdfBase64 = async (): Promise<string | null> => {
    try {
      if (viewMode === 'td-temporary') {
        const p1Element = hiddenTdPage1Ref.current || (tdPage === 1 ? sheetRef.current : null);
        const p2Element = hiddenTdPage2Ref.current || (tdPage === 2 ? sheetRef.current : null);

        if (!p1Element) return null;

        const canvas1 = await html2canvas(p1Element, {
          scale: 1.8,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
          onclone: (clonedDoc) => {
            sanitizeClonedDocForHtml2Canvas(clonedDoc);
          },
        });

        const imgData1 = canvas1.toDataURL('image/jpeg', 0.88);
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'letter',
          compress: true,
        });

        const pdfWidth = 215.9;
        const pdfHeight = 279.4;
        pdf.addImage(imgData1, 'JPEG', 0, 0, pdfWidth, pdfHeight);

        if (p2Element) {
          const canvas2 = await html2canvas(p2Element, {
            scale: 1.8,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false,
            onclone: (clonedDoc) => {
              sanitizeClonedDocForHtml2Canvas(clonedDoc);
            },
          });
          const imgData2 = canvas2.toDataURL('image/jpeg', 0.88);
          pdf.addPage();
          pdf.addImage(imgData2, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        }

        return pdf.output('datauristring');
      }

      if (!sheetRef.current) return null;
      const canvas = await html2canvas(sheetRef.current, {
        scale: 1.8,
        useCORS: true,
        backgroundColor: '#fcecee',
        logging: false,
        onclone: (clonedDoc) => {
          sanitizeClonedDocForHtml2Canvas(clonedDoc);
        },
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.88);
      
      let orientation = 'portrait';
      let format: string | number[] = 'letter';
      if (viewMode === 'single-card') {
        orientation = 'landscape';
        format = [85, 54];
      }
      
      const pdf = new jsPDF({
        orientation: orientation as any,
        unit: 'mm',
        format: format as any,
        compress: true,
      });

      if (viewMode === 'single-card') {
         pdf.addImage(imgData, 'JPEG', 0, 0, 85, 54);
      } else {
        const pdfWidth = 215.9;
        const margin = 8;
        const renderWidth = pdfWidth - margin * 2;
        const renderHeight = (canvas.height * renderWidth) / canvas.width;
        let finalWidth = renderWidth;
        let finalHeight = renderHeight;
        let finalMarginLeft = margin;
        const maxHeight = 279.4 - 16;
        if (renderHeight > maxHeight) {
          finalHeight = maxHeight;
          finalWidth = (canvas.width * finalHeight) / canvas.height;
          finalMarginLeft = (pdfWidth - finalWidth) / 2;
        }
        pdf.addImage(imgData, 'JPEG', finalMarginLeft, 8, finalWidth, finalHeight);
      }
      return pdf.output('datauristring');
    } catch (err) {
      console.error('Base64 generation failed', err);
      return null;
    }
  };

  const handleCopyImage = async (): Promise<boolean> => {
    if (!sheetRef.current) return false;
    try {
      const canvas = await html2canvas(sheetRef.current, {
        scale: 2.2,
        useCORS: true,
        backgroundColor: '#fcecee',
        onclone: (clonedDoc) => {
          sanitizeClonedDocForHtml2Canvas(clonedDoc);
        },
      });
      return new Promise((resolve) => {
        canvas.toBlob(async (blob) => {
          if (!blob) {
            resolve(false);
            return;
          }
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob }),
            ]);
            showToast(`High-resolution ${viewMode === 'ten-squares' ? '10-square' : '8-square'} sheet copied to clipboard!`);
            resolve(true);
          } catch (err) {
            console.warn('Clipboard write error', err);
            resolve(false);
          }
        }, 'image/png');
      });
    } catch (error) {
      console.error('Copy to clipboard failed:', error);
      return false;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const dataToRender = isBlank 
    ? {
        ...data,
        insuredName: '',
        insuredAddress: '',
        insuredCityProvPostal: '',
        effectiveDate: '',
        expiryDate: '',
        policyNumber: '',
        vehicleYearMake: '',
        vehicleVin: '',
        broker: '',
      }
    : data;

  return (
    <div className="min-h-screen bg-slate-100 text-gray-900 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Application Bar (Hidden in Print) */}
      <header className="no-print bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            {viewMode === 'td-temporary' ? (
              <img 
                alt="Toronto-Dominion Bank - Wikipedia" 
                id="dimg_LbmkasbnEtCj0PEPtvzn8Aw_27_navbar" 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcCuug9R4EhZdxrVE3Zd9khLazEVHCK6T8FFnQIYOYeg&s=10" 
                className="w-9 h-9 rounded-lg object-contain shadow-xs"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-pink-600 text-white flex items-center justify-center shadow-xs font-bold transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-gray-900 leading-tight">
                  {viewMode === 'td-temporary' ? 'TD Temporary Automobile Liability Insurance Card' : 'Canada Motor Vehicle Liability Insurance Card'}
                </h1>
                <span className={`${viewMode === 'td-temporary' ? 'bg-[#008a00]' : 'bg-pink-600'} text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider`}>
                  {viewMode === 'td-temporary' ? '1:1 PDF Clone' : viewMode === 'eight-squares' ? '8 Squares' : `${viewMode.toUpperCase()}`}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {viewMode === 'td-temporary' 
                  ? 'Official 1-for-1 Pixel-Perfect Clone with Multi-Page PDF Export' 
                  : 'Identical Size & Placement Squares with Canadian Shield Watermark & PDF Export'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* View Mode Selector */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('td-temporary')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  viewMode === 'td-temporary'
                    ? 'bg-white text-gray-900 shadow-xs font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="TD Temporary Card 1:1 Clone"
              >
                <FileText className="w-3.5 h-3.5 text-[#008a00]" />
                <span className="font-semibold">TD Temp Clone</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('eight-squares')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  viewMode === 'eight-squares'
                    ? 'bg-white text-gray-900 shadow-xs font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="8 Identical Squares on Full Page (2x4)"
              >
                <Grid className="w-3.5 h-3.5 text-pink-600" />
                <span>8 Squares</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('four-squares')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  viewMode === 'four-squares'
                    ? 'bg-white text-gray-900 shadow-xs font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="4 Squares (2x2)"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-pink-600" />
                <span className="hidden sm:inline">4 Squares</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('front-back')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  viewMode === 'front-back'
                    ? 'bg-white text-gray-900 shadow-xs font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Front & Back Pair"
              >
                <Layers className="w-3.5 h-3.5 text-pink-600" />
                <span className="hidden md:inline">Front &amp; Back</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('single-card')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  viewMode === 'single-card'
                    ? 'bg-white text-gray-900 shadow-xs font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Single Wallet Pink Slip"
              >
                <CreditCard className="w-3.5 h-3.5 text-pink-600" />
                <span className="hidden md:inline">1 Card</span>
              </button>
            </div>

            {/* Email Compatible Button */}
            <button
              type="button"
              onClick={() => setIsEmailModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 hover:bg-black active:bg-gray-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-300" />
              <span>Email Ready</span>
            </button>

            {/* Download PDF Button */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 ${viewMode === 'td-temporary' ? 'bg-[#008a00] hover:bg-[#007000]' : 'bg-pink-600 hover:bg-pink-700'} active:opacity-90 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50`}
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>{isGenerating ? 'Generating...' : 'Download PDF'}</span>
            </button>

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 p-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              title="Print Sheet"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Controls & Presets (no-print) */}
        <div className="no-print lg:col-span-5 space-y-4">
          {/* TD Temporary Mode Info Box */}
          {viewMode === 'td-temporary' && (
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-950 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5 text-[13px] text-emerald-900">
                  <FileText className="w-4 h-4 text-[#008a00]" />
                  TD Temporary Liability Certificate (1:1 Clone)
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  2-Page Document
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Contains the official TD Insurance / Meloche Monnex header, the 3 dual card certificate slots on Page 1, and the complete policyholder terms &amp; guidelines on Page 2.
              </p>
              {/* Page Selector Tabs */}
              <div className="flex items-center gap-2 pt-1">
                <span className="font-semibold text-[11px] text-emerald-900">Preview Page:</span>
                <div className="flex bg-emerald-100/70 p-0.5 rounded-lg border border-emerald-300">
                  <button
                    type="button"
                    onClick={() => setTdPage(1)}
                    className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                      tdPage === 1 
                        ? 'bg-white text-emerald-950 shadow-xs' 
                        : 'text-emerald-700 hover:text-emerald-900'
                    }`}
                  >
                    Page 1 (Cards Sheet)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTdPage(2)}
                    className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                      tdPage === 2 
                        ? 'bg-white text-emerald-950 shadow-xs' 
                        : 'text-emerald-700 hover:text-emerald-900'
                    }`}
                  >
                    Page 2 (Guidelines)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 8-Squares Pattern Configuration */}
          {viewMode === 'eight-squares' && (
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                  <Grid className="w-4 h-4 text-pink-600" />
                  8 Identical Squares Layout
                </span>
                <span className="text-[10px] text-gray-500 font-mono">2 Columns × 4 Rows</span>
              </div>

              {/* Blank Form Switch inside the configuration */}
              <div className="flex items-center justify-between bg-pink-50/50 p-2.5 rounded-lg border border-pink-200 text-xs">
                <div>
                  <div className="font-bold text-pink-900">Blank Printable Sheet</div>
                  <div className="text-[10px] text-pink-700 leading-tight">Empty driver/vehicle lines</div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBlank(!isBlank)}
                  className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ring-2 ring-pink-500/20 ${
                    isBlank ? 'bg-pink-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    isBlank ? 'translate-x-5' : 'translate-x-0'
                  }`}
                  />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => handlePatternChange('standard')}
                  className={`px-2.5 py-1.5 rounded-lg border text-left cursor-pointer transition-all ${
                    eightSquarePattern === 'standard'
                      ? 'border-pink-600 bg-pink-50 text-pink-900 font-semibold'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="text-[11px] font-bold">Standard Official Sheet</div>
                  <div className="text-[9.5px] text-gray-500">4 Front + 4 Back Terms</div>
                </button>
                <button
                  type="button"
                  onClick={() => handlePatternChange('all-front')}
                  className={`px-2.5 py-1.5 rounded-lg border text-left cursor-pointer transition-all ${
                    eightSquarePattern === 'all-front'
                      ? 'border-pink-600 bg-pink-50 text-pink-900 font-semibold'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="text-[11px] font-bold">All 8 Front Cards</div>
                  <div className="text-[9.5px] text-gray-500">8 Front Certificates</div>
                </button>
                <button
                  type="button"
                  onClick={() => handlePatternChange('alternating')}
                  className={`px-2.5 py-1.5 rounded-lg border text-left cursor-pointer transition-all ${
                    eightSquarePattern === 'alternating'
                      ? 'border-pink-600 bg-pink-50 text-pink-900 font-semibold'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="text-[11px] font-bold">Alternating</div>
                  <div className="text-[9.5px] text-gray-500">Front, Back, Front, Back...</div>
                </button>
                <button
                  type="button"
                  onClick={() => handlePatternChange('all-back')}
                  className={`px-2.5 py-1.5 rounded-lg border text-left cursor-pointer transition-all ${
                    eightSquarePattern === 'all-back'
                      ? 'border-pink-600 bg-pink-50 text-pink-900 font-semibold'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="text-[11px] font-bold">All 8 Terms Cards</div>
                  <div className="text-[9.5px] text-gray-500">8 Back Legal Terms</div>
                </button>
              </div>
            </div>
          )}

          <FormControls
            data={data}
            onChange={setData}
            showWatermark={showWatermark}
            onToggleWatermark={setShowWatermark}
            watermarkOpacity={watermarkOpacity}
            onChangeWatermarkOpacity={setWatermarkOpacity}
          />

          {/* Specs box */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1 leading-relaxed">
              <span className="font-bold">Official Document Specifications:</span>
              <p className="text-[11px] text-amber-800">
                Matches the official Canada Inter-Province Motor Vehicle Liability Insurance format with high-resolution Canadian coat-of-arms watermark and calibrated dimensions.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Live Sheet Preview */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Preview Bar controls */}
          <div className="no-print w-full flex items-center justify-between mb-3 text-xs text-gray-500 px-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">
                {viewMode === 'td-temporary' ? `Live Preview (Page ${tdPage} of 2):` : 'Live Sheet Preview:'}
              </span>
              <span className="text-[11px] bg-white border border-gray-200 px-2 py-0.5 rounded-md font-mono">
                {isBlank ? 'PRISTINE BLANK STOCK' : `Policy #${data.policyNumber}`}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCopyImage}
                className="text-pink-700 hover:text-pink-800 font-medium flex items-center gap-1 cursor-pointer"
                title="Copy high-res image to clipboard"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Sheet</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

          {/* Render Sheet Preview */}
          <div className="w-full flex justify-center overflow-x-auto pb-6">
            <SheetLayout
              data={dataToRender}
              viewMode={viewMode}
              eightSquarePattern={eightSquarePattern}
              watermarkOpacity={watermarkOpacity}
              showWatermark={showWatermark}
              sheetRef={sheetRef}
              customCardTypes={customCardTypes}
              onToggleCardType={handleToggleCardType}
              tdPage={tdPage}
            />
          </div>
        </div>
      </main>

      {/* Hidden Offscreen Pages for TD Temporary Multi-Page PDF Generation */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', pointerEvents: 'none', opacity: 0 }} aria-hidden="true">
        <div ref={hiddenTdPage1Ref}>
          <InsuranceDocClone
            data={dataToRender}
            watermarkOpacity={watermarkOpacity}
            showWatermark={showWatermark}
            page={1}
          />
        </div>
        <div ref={hiddenTdPage2Ref}>
          <InsuranceDocClone
            data={dataToRender}
            watermarkOpacity={watermarkOpacity}
            showWatermark={showWatermark}
            page={2}
          />
        </div>
      </div>

      {/* Email Modal Dialog */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        data={dataToRender}
        onDownloadPdf={handleDownloadPdf}
        onCopyImage={handleCopyImage}
        isGenerating={isGenerating}
        onGenerateAttachment={generatePdfBase64}
      />
    </div>
  );
}
