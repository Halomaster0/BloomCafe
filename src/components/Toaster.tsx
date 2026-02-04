import { X } from 'lucide-react';

interface Toast {
  id: string;
  title: string;
  description?: string;
}

interface ToasterProps {
  toasts: Toast[];
  dismissToast: (id: string) => void;
}

const Toaster = ({ toasts, dismissToast }: ToasterProps) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[1001] flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-[#013A1E] text-[#F7F6F2] rounded-2xl px-6 py-4 shadow-lg min-w-[300px] animate-in slide-in-from-bottom-4 fade-in duration-300"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="bloom-body text-sm font-medium">{toast.title}</p>
              {toast.description && (
                <p className="bloom-body text-xs text-[#F7F6F2]/70 mt-1">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-[#F7F6F2]/60 hover:text-[#F7F6F2] transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toaster;
