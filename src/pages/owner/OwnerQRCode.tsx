import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Helmet } from 'react-helmet-async';

export default function OwnerQRCode() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrUrl, setQrUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Derive canonical URL for entrance check-in
    const origin = window.location.origin;
    const checkInUrl = `${origin}/check-in`;
    setQrUrl(checkInUrl);

    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        checkInUrl,
        {
          width: 320,
          margin: 3,
          color: {
            dark: '#080808',
            light: '#FFFFFF',
          },
          errorCorrectionLevel: 'H',
        },
        (error) => {
          if (error) console.error('Failed to generate QR code', error);
        }
      );
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'elite-gym-entrance-qr.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Helmet>
        <title>Static QR Entrance Poster & Generator | Elite Zumba & Fitness Studio</title>
      </Helmet>

      <div className="space-y-6 sm:space-y-8 max-w-4xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <span>Entrance Turnstile Asset</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold uppercase text-white tracking-wide">
              ENTRANCE QR CODE
            </h1>
            <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary,#A0A0A0)]">
              Permanent high-contrast entrance poster for touchless member attendance check-in.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-white/10 hover:bg-white text-white hover:text-black transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              <span>Print Poster</span>
            </button>
            <button
              onClick={handleDownload}
              className="py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shadow-md flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Download PNG</span>
            </button>
          </div>
        </div>

        {/* Printable Entrance Poster Preview */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Poster Preview Card (7 cols) */}
          <div className="md:col-span-7 p-8 rounded-3xl bg-white text-black border-4 border-[var(--accent-primary,#D70015)] shadow-2xl text-center select-none print:m-0 print:border-none print:shadow-none">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-[10px] font-mono font-bold uppercase tracking-widest mb-3">
              <span>Touchless Turnstile Check-In</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-wider leading-none">
              ELITE ZUMBA & FITNESS
            </h2>
            <p className="text-xs font-mono uppercase text-neutral-600 mt-1 font-bold">
              5th Floor, Savitri Tower • Bhagalpur
            </p>

            {/* QR Canvas Container with Strict Quiet Zone */}
            <div className="my-6 inline-block p-4 rounded-2xl bg-white border-2 border-neutral-300 shadow-inner">
              <canvas ref={canvasRef} className="mx-auto block rounded-lg max-w-full h-auto" />
            </div>

            <div className="space-y-1">
              <div className="text-base font-display font-black uppercase text-[var(--accent-primary,#D70015)] tracking-wide">
                SCAN WITH SMARTPHONE CAMERA
              </div>
              <p className="text-xs font-mono text-neutral-600">
                Log in once • Instant daily workout attendance
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-200 text-[11px] font-mono text-neutral-500">
              Fallback URL: <strong className="text-black">{qrUrl}</strong>
            </div>

          </div>

          {/* Configuration & Security Disclosures (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            
            {/* Canonical URL Box */}
            <div className="p-6 rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10 space-y-3">
              <h3 className="text-xs font-mono uppercase text-white font-bold tracking-wider">
                Permanent QR Destination URL
              </h3>
              <div className="p-3 rounded-xl bg-[var(--bg-canvas,#080808)] border border-white/10 font-mono text-xs text-white/90 break-all">
                {qrUrl}
              </div>
              <button
                onClick={handleCopy}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-white/10 hover:bg-white text-white hover:text-black transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Direct Link'}</span>
              </button>
            </div>

            {/* Static QR Security Limitation Disclosure */}
            <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/25 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-red-400 font-mono font-bold uppercase tracking-wide">
                <span className="material-symbols-outlined text-base">security</span>
                <span>Static QR Security Analysis</span>
              </div>
              <p className="text-white/80 font-sans leading-relaxed">
                A permanent static QR code is a public web link. It cannot cryptographically guarantee physical presence since a photograph of the poster can theoretically be shared.
              </p>
              <div className="text-white/60 font-mono text-[11px] space-y-1.5 list-disc list-inside">
                <div>✓ Protected by server-side daily uniqueness (1 check-in/day)</div>
                <div>✓ Protected by server-side membership expiration rules</div>
                <div>✓ Suspended/deactivated accounts are immediately rejected</div>
                <div>✓ Timestamps are locked to gym-local timezone on server</div>
              </div>
            </div>

            {/* Poster Mounting Tips */}
            <div className="p-6 rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10 space-y-2 text-xs font-mono text-[var(--text-secondary,#A0A0A0)]">
              <div className="text-white font-bold uppercase">Mounting Guidelines:</div>
              <p>• Print at 300 DPI on A4 or A3 matte laminated poster stock.</p>
              <p>• Mount at eye level (approx. 140–160 cm from floor) near entrance turnstile.</p>
              <p>• Avoid harsh fluorescent glare directly over the QR matrix.</p>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}
