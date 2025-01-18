'use client';

import * as Toast from '@radix-ui/react-toast';
import { createContext, useContext, useState, ReactNode } from 'react';

interface ToastContextType {
  showToast: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<{ open: boolean; title: string; description?: string }>({
    open: false,
    title: '',
    description: '',
  });

  const showToast = (title: string, description?: string) => {
    setToast({ open: true, title, description });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast.Provider>
        <Toast.Root
          className="bg-red-500 shadow-lg rounded-md p-4 w-[300px] border border-red-700"
          open={toast.open}
          onOpenChange={(open) => setToast((prev) => ({ ...prev, open }))}
        >
          <Toast.Title className="text-lg font-semibold">{toast.title}</Toast.Title>
          {toast.description && (
            <Toast.Description className="text-sm text-white">{toast.description}</Toast.Description>
          )}
          {/* <Toast.Action
            className="text-blue-500"
            altText="Close"
            onClick={() => setToast((prev) => ({ ...prev, open: false }))}
          >
            Close
          </Toast.Action> */}
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2 outline-none" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};