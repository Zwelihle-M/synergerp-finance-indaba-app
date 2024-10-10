"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "./ui/card";
import { Heading } from "@/components/ui/heading";


interface Submission {
  submittedAt: string;
  values: Array<{ name: string; value: string }>;
  pageUrl: string;
}

const Submissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/submissions");
      if (!res.ok) {
        throw new Error(`Failed to fetch submissions, status: ${res.status}`);
      }
      const data: Submission[] = await res.json();
      setSubmissions(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to load submissions");
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <section className="pt-10">
      <div className="flex justify-between mb-10">
        {" "}
        <Heading size={"sm"} >
          Latest Submissions
        </Heading>
        <Button onClick={fetchSubmissions} disabled={loading}>
          {loading ? (
            <div className="flex items-center gap-x-3">
              <p>Loading...</p>
              <Loader className="animate-spin" size={24} />
            </div>
          ) : (
            "Load Submissions"
          )}
        </Button>
        {error && <div className="text-rose-500 mb-5">{error}</div>}
      </div>

     

      <Card>
        <div>
          {submissions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="w-[100px] text-lg
      "
                  >
                    Date
                  </TableHead>
                  <TableHead className="text-md">Email</TableHead>
                  <TableHead className="text-md">First Name</TableHead>
                  <TableHead className="text-md">Last Name</TableHead>
                  <TableHead className="text-md">Job Title</TableHead>
                  <TableHead className="text-md">Phone</TableHead>
                  <TableHead className="text-md">Industry</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {new Date(submission.submittedAt).toLocaleDateString(
                        "en-ZA"
                      )}
                    </TableCell>
                    <TableCell>
                      {
                        submission.values.find((item) => item.name === "email")
                          ?.value
                      }
                    </TableCell>
                    <TableCell>
                      {
                        submission.values.find(
                          (item) => item.name === "firstname"
                        )?.value
                      }
                    </TableCell>
                    <TableCell>
                      {
                        submission.values.find(
                          (item) => item.name === "lastname"
                        )?.value
                      }
                    </TableCell>
                    <TableCell>
                      {
                        submission.values.find(
                          (item) => item.name === "job_titles_finance"
                        )?.value
                      }
                    </TableCell>
                    <TableCell>
                      {
                        submission.values.find((item) => item.name === "phone")
                          ?.value
                      }
                    </TableCell>
                    <TableCell>
                      {
                        submission.values.find(
                          (item) => item.name === "industry_selection"
                        )?.value
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            !loading && <p>{""}</p>
          )}
        </div>
      </Card>
    </section>
  );
};

export default Submissions;



