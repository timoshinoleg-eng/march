// Утилита для открытия чат-виджета из любого компонента

export function openChatWidget(mode?: 'brief' | 'chat') {
  if (typeof window === 'undefined') return;
  
  const event = new CustomEvent('openChatWidget', {
    detail: { mode: mode || 'chat' }
  });
  window.dispatchEvent(event);
}

// Для использования в onClick:
// onClick={() => openChatWidget('brief')} - открыть чат сразу с брифом
// onClick={() => openChatWidget()} или onClick={() => openChatWidget('chat')} - просто открыть чат
