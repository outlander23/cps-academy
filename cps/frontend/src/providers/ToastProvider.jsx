import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const ToastContext = createContext(null);

const DEFAULT_DURATION = 3600;

const ToastContainer = ({ toast, onDismiss }) => {
  if (!toast) return null;

  return (
    <div
      className={`fixed right-6 bottom-6 bg-white p-4 rounded-lg border shadow-sm grid gap-1 min-w-60 ${
        toast.type === "success"
          ? "border-green-200"
          : toast.type === "error"
          ? "border-red-200"
          : "border-blue-200"
      }`}
      role="status"
    >
      <strong>{toast.title ?? "Notification"}</strong>
      {toast.message && <span className="text-gray-600">{toast.message}</span>}
      <button
        type="button"
        className="py-1 px-3 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5 hover:brightness-105 bg-blue-50 text-blue-800 shadow-none self-end mt-2"
        onClick={onDismiss}
      >
        Dismiss
      </button>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((nextToast, duration = DEFAULT_DURATION) => {
    setToast(nextToast);

    if (duration > 0) {
      window.setTimeout(() => {
        setToast((current) => (current === nextToast ? null : current));
      }, duration);
    }
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const value = useMemo(
    () => ({ toast, showToast, dismissToast }),
    [toast, showToast, dismissToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toast={toast} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within <ToastProvider>");
  }
  return context;
};
