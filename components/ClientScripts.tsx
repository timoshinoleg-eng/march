'use client';

import dynamic from "next/dynamic";

const YandexMetrika = dynamic(() => import("@/components/YandexMetrika"), {
  ssr: false,
});

export default function ClientScripts() {
  return (
    <>
      <YandexMetrika />
    </>
  );
}
