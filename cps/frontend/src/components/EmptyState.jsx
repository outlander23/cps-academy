export const EmptyState = ({ title, message, action }) => (
  <div className="text-center p-12 text-gray-500">
    <h3 className="mb-3">{title}</h3>
    {message && <p className="mb-5 text-gray-500">{message}</p>}
    {action}
  </div>
);
