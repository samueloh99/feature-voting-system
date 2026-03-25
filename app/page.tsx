import SubmitForm from "@/components/SubmitForm";
import FeatureList from "@/components/FeatureList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b border-white/60 bg-white/70 backdrop-blur-md sticky top-0 z-10">
        <div className="mx-auto max-w-2xl px-4 py-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-sm font-bold shadow-sm">
            ▲
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 leading-none">Feature Voting</h1>
            <p className="text-xs text-gray-400 mt-0.5">Vote for what gets built next</p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="mx-auto max-w-2xl px-4 pt-12 pb-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700 mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
          Community driven roadmap
        </div>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Shape the product
        </h2>
        <p className="mt-2 text-gray-500 text-sm max-w-md mx-auto">
          Submit features you want and vote for the ones that matter most to you.
        </p>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-2xl px-4 pb-20 flex flex-col gap-6">
        <SubmitForm />

        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-sm font-semibold text-gray-700">Most requested</h3>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <FeatureList />
        </div>
      </main>
    </div>
  );
}
