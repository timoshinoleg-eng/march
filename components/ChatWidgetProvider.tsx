'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ChatWidgetAdvanced = dynamic(() => import('./ChatWidgetAdvanced'), {
  ssr: false,
  loading: () => null,
});

export default function ChatWidgetProvider() {
  return (
    <Suspense fallback={null}>
      <ChatWidgetAdvanced />
    </Suspense>
  );
}
