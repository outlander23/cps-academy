import { useEffect, useMemo, useState } from "react";

const EMPTY_MODULE = () => ({
  title: "",
  topics: [""],
  classes: [
    {
      title: "",
      duration: 30,
      recordingUrl: "",
    },
  ],
});

export const CourseForm = ({ initialValue, onSubmit, submitting }) => {
  const [form, setForm] = useState(() => ({
    title: "",
    description: "",
    audience: ["normal"],
    modules: [EMPTY_MODULE()],
    ...initialValue,
  }));

  useEffect(() => {
    if (initialValue) {
      setForm((prev) => ({
        ...prev,
        ...initialValue,
      }));
    }
  }, [initialValue]);

  const audienceOptions = useMemo(
    () => ["normal", "student", "social-manager", "developer"],
    []
  );

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateModule = (index, nextModule) => {
    setForm((prev) => {
      const modules = [...prev.modules];
      modules[index] = nextModule;
      return { ...prev, modules };
    });
  };

  const addModule = () => {
    setForm((prev) => ({
      ...prev,
      modules: [...prev.modules, EMPTY_MODULE()],
    }));
  };

  const removeModule = (index) => {
    setForm((prev) => ({
      ...prev,
      modules: prev.modules.filter((_, idx) => idx !== index),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      audience: form.audience.filter(Boolean),
      modules: form.modules.map((module) => ({
        ...module,
        topics: module.topics.filter(Boolean),
        classes: module.classes.map((cls) => ({
          ...cls,
          duration: Number(cls.duration) || 0,
        })),
      })),
    };
    onSubmit(payload);
  };

  return (
    <form className="grid gap-6" onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="title"
            className="font-semibold text-gray-900 flex items-center gap-2"
          >
            📚 Course title
          </label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="Design Systems Mastery"
            required
            className="w-full py-3 px-3.5 rounded-xl border-2 border-gray-300 text-base transition focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-white hover:border-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="font-semibold text-gray-900 flex items-center gap-2"
          >
            📝 Description
          </label>
          <textarea
            id="description"
            rows={3}
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Give learners a reason to get excited. (min 10 characters)"
            required
            minLength={10}
            className="w-full py-3 px-3.5 rounded-xl border-2 border-gray-300 text-base transition focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-white hover:border-gray-400"
          />
          <small className="text-gray-600 flex items-center gap-1">
            {form.description.length < 10 ? (
              <span className="text-orange-600">
                ⚠️ Minimum 10 characters ({form.description.length}/10)
              </span>
            ) : (
              <span className="text-green-600">
                ✓ Valid ({form.description.length} characters)
              </span>
            )}
          </small>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="audience"
            className="font-semibold text-gray-900 flex items-center gap-2"
          >
            👥 Audience
          </label>
          <select
            id="audience"
            multiple
            value={form.audience}
            onChange={(event) =>
              updateField(
                "audience",
                Array.from(
                  event.target.selectedOptions,
                  (option) => option.value
                )
              )
            }
            className="w-full py-3 px-3.5 rounded-xl border-2 border-gray-300 text-base transition focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-white min-h-30 hover:border-gray-400"
          >
            {audienceOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <small className="text-gray-600">
            Hold <kbd>Ctrl</kbd> (Windows) or <kbd>Cmd</kbd> (Mac) to select
            multiple roles.
          </small>
        </div>
      </div>

      <section className="grid gap-5">
        {form.modules.map((module, index) => (
          <div
            key={index}
            className="backdrop-blur-sm bg-white/70 rounded-xl shadow-lg p-6 border-2 border-gray-200 space-y-4"
          >
            <header className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="m-0 text-lg font-bold text-gray-800 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm">
                  {index + 1}
                </span>
                Module {index + 1}
              </h3>
              {form.modules.length > 1 && (
                <button
                  type="button"
                  className="py-2 px-4 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 bg-red-50 text-red-700 hover:bg-red-100 hover:scale-105 shadow-md"
                  onClick={() => removeModule(index)}
                >
                  🗑️ Remove
                </button>
              )}
            </header>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-900 flex items-center gap-2">
                📖 Module title
              </label>
              <input
                type="text"
                value={module.title}
                onChange={(event) =>
                  updateModule(index, { ...module, title: event.target.value })
                }
                required
                className="w-full py-3 px-3.5 rounded-xl border-2 border-gray-300 text-base transition focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-white hover:border-gray-400"
              />
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-gray-900 flex items-center gap-2">
                🏷️ Topics
              </label>
              {module.topics.map((topic, topicIndex) => (
                <div key={topicIndex} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={topic}
                    onChange={(event) => {
                      const topics = [...module.topics];
                      topics[topicIndex] = event.target.value;
                      updateModule(index, { ...module, topics });
                    }}
                    placeholder="Design tokens"
                    className="flex-1 py-2.5 px-3.5 rounded-lg border-2 border-gray-300 text-sm transition focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-white hover:border-gray-400"
                  />
                </div>
              ))}
              <button
                type="button"
                className="py-2 px-4 rounded-lg border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:scale-105 shadow-sm"
                onClick={() =>
                  updateModule(index, {
                    ...module,
                    topics: [...module.topics, ""],
                  })
                }
              >
                ➕ Add topic
              </button>
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-gray-900 flex items-center gap-2">
                🎓 Classes
              </label>
              {module.classes.map((session, classIndex) => (
                <div
                  key={classIndex}
                  className="space-y-3 border-2 border-gray-200 bg-gray-50/50 rounded-lg p-4"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Class title
                    </label>
                    <input
                      type="text"
                      value={session.title}
                      onChange={(event) => {
                        const classes = [...module.classes];
                        classes[classIndex] = {
                          ...session,
                          title: event.target.value,
                        };
                        updateModule(index, { ...module, classes });
                      }}
                      placeholder="Sprint planning workshop"
                      className="w-full py-2.5 px-3.5 rounded-lg border-2 border-gray-300 text-sm transition focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-white hover:border-gray-400"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                      ⏱️ Duration (minutes)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={session.duration}
                      onChange={(event) => {
                        const classes = [...module.classes];
                        classes[classIndex] = {
                          ...session,
                          duration: event.target.value,
                        };
                        updateModule(index, { ...module, classes });
                      }}
                      className="w-full py-2.5 px-3.5 rounded-lg border-2 border-gray-300 text-sm transition focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-white hover:border-gray-400"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                      🎥 Recording URL
                    </label>
                    <input
                      type="url"
                      value={session.recordingUrl}
                      onChange={(event) => {
                        const classes = [...module.classes];
                        classes[classIndex] = {
                          ...session,
                          recordingUrl: event.target.value,
                        };
                        updateModule(index, { ...module, classes });
                      }}
                      placeholder="https://"
                      className="w-full py-2.5 px-3.5 rounded-lg border-2 border-gray-300 text-sm transition focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-white hover:border-gray-400"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="py-2 px-4 rounded-lg border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:scale-105 shadow-sm"
                onClick={() =>
                  updateModule(index, {
                    ...module,
                    classes: [
                      ...module.classes,
                      { title: "", duration: 30, recordingUrl: "" },
                    ],
                  })
                }
              >
                ➕ Add class
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="py-3 px-6 rounded-xl border-2 border-dashed border-blue-300 font-bold text-base inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:border-blue-400 hover:scale-105 shadow-md"
          onClick={addModule}
        >
          ➕ Add module
        </button>
      </section>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="submit"
          className="py-3.5 px-8 rounded-xl border-none font-bold text-base inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <span className="animate-spin">⏳</span> Saving…
            </>
          ) : (
            <>💾 Save course</>
          )}
        </button>
      </div>
    </form>
  );
};
