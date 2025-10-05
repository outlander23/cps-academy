export const InlineAlert = ({ tone = "info", title, message }) => {
  const toneConfig = {
    info: {
      classes: "bg-indigo-50 border-indigo-300 text-indigo-800",
      icon: "ℹ️",
    },
    danger: {
      classes: "bg-rose-50 border-rose-300 text-rose-800",
      icon: "⚠️",
    },
    success: {
      classes: "bg-emerald-50 border-emerald-300 text-emerald-800",
      icon: "✅",
    },
  };

  const config = toneConfig[tone] || toneConfig.info;

  return (
    <div
      role="status"
      className={`p-5 rounded-xl border-2 flex items-start gap-3 ${config.classes} shadow-sm`}
    >
      <span className="text-2xl flex-shrink-0">{config.icon}</span>
      <div className="flex-1 space-y-1">
        {title && <strong className="font-bold block">{title}</strong>}
        {message && <span className="text-inherit block">{message}</span>}
      </div>
    </div>
  );
};
