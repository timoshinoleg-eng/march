'use client';

// Кнопка "Записаться" — открывает чат-виджет

interface BookingButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function BookingButton({ 
  children = 'Записаться', 
  className = '',
  variant = 'primary'
}: BookingButtonProps) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('openChatWidget'));
  };

  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 font-medium transition-all duration-200 rounded-lg';
  
  const variants = {
    primary: 'bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700 shadow-lg shadow-emerald-500/25',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700',
    outline: 'border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10',
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

// Хук для открытия виджета из любого места
export function useChatWidget() {
  const openWidget = () => {
    window.dispatchEvent(new CustomEvent('openChatWidget'));
  };

  return { openWidget };
}

export default BookingButton;
