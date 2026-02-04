import { useState, useCallback } from 'react';

interface Toast {
  id: string;
  title: string;
  description?: string;
}

interface UseToastReturn {
  toast: (props: { title: string; description?: string }) => void;
  toasts: Toast[];
  dismissToast: (id: string) => void;
}

export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(({ title, description }: { title: string; description?: string }) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, title, description };
    
    setToasts((prev) => [...prev, newToast]);
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toast, toasts, dismissToast };
}
