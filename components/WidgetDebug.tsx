'use client';

import { useEffect, useState, useCallback } from 'react';

interface DebugInfo {
  domain: string;
  apiUrl: string | undefined;
  userAgent: string;
  viewport: { width: number; height: number };
  timestamp: string;
  
  apiHealth?: {
    status: 'healthy' | 'degraded' | 'unhealthy';
    yandex?: {
      status: string;
      latencyMs?: number;
      error?: string;
    };
  };
  
  aiResponse?: {
    status: 'success' | 'error';
    response?: string;
    provider?: string;
    latencyMs?: number;
    error?: string;
    statusCode?: number;
  };
  
  corsTest?: {
    preflightSuccess: boolean;
    error?: string;
  };
}

export default function WidgetDebug() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const collectDebug = useCallback(async () => {
    setIsLoading(true);
    
    const info: DebugInfo = {
      domain: window.location.hostname,
      apiUrl: process.env.NEXT_PUBLIC_API_URL,
      userAgent: navigator.userAgent,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      timestamp: new Date().toISOString(),
    };

    // CORS Preflight Test
    try {
      const preflight = await fetch('/api/agent', {
        method: 'OPTIONS',
        headers: {
          'Origin': window.location.origin,
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type',
        },
      });
      
      info.corsTest = {
        preflightSuccess: preflight.ok,
      };
    } catch (e) {
      info.corsTest = {
        preflightSuccess: false,
        error: e instanceof Error ? e.message : 'Network error',
      };
    }

    // API Health Check
    try {
      const healthStart = performance.now();
      const health = await fetch('/api/health');
      const healthData = await health.json();
      
      info.apiHealth = {
        status: healthData.status,
        yandex: healthData.services?.yandex,
      };
    } catch (e) {
      info.apiHealth = {
        status: 'unhealthy',
        yandex: { status: 'error', error: e instanceof Error ? e.message : 'Network error' },
      };
    }

    // AI Endpoint Test
    try {
      const aiStart = performance.now();
      const ai = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Привет! Ответь коротко.' }],
        }),
      });
      
      const aiData = ai.ok ? await ai.json() : undefined;
      info.aiResponse = {
        status: ai.ok ? 'success' : 'error',
        response: aiData?.response?.slice(0, 100),
        provider: aiData?.provider,
        latencyMs: Math.round(performance.now() - aiStart),
        error: ai.ok ? undefined : `HTTP ${ai.status}`,
        statusCode: ai.status,
      };
    } catch (e) {
      info.aiResponse = {
        status: 'error',
        error: e instanceof Error ? e.message : 'Network error',
      };
    }

    setDebugInfo(info);
    setIsLoading(false);
    
    console.log('[WidgetDebug] Diagnostics:', info);
  }, []);

  useEffect(() => {
    if (isVisible) collectDebug();
  }, [collectDebug, isVisible]);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-xs font-mono z-50 shadow-lg"
        title="Open debug panel"
      >
        🐛 Debug
      </button>
    );
  }

  const getStatusColor = (status: string | undefined) => {
    if (status === 'healthy' || status === 'success' || status === 'connected' || status === 'configured') 
      return 'text-green-400';
    if (status === 'error' || status === 'unhealthy') return 'text-red-400';
    return 'text-yellow-400';
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-[80vh] overflow-auto bg-gray-900 text-green-400 p-4 text-xs font-mono z-50 shadow-2xl rounded-lg border border-gray-700">
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-700">
        <span className="font-bold flex items-center gap-2">
          🔧 Widget Debug
          {isLoading && <span className="animate-pulse">⏳</span>}
        </span>
        <div className="flex gap-2">
          <button onClick={collectDebug} className="text-gray-400 hover:text-white" disabled={isLoading}>🔄</button>
          <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-white">✕</button>
        </div>
      </div>

      {debugInfo && (
        <div className="space-y-4">
          <section>
            <h4 className="text-yellow-400 font-bold mb-1">Environment</h4>
            <div className="grid grid-cols-[80px_1fr] gap-1 text-gray-300">
              <span>Domain:</span>
              <span className={debugInfo.domain === 'www.chatbot24.su' ? 'text-green-400' : ''}>
                {debugInfo.domain}
              </span>
              <span>API URL:</span>
              <span className="truncate">{debugInfo.apiUrl || '/api'}</span>
              <span>Viewport:</span>
              <span>{`${debugInfo.viewport.width}x${debugInfo.viewport.height}`}</span>
            </div>
          </section>

          <section>
            <h4 className="text-yellow-400 font-bold mb-1">CORS Preflight</h4>
            <div className={getStatusColor(debugInfo.corsTest?.preflightSuccess ? 'success' : 'error')}>
              {debugInfo.corsTest?.preflightSuccess ? '✅ Success' : '❌ Failed'}
            </div>
            {debugInfo.corsTest?.error && (
              <div className="text-red-400 mt-1">{debugInfo.corsTest.error}</div>
            )}
          </section>

          <section>
            <h4 className="text-yellow-400 font-bold mb-1">API Health</h4>
            <div className={getStatusColor(debugInfo.apiHealth?.status)}>
              {debugInfo.apiHealth?.status === 'healthy' ? '✅ Healthy' : '❌ Unhealthy'}
            </div>
            {debugInfo.apiHealth?.yandex && (
              <div className="mt-1 text-gray-300">
                Yandex: <span className={getStatusColor(debugInfo.apiHealth.yandex.status)}>
                  {debugInfo.apiHealth.yandex.status}
                </span>
                {debugInfo.apiHealth.yandex.latencyMs && ` (${debugInfo.apiHealth.yandex.latencyMs}ms)`}
              </div>
            )}
          </section>

          <section>
            <h4 className="text-yellow-400 font-bold mb-1">AI Endpoint</h4>
            <div className={getStatusColor(debugInfo.aiResponse?.status)}>
              {debugInfo.aiResponse?.status === 'success' ? '✅ Success' : '❌ Error'}
              {debugInfo.aiResponse?.latencyMs && ` (${debugInfo.aiResponse.latencyMs}ms)`}
            </div>
            {debugInfo.aiResponse?.provider && (
              <div className="text-gray-300 mt-1">Provider: {debugInfo.aiResponse.provider}</div>
            )}
            {debugInfo.aiResponse?.response && (
              <div className="mt-1 text-gray-400 truncate" title={debugInfo.aiResponse.response}>
                Response: {debugInfo.aiResponse.response}
              </div>
            )}
            {debugInfo.aiResponse?.error && (
              <div className="text-red-400 mt-1">{debugInfo.aiResponse.error}</div>
            )}
          </section>

          <details>
            <summary className="cursor-pointer text-gray-500 hover:text-gray-300">Raw JSON</summary>
            <pre className="text-[10px] mt-2 text-gray-500 overflow-x-auto">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </details>

          <div className="flex gap-2 pt-2 border-t border-gray-700">
            <button
              onClick={() => navigator.clipboard.writeText(JSON.stringify(debugInfo, null, 2))}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-[10px]"
            >
              📋 Copy JSON
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-blue-700 hover:bg-blue-600 text-white px-2 py-1 rounded text-[10px]"
            >
              🔄 Reload
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
