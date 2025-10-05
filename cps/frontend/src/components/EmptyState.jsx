export const EmptyState = ({ title, message, action }) => (
  <div className="text-center p-12 space-y-6">
    <div className="flex justify-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <span className="text-5xl">📭</span>
      </div>
    </div>
    <div className="space-y-2">
      <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
      {message && (
        <p className="text-gray-600 text-lg max-w-md mx-auto">{message}</p>
      )}
    </div>
    {action && <div className="pt-2">{action}</div>}
  </div>
);
