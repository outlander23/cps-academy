export const InlineAlert = ({ tone = "info", title, message }) => {
  const toneClasses = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    danger: "bg-red-50 border-red-200 text-red-800",
    success: "bg-green-50 border-green-200 text-green-800",
  };

  return (
    <div
      role="status"
      className={`p-4 rounded-lg border grid gap-1 ${
        toneClasses[tone] || toneClasses.info
      }`}
    >
      {title && <strong className="font-semibold">{title}</strong>}
      {message && <span className="text-inherit">{message}</span>}
    </div>
  );
};
