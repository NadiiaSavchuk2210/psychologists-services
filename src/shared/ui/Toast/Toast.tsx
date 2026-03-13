import { Toaster } from 'react-hot-toast';

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      containerStyle={{
        top: 80,
      }}
      toastOptions={{
        className: '',
        style: {
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
          maxWidth: '420px',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },

        success: {
          style: {
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            border: '1px solid rgba(16, 185, 129, 0.3)',
          },
          iconTheme: {
            primary: 'white',
            secondary: 'white',
          },
        },

        error: {
          style: {
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: 'white',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          },
          iconTheme: {
            primary: 'white',
            secondary: 'red',
          },
        },

        loading: {
          style: {
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: 'white',
            border: '1px solid rgba(59, 130, 246, 0.3)',
          },
          iconTheme: {
            primary: 'white',
            secondary: 'white',
          },
        },
      }}
    />
  );
};

export default Toast;
