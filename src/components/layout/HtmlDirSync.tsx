'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

/**
 * Syncs RTL/LTR state across 3 layers on client-side locale changes:
 *
 * 1. <html dir>       → for browser-level behavior (scrollbar side, caret, etc.)
 * 2. <html lang>      → for screen readers and browser spelling
 * 3. <body className> → for Tailwind font-arabic / font-sans classes
 *
 * The .site-root div handles layer 4 (CSS cascade for page content)
 * directly in the layout via the dir prop — that's React-managed and
 * updates immediately without needing JS here.
 *
 * Next.js App Router does NOT update <html>/<body> attributes during
 * client-side navigation, so we must do it imperatively.
 */
export default function HtmlDirSync() {
  const params = useParams();
  const locale = (params?.locale as string) ?? 'ar';

  useEffect(() => {
    const isRtl = locale === 'ar';

    // Layer 1: <html> attributes
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;

    // Layer 2: <body> font class (Tailwind font-arabic / font-sans)
    document.body.classList.remove('font-arabic', 'font-sans');
    document.body.classList.add(isRtl ? 'font-arabic' : 'font-sans');
  }, [locale]);

  return null;
}
