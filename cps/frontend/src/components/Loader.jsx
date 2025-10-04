export const Loader = ({ label = "Loading" }) => (
  <div className="flex items-center gap-3">
    <div className="w-5 h-5 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
    <span className="text-gray-600">{label}</span>
  </div>
);
