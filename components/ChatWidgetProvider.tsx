'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ChatWidget = dynamic(() => import('./ChatWidget'), {
  ssr: false,
  loading: () => null,
});

export default function ChatWidgetProvider() {
  return (
    <Suspense fallback={null}>
      <ChatWidget />
    </Suspense>
  );
}
