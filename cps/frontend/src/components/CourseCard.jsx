import { Link } from "react-router-dom";

export const CourseCard = ({ course, to }) => {
  return (
    <article className="group backdrop-blur-md bg-white/80 rounded-2xl shadow-lg p-6 border border-gray-200/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
              {course.title}
            </h3>
            <p className="text-gray-600 leading-relaxed line-clamp-2">
              {course.description}
            </p>
          </div>
          <span className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold rounded-full py-1.5 px-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200">
            📚 {course.slug ?? "course"}
          </span>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {course.audience?.length ? (
              course.audience.map((role) => (
                <span
                  key={role}
                  className="inline-flex items-center gap-1 bg-purple-50 rounded-full py-1 px-3 text-xs font-medium text-purple-700 border border-purple-200"
                >
                  👤 {role}
                </span>
              ))
            ) : (
              <span className="bg-gray-50 rounded-full py-1 px-3 text-xs text-gray-600">
                All roles
              </span>
            )}
          </div>
          <Link
            to={to}
            className="flex items-center gap-2 py-2 px-4 rounded-full font-semibold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg group-hover:scale-105"
          >
            View modules
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
};
