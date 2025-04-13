import Snackbar from '@/components/SnackBar';
import { createContext, useState, ReactNode } from 'react';

type SnackbarState = {
  open: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
};

type SnackbarContextType = {
  showSnackbar: (message: string, type?: SnackbarState['type']) => void;
  hideSnackbar: () => void;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
  hideSnackbar: () => {}
});

type SnackbarProviderProps = {
  children: ReactNode;
};

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    type: 'success'
  });

  const showSnackbar = (message: string, type: SnackbarState['type'] = 'success') => {
    setSnackbar({ open: true, message, type });
  };

  const hideSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      {snackbar.open && (
        <Snackbar 
          message={snackbar.message}
          type={snackbar.type}
          duration={5000}
          onClose={hideSnackbar}
        />
      )}
    </SnackbarContext.Provider>
  );
};