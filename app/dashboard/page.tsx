import React from "react";
import { Container } from "@/components/ui/container";

import Submissions from "@/components/submissions";
import SubmissionCharts from "@/components/submissionchart";

export default function DashboardPage() {
  return (
    <Container size={"twoxl"}>
      {" "}
    <main className="space-y-40 mb-40 relative">
    <Submissions />
    <SubmissionCharts/>
    </main>
    </Container>
  );
}
