export const CourseTable = ({ courses, onSelect, onDelete, deletingId }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 overflow-x-auto">
    <table className="collapse w-full">
      <thead>
        <tr>
          <th className="w-7/12 text-left text-sm text-gray-500">Course</th>
          <th className="text-left text-sm text-gray-500">Description</th>
          <th className="text-left text-sm text-gray-500">Audience</th>
          <th className="text-left text-sm text-gray-500">Slug</th>
          <th className="w-30 text-left text-sm text-gray-500">Actions</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <tr key={course.id} className="hover:bg-blue-50">
            <td className="p-4 border-b border-gray-100">
              <strong>{course.title}</strong>
            </td>
            <td className="p-4 border-b border-gray-100">
              {course.description}
            </td>
            <td className="p-4 border-b border-gray-100">
              <div className="flex flex-wrap gap-2">
                {course.audience?.map((role) => (
                  <span
                    key={role}
                    className="bg-gray-50 rounded-full py-1 px-3 text-xs text-gray-600"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </td>
            <td className="p-4 border-b border-gray-100">
              {course.slug ?? "—"}
            </td>
            <td className="p-4 border-b border-gray-100">
              <div className="flex gap-2">
                <button
                  type="button"
                  className="py-1.5 px-2.5 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5 hover:brightness-105 bg-blue-50 text-blue-800 shadow-none"
                  onClick={() => onSelect(course)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="py-1.5 px-2.5 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5 hover:brightness-105 bg-red-50 text-red-800 shadow-none disabled:opacity-50"
                  onClick={() => onDelete(course)}
                  disabled={deletingId === course.id}
                >
                  {deletingId === course.id ? "Deleting…" : "Delete"}
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
