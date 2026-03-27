interface HighlightBoxProps {
  variant: "alert" | "warning" | "success" | "info";
  children: React.ReactNode;
  className?: string;
}

export function HighlightBox({ variant, children, className = "" }: HighlightBoxProps) {
  const variants = {
    alert: "bg-red-900/30 border-red-700/50",
    warning: "bg-amber-900/30 border-amber-700/50",
    success: "bg-emerald-900/30 border-emerald-700/50",
    info: "bg-blue-900/30 border-blue-700/50",
  };

  return (
    <div className={`rounded-xl border p-6 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}

export default HighlightBox;
