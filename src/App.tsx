import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { InsuranceCardData, SheetViewMode, EightSquarePattern } from './types';
import { generateRandomInsuranceData } from './data/presets';
import { SheetLayout } from './components/SheetLayout';
import { InsuranceDocClone } from './components/InsuranceDocClone';
import { FormControls } from './components/FormControls';
import { EmailModal } from './components/EmailModal';
import { sanitizeClonedDocForHtml2Canvas } from './utils/html2canvasSanitizer';
import { 
  Mail, 
  Printer, 
  ShieldCheck, 
  LayoutGrid, 
  Layers, 
  CreditCard, 
  CheckCircle2, 
  FileDown, 
  Info,
  Grid,
  FileText,
  Sliders,
  Send
} from 'lucide-react';

export default function App() {
  const [data, setData] = useState<InsuranceCardData>(generateRandomInsuranceData());
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
  const showWatermark = false;
  const watermarkOpacity = 0.20;
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
      <header className="no-print fixed top-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[#008a00]" />
          <h1 className="text-lg font-extrabold text-gray-900 tracking-tight leading-none">Auto Insurance</h1>
        </div>
        
        {/* Compact Right Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsBlank(!isBlank)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors cursor-pointer border ${
              isBlank ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Blank</span>
          </button>
        </div>
      </header>

      {/* Main Content (Mobile Optimized) */}
      <main className="flex-1 w-full max-w-md mx-auto pt-16 pb-24 px-4 space-y-4">
        {/* Left Column: Form Controls & Presets (no-print) */}
        <div className="no-print space-y-4">
          {/* TD Temporary Mode Info Box */}
          {viewMode === 'td-temporary' && (
            <div className="bg-[#008a00]/10 border border-[#008a00]/20 rounded-xl p-3.5 text-xs text-gray-900 space-y-1 shadow-sm">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-[#008a00] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5 text-[#008a00]">TD Certificate Generator</span>
                  Configured for fast PDF deployment.
                </div>
              </div>
            </div>
          )}

          {/* 8-Squares Pattern Configuration */}
          {/* Removed for mobile app speed */}

          <FormControls
            data={data}
            onChange={setData}
          />
        </div>
      </main>

      {/* Mobile App Bottom Navigation Bar */}
      <div className="no-print fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-6 pt-3 pb-safe-bottom min-h-[4.5rem] flex items-center justify-around z-40 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 py-1 px-4 rounded-xl text-emerald-700 font-bold transition-colors cursor-pointer"
        >
          <Sliders className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-wider">Form</span>
        </button>
        <button
          type="button"
          onClick={() => setIsEmailModalOpen(true)}
          className="flex flex-col items-center gap-1 py-2 px-8 rounded-2xl bg-gray-900 text-white shadow-lg active:scale-95 font-bold transition-transform cursor-pointer"
        >
          <Send className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-wider">Deploy</span>
        </button>
      </div>

      {/* Hidden Offscreen Pages for TD Temporary Multi-Page PDF Generation and Sheet Layout */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', pointerEvents: 'none', opacity: 0 }} aria-hidden="true">
        <div ref={hiddenTdPage1Ref}>
          <InsuranceDocClone
            data={dataToRender}
            page={1}
          />
        </div>
        <div ref={hiddenTdPage2Ref}>
          <InsuranceDocClone
            data={dataToRender}
            page={2}
          />
        </div>
        <SheetLayout
          data={dataToRender}
          viewMode={viewMode}
          eightSquarePattern={eightSquarePattern}
          sheetRef={sheetRef}
          customCardTypes={customCardTypes}
          onToggleCardType={handleToggleCardType}
          tdPage={tdPage}
        />
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
