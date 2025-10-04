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
          <label htmlFor="title" className="font-semibold text-gray-900">
            Course title
          </label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="Design Systems Mastery"
            required
            className="w-full py-3 px-3.5 rounded-xl border border-gray-300 text-base transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-semibold text-gray-900">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Give learners a reason to get excited."
            required
            className="w-full py-3 px-3.5 rounded-xl border border-gray-300 text-base transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="audience" className="font-semibold text-gray-900">
            Audience
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
            className="w-full py-3 px-3.5 rounded-xl border border-gray-300 text-base transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white min-h-30"
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
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 grid gap-4"
          >
            <header className="flex justify-between items-center">
              <h3 className="m-0">Module {index + 1}</h3>
              {form.modules.length > 1 && (
                <button
                  type="button"
                  className="py-2 px-3 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5 hover:brightness-105 bg-red-50 text-red-800 shadow-none"
                  onClick={() => removeModule(index)}
                >
                  Remove
                </button>
              )}
            </header>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-900">
                Module title
              </label>
              <input
                type="text"
                value={module.title}
                onChange={(event) =>
                  updateModule(index, { ...module, title: event.target.value })
                }
                required
                className="w-full py-3 px-3.5 rounded-xl border border-gray-300 text-base transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              />
            </div>

            <div className="grid gap-3">
              <label className="font-semibold">Topics</label>
              {module.topics.map((topic, topicIndex) => (
                <div key={topicIndex} className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={topic}
                    onChange={(event) => {
                      const topics = [...module.topics];
                      topics[topicIndex] = event.target.value;
                      updateModule(index, { ...module, topics });
                    }}
                    placeholder="Design tokens"
                    className="w-full py-3 px-3.5 rounded-xl border border-gray-300 text-base transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                  />
                </div>
              ))}
              <button
                type="button"
                className="py-2 px-3 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5 hover:brightness-105 bg-blue-50 text-blue-800 shadow-none justify-self-start"
                onClick={() =>
                  updateModule(index, {
                    ...module,
                    topics: [...module.topics, ""],
                  })
                }
              >
                Add topic
              </button>
            </div>

            <div className="grid gap-3">
              <label className="font-semibold">Classes</label>
              {module.classes.map((session, classIndex) => (
                <div
                  key={classIndex}
                  className="grid gap-3 border border-gray-100 rounded-lg p-4"
                >
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-gray-900">
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
                      className="w-full py-3 px-3.5 rounded-xl border border-gray-300 text-base transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-gray-900">
                      Duration (minutes)
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
                      className="w-full py-3 px-3.5 rounded-xl border border-gray-300 text-base transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-gray-900">
                      Recording URL
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
                      className="w-full py-3 px-3.5 rounded-xl border border-gray-300 text-base transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="py-2 px-3 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5 hover:brightness-105 bg-blue-50 text-blue-800 shadow-none justify-self-start"
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
                Add class
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="py-2 px-3 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5 hover:brightness-105 bg-blue-50 text-blue-800 shadow-none justify-self-start"
          onClick={addModule}
        >
          Add module
        </button>
      </section>

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          className="py-3 px-4.5 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5 hover:brightness-105 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? "Saving…" : "Save course"}
        </button>
      </div>
    </form>
  );
};
