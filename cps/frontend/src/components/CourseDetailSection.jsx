export const CourseDetailSection = ({ course }) => {
  if (!course) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 grid gap-6">
      <header className="grid gap-3">
        <h2 className="m-0 text-2xl">{course.title}</h2>
        <p className="m-0 text-gray-600">{course.description}</p>
        <div className="flex flex-wrap gap-2">
          {course.audience?.map((role) => (
            <span
              key={role}
              className="bg-gray-50 rounded-full py-1.5 px-3 text-xs text-gray-600"
            >
              {role}
            </span>
          ))}
        </div>
      </header>

      <section className="grid gap-4">
        {course.modules?.map((module) => (
          <article
            key={module.title}
            className="bg-white rounded-lg p-6 border border-gray-100 grid gap-3 shadow-none"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="m-0 mb-2">{module.title}</h3>
                {module.topics?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {module.topics.map((topic) => (
                      <span
                        key={topic}
                        className="bg-gray-50 rounded-full py-1.5 px-3 text-xs text-gray-600"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full py-1.5 px-3 bg-blue-50 text-blue-700">
                {module.classes?.length ?? 0} classes
              </span>
            </div>

            <div className="grid gap-3">
              {module.classes?.map((session) => (
                <div
                  key={session.title}
                  className="grid gap-1.5 border border-gray-100 rounded-lg p-3.5"
                >
                  <strong>{session.title}</strong>
                  <span className="text-gray-600">
                    {session.duration} minutes
                  </span>
                  {session.recordingUrl ? (
                    <a
                      href={session.recordingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold"
                    >
                      Watch recording ↗
                    </a>
                  ) : (
                    <span className="text-gray-400">Recording coming soon</span>
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
