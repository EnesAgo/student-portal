"use client";

import { MentoringPage } from "@/components/pages";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <MentoringPage />
    </ProtectedRoute>
  );
}
