"use client";

import React, { useEffect, useState, useRef } from "react";
import QRCode from "qrcode";
import {
  Download,
  Copy,
  Check,
  Heart,
  ExternalLink,
  Sparkles,
  AlertCircle,
  QrCode as QrIcon,
} from "lucide-react";
import FloatingHeartsCanvas from "@/components/FloatingHeartsCanvas";

export default function QrPage() {
  const [dataUrl, setDataUrl] = useState<string>("");
  const [targetUrl, setTargetUrl] = useState<string>("");
  const [isProductionConfigured, setIsProductionConfigured] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    let finalSurpriseUrl = "";
    if (envSiteUrl && envSiteUrl.trim().length > 0) {
      const cleanBase = envSiteUrl.trim().replace(/\/+$/, "");
      finalSurpriseUrl = `${cleanBase}/surprise`;
      setIsProductionConfigured(true);
    } else {
      // In development or if unconfigured
      setIsProductionConfigured(false);
      if (typeof window !== "undefined") {
        finalSurpriseUrl = `${window.location.origin}/surprise`;
      } else {
        finalSurpriseUrl = "http://localhost:3000/surprise";
      }
    }

    setTargetUrl(finalSurpriseUrl);

    // Generate QR code with high contrast, white background & margin
    QRCode.toDataURL(finalSurpriseUrl, {
      width: 420,
      margin: 2,
      color: {
        dark: "#0a0a14",
        light: "#ffffff",
      },
      errorCorrectionLevel: "H",
    })
      .then((url) => {
        setDataUrl(url);
        setLoading(false);
      })
      .catch((err) => {
        console.error("QR Code generation error:", err);
        setLoading(false);
      });
  }, []);

  const handleCopy = async () => {
    if (!targetUrl) return;
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "romantic-surprise-qr.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative text-pink-50">
      <FloatingHeartsCanvas />

      <div className="w-full max-w-xl glass-panel-glow rounded-3xl p-6 sm:p-10 border border-pink-400/40 relative z-10 shadow-2xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500/20 to-purple-600/30 flex items-center justify-center border border-pink-400/40 mb-3 animate-pulse-glow">
            <QrIcon className="w-7 h-7 text-pink-400" />
          </div>
          <h1
            className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200 bg-clip-text text-transparent font-serif"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Romantic QR Code ❤️
          </h1>
          <p className="text-sm text-pink-300/80 mt-1">
            Print or share this QR code for your girlfriend to scan
          </p>
        </div>

        {/* Notice if NEXT_PUBLIC_SITE_URL is not configured */}
        {!isProductionConfigured && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200/90 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-300">
                Notice: Production URL Not Set
              </p>
              <p className="mt-1 leading-relaxed">
                Currently encoding your local/preview link (
                <code className="text-white bg-black/40 px-1 py-0.5 rounded">
                  {targetUrl}
                </code>
                ). Once deployed on Vercel, set the{" "}
                <code className="text-white bg-black/40 px-1 py-0.5 rounded">
                  NEXT_PUBLIC_SITE_URL
                </code>{" "}
                environment variable to generate the final public production QR code!
              </p>
            </div>
          </div>
        )}

        {/* QR Code Container with High Contrast & Safe White Margin */}
        <div className="flex flex-col items-center">
          <div className="p-5 rounded-3xl bg-white shadow-2xl border-4 border-pink-300/40 relative group">
            {loading ? (
              <div className="w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center bg-zinc-100 rounded-xl">
                <Heart className="w-10 h-10 text-pink-500 animate-pulse" />
              </div>
            ) : dataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={dataUrl}
                alt="Scan this for a little surprise ❤️"
                className="w-64 h-64 sm:w-72 sm:h-72 rounded-xl object-contain"
              />
            ) : (
              <div className="w-64 h-64 flex items-center justify-center text-zinc-500">
                Failed to load QR
              </div>
            )}
          </div>

          {/* Caption specified in Section 10 */}
          <div className="mt-5 flex items-center gap-2 text-center text-pink-200 text-base sm:text-lg font-serif italic">
            <Heart className="w-4 h-4 text-pink-400 fill-pink-500" />
            <span>&ldquo;Scan this for a little surprise ❤️&rdquo;</span>
          </div>

          <div className="mt-2 text-xs text-pink-300/60 break-all text-center max-w-sm px-2">
            Encodes: {targetUrl}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleDownload}
            disabled={!dataUrl}
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-medium text-white text-sm shadow-xl transition-all duration-300 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 hover:shadow-pink-500/30 hover:scale-105 active:scale-95 border border-pink-300/30"
          >
            <Download className="w-4 h-4" />
            <span>Download QR Code PNG</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-medium text-pink-200 text-sm glass-panel hover:text-white hover:border-pink-400 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-pink-400" />
                <span>Copy Surprise Link</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Link to Preview */}
        <div className="mt-6 pt-5 border-t border-pink-500/20 text-center">
          <a
            href="/surprise"
            className="inline-flex items-center gap-1.5 text-xs text-pink-300 hover:text-pink-100 hover:underline transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Preview Romantic Surprise Experience directly</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>
      </div>
    </main>
  );
}
