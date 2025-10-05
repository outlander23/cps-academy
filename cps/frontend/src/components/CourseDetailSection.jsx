export const CourseDetailSection = ({ course }) => {
  if (!course) {
    return null;
  }

  return (
    <div className="backdrop-blur-md bg-white/90 rounded-2xl shadow-xl p-8 border border-gray-200/50 space-y-8">
      {/* Course Header */}
      <header className="space-y-4 pb-6 border-b border-gray-200">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {course.title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {course.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {course.audience?.map((role) => (
            <span
              key={role}
              className="inline-flex items-center gap-1.5 bg-purple-50 rounded-full py-2 px-4 text-sm font-medium text-purple-700 border border-purple-200"
            >
              👤 {role}
            </span>
          ))}
        </div>
      </header>

      {/* Modules */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          📚 Course Modules
        </h3>
        {course.modules?.map((module, idx) => (
          <article
            key={module.title}
            className="backdrop-blur-sm bg-white/70 rounded-xl p-6 border-2 border-gray-200 space-y-4 hover:shadow-lg transition-shadow duration-200"
          >
            {/* Module Header */}
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-sm">
                    {idx + 1}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 m-0">
                    {module.title}
                  </h3>
                </div>
                {module.topics?.length ? (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {module.topics.map((topic) => (
                      <span
                        key={topic}
                        className="bg-blue-50 rounded-full py-1.5 px-3 text-xs font-medium text-blue-700 border border-blue-200"
                      >
                        🏷️ {topic}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <span className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-bold rounded-full py-2 px-4 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200">
                📖 {module.classes?.length ?? 0} classes
              </span>
            </div>

            {/* Classes */}
            <div className="space-y-3 pl-11">
              {module.classes?.map((session, sessionIdx) => (
                <div
                  key={session.title}
                  className="space-y-2 border-l-4 border-blue-200 bg-gray-50/50 rounded-r-lg p-4 hover:bg-white hover:border-blue-400 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-3">
                    <strong className="text-gray-800 flex items-center gap-2">
                      <span className="text-gray-400 font-normal">
                        #{sessionIdx + 1}
                      </span>
                      {session.title}
                    </strong>
                    <span className="flex-shrink-0 text-sm text-gray-600 font-medium bg-white px-3 py-1 rounded-full border border-gray-200">
                      ⏱️ {session.duration} min
                    </span>
                  </div>
                  {session.recordingUrl ? (
                    <a
                      href={session.recordingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors"
                    >
                      🎥 Watch recording
                      <span className="hover:translate-x-1 transition-transform">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm italic">
                      📹 Recording coming soon
                    </span>
                  )}
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
