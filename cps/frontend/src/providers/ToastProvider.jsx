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

  const typeConfig = {
    success: {
      gradient: "from-emerald-50 to-teal-50",
      border: "border-emerald-300",
      icon: "✅",
    },
    error: {
      gradient: "from-rose-50 to-pink-50",
      border: "border-rose-300",
      icon: "⚠️",
    },
    info: {
      gradient: "from-indigo-50 to-cyan-50",
      border: "border-indigo-300",
      icon: "ℹ️",
    },
  };

  const config = typeConfig[toast.type] || typeConfig.info;

  return (
    <div
      className={`fixed right-6 bottom-6 backdrop-blur-md bg-gradient-to-br ${config.gradient} p-6 rounded-2xl border-2 ${config.border} shadow-2xl space-y-3 min-w-80 max-w-md animate-slide-in-right z-50`}
      role="status"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{config.icon}</span>
        <div className="flex-1 space-y-1">
          <strong className="text-gray-800 font-bold block">
            {toast.title ?? "Notification"}
          </strong>
          {toast.message && (
            <span className="text-gray-700 text-sm block leading-relaxed">
              {toast.message}
            </span>
          )}
        </div>
      </div>
      <button
        type="button"
        className="w-full py-2.5 px-4 rounded-xl border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 bg-white/80 text-gray-700 hover:bg-white hover:scale-105 shadow-md"
        onClick={onDismiss}
      >
        ✓ Dismiss
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
