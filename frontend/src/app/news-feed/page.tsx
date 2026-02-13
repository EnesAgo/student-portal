import { Header } from "@/components/layout";

export default function NewsFeed() {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <h1 className="text-4xl font-bold text-gray-400">Coming Soon</h1>
        </div>
      </main>
    </div>
  );
}


