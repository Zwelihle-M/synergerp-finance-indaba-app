// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState, useEffect } from "react";
// import { Card } from "./ui/card";
// import { Heading } from "@/components/ui/heading";
// import { Loader } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
 
//   PieChart,
//   Pie,
//   Cell,

//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// interface Submission {
//   submittedAt: string;
//   values: Array<{ name: string; value: string }>;
//   pageUrl: string;
// }

// const SubmissionCharts = () => {
//   const [submissions, setSubmissions] = useState<Submission[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchSubmissions();
//   }, []);

//   const fetchSubmissions = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch("/api/submissions");
//       if (!res.ok) {
//         throw new Error(`Failed to fetch submissions, status: ${res.status}`);
//       }
//       const data: Submission[] = await res.json();
//       setSubmissions(data);
//     } catch (err: any) {
//       setError(err.message || "Failed to load submissions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const totalSubmissions = submissions.length;

//   const industryCounts: { [key: string]: number } = {};
//   const jobTitleCounts: { [key: string]: number } = {};

//   submissions.forEach((submission) => {
//     const industry =
//       submission.values.find(
//         (item) => item.name === "industry_selection"
//       )?.value || "Unknown";
//     const jobTitle =
//       submission.values.find(
//         (item) => item.name === "job_titles_finance"
//       )?.value || "Unknown";

//     industryCounts[industry] = (industryCounts[industry] || 0) + 1;
//     jobTitleCounts[jobTitle] = (jobTitleCounts[jobTitle] || 0) + 1;
//   });

//   const industryData = Object.entries(industryCounts).map(([name, value]) => ({
//     name,
//     value,
//   }));
//   const jobTitleData = Object.entries(jobTitleCounts).map(([name, value]) => ({
//     name,
//     value,
//   }));

//   const COLORS = [
//     "#0088FE",
//     "#00C49F",
//     "#FFBB28",
//     "#FF8042",
//     "#A569BD",
//     "#CD6155",
//     "#5499C7",
//     "#48C9B0",
//     "#F4D03F",
//     "#DC7633",
//   ];

//   return (
//     <section className="pt-10">
//       <div className="flex justify-between mb-10">
//         <Heading size={"sm"}>Submission Statistics</Heading>
//         <Button onClick={fetchSubmissions} disabled={loading}>
//           {loading ? (
//             <div className="flex items-center gap-x-3">
//               <p>Loading...</p>
//               <Loader className="animate-spin" size={24} />
//             </div>
//           ) : (
//             "Refresh Data"
//           )}
//         </Button>
//         {error && <div className="text-rose-500 mb-5">{error}</div>}
//       </div>

//       {loading ? (
//         <div className="flex items-center justify-center">
//           <Loader className="animate-spin" size={48} />
//         </div>
//       ) : (
//         <div>
//           {/* Total Submissions */}
//           <Card className="mb-6 p-4 flex items-center gap-4">
//             <Heading size={"sm"}>Total Submissions</Heading>
//             <p className="text-2xl ">{totalSubmissions}</p>
//           </Card>
//           {/* over time */}
//           <Card className="mb-6 p-4">
//       <Heading size={"sm"}>Submissions Over Time</Heading>
    
//     </Card>

//           {/* Industry Distribution */}
//           <Card className="mb-6 p-4">
//             <Heading size={"sm"}>Industry Distribution</Heading>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={industryData}
//                   dataKey="value"
//                   nameKey="name"
//                   outerRadius={100}
//                   label
//                 >
//                   {industryData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </Card>
//           {/*  */} <Card className="mb-6 p-4">
//             <Heading size={"sm"}>Job Title Distribution</Heading>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={jobTitleData}
//                   dataKey="value"
//                   nameKey="name"
//                   outerRadius={100}
//                   label
//                 >
//                   {jobTitleData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </Card>

//           {/* Job Title Distribution */}
//           {/* <Card className="mb-6">
//             <Heading size={"sm"} spacing={"md"}>Job Title Distribution</Heading>
//             <ResponsiveContainer width="100%" height={400}>
//               <BarChart
//                 data={jobTitleData}
//                 margin={{ top: 5, right: 20, left: 10, bottom: 60 }}
//               >
                
//                 <YAxis allowDecimals={false} />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="value" fill="#82ca9d">
//                   {jobTitleData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </Card> */}
//         </div>
//       )}
//     </section>
//   );
// };

// export default SubmissionCharts;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useMemo } from "react";
import { Card } from "./ui/card";
import { Heading } from "@/components/ui/heading";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Submission {
  submittedAt: string;
  values: Array<{ name: string; value: string }>;
  pageUrl: string;
}

const SubmissionCharts = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/submissions", {
        cache: "no-store", // Ensure fresh data is fetched
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch submissions, status: ${res.status}`);
      }
      const data: Submission[] = await res.json();
      setSubmissions(data);
    } catch (err: any) {
      setError(err.message || "Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  const totalSubmissions = submissions.length;

  // Process submissions to get counts per date and cumulative submissions
  const submissionData = useMemo(() => {
    const countsByDate: { [key: string]: number } = {};

    submissions.forEach((submission) => {
      const date = new Date(submission.submittedAt).toLocaleDateString("en-ZA");
      countsByDate[date] = (countsByDate[date] || 0) + 1;
    });

    const data = Object.entries(countsByDate)
      .map(([date, count]) => ({ date, count }))
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

    // Compute cumulative count
    let cumulative = 0;
    const dataWithCumulative = data.map((item) => {
      cumulative += item.count;
      return { ...item, cumulative };
    });

    return dataWithCumulative;
  }, [submissions]);

  // Industry and Job Title Counts
  const industryCounts: { [key: string]: number } = {};
  const jobTitleCounts: { [key: string]: number } = {};

  submissions.forEach((submission) => {
    const industry =
      submission.values.find(
        (item) => item.name === "industry_selection"
      )?.value || "Unknown";
    const jobTitle =
      submission.values.find(
        (item) => item.name === "job_titles_finance"
      )?.value || "Unknown";

    industryCounts[industry] = (industryCounts[industry] || 0) + 1;
    jobTitleCounts[jobTitle] = (jobTitleCounts[jobTitle] || 0) + 1;
  });

  const industryData = Object.entries(industryCounts).map(([name, value]) => ({
    name,
    value,
  }));
  const jobTitleData = Object.entries(jobTitleCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A569BD",
    "#CD6155",
    "#5499C7",
    "#48C9B0",
    "#F4D03F",
    "#DC7633",
  ];

  return (
    <section className="pt-10">
      <div className="flex justify-between mb-10">
        <Heading size={"sm"}>Submission Statistics</Heading>
        <Button onClick={fetchSubmissions} disabled={loading}>
          {loading ? (
            <div className="flex items-center gap-x-3">
              <p>Loading...</p>
              <Loader className="animate-spin" size={24} />
            </div>
          ) : (
            "Refresh Data"
          )}
        </Button>
        {error && <div className="text-rose-500 mb-5">{error}</div>}
      </div>

      {loading ? (
        <div className="flex items-center justify-center">
          <Loader className="animate-spin" size={48} />
        </div>
      ) : (
        <div>
          {/* Total Submissions */}
          <Card className="mb-6 p-4 flex items-center gap-4">
            <Heading size={"sm"}>Total Submissions</Heading>
            <p className="text-2xl ">{totalSubmissions}</p>
          </Card>

          {/* Submissions Over Time */}
          <Card className="mb-6 p-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={submissionData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="count"
                  stroke="#8884d8"
                  name="Daily Submissions"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="cumulative"
                  stroke="#82ca9d"
                  name="Cumulative Submissions"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Industry Distribution */}
          <Card className="mb-6 p-4">
            <Heading size={"sm"} spacing={"sm"}>Industry Distribution</Heading>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={industryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {industryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Job Title Distribution */}
          <Card className="mb-6 p-4">
            <Heading size={"sm"} spacing={"sm"}>Job Title Distribution</Heading>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={jobTitleData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {jobTitleData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}
    </section>
  );
};

export default SubmissionCharts;

