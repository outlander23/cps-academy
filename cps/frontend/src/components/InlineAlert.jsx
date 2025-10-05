export const InlineAlert = ({ tone = "info", title, message }) => {
  const toneConfig = {
    info: {
      classes: "bg-blue-50 border-blue-300 text-blue-800",
      icon: "ℹ️",
    },
    danger: {
      classes: "bg-red-50 border-red-300 text-red-800",
      icon: "⚠️",
    },
    success: {
      classes: "bg-green-50 border-green-300 text-green-800",
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
