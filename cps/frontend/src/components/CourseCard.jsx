import { Link } from "react-router-dom";

export const CourseCard = ({ course, to }) => {
  return (
    <article className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 grid gap-4">
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="m-0 mb-2 text-xl">{course.title}</h3>
          <p className="m-0 text-gray-600">{course.description}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full py-1.5 px-3 bg-blue-50 text-blue-700">
          {course.slug ?? "course"}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {course.audience?.length ? (
            course.audience.map((role) => (
              <span
                key={role}
                className="bg-gray-50 rounded-full py-1.5 px-3 text-xs text-gray-600"
              >
                {role}
              </span>
            ))
          ) : (
            <span className="bg-gray-50 rounded-full py-1.5 px-3 text-xs text-gray-600">
              role based
            </span>
          )}
        </div>
        <Link
          to={to}
          className="py-3 px-4.5 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5 hover:brightness-105 bg-blue-50 text-blue-800 shadow-none"
        >
          View modules
        </Link>
      </div>
    </article>
  );
};
