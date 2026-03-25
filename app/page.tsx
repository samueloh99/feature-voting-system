import SubmitForm from "@/components/SubmitForm";
import FeatureList from "@/components/FeatureList";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Feature Voting</h1>
        <p className="mt-1 text-sm text-gray-500">
          Submit and upvote features you&apos;d like to see built.
        </p>
      </div>

      <SubmitForm />
      <FeatureList />
    </main>
  );
}
