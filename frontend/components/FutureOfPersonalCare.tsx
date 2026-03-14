export default function FutureOfPersonalCare() {
  return (
    <section className="w-full py-16 bg-gradient-to-r from-zinc-50 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800">
      <div className="max-w-5xl mx-auto px-4 flex flex-col gap-8 items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          Skincare You Can Trust
        </h2>
        <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-200 max-w-2xl mx-auto">
          Experience skincare built on trust, science, and transparency. Every
          formula is crafted for real results, using only proven ingredients—so
          you can feel confident in every step of your routine.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-6">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 border border-zinc-100 dark:border-zinc-800 flex flex-col gap-2 items-center">
            <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Transparency
            </span>
            <span className="text-zinc-700 dark:text-zinc-200 text-base">
              Full disclosure of ingredients used & their concentration
            </span>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 border border-zinc-100 dark:border-zinc-800 flex flex-col gap-2 items-center">
            <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Efficacy
            </span>
            <span className="text-zinc-700 dark:text-zinc-200 text-base">
              Formulations developed in our in-house laboratories
            </span>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 border border-zinc-100 dark:border-zinc-800 flex flex-col gap-2 items-center">
            <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Affordable
            </span>
            <span className="text-zinc-700 dark:text-zinc-200 text-base">
              Skincare, accessible to all
            </span>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 border border-zinc-100 dark:border-zinc-800 flex flex-col gap-2 items-center">
            <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Only the best
            </span>
            <span className="text-zinc-700 dark:text-zinc-200 text-base">
              Ingredients sourced from across the world
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
