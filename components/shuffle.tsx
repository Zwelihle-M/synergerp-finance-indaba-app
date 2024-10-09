/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Card } from "./ui/card";
import { Heading } from "@/components/ui/heading";
import ConfettiExplosion from "react-confetti-explosion";

interface Submission {
  submittedAt: string;
  values: Array<{ name: string; value: string }>;
  pageUrl: string;
}

const ShuffleWinner = () => {
  const [winner, setWinner] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const fetchSubmissionsAndPickWinner = async () => {
    setLoading(true);
    setError(null);
    setWinner(null); // Reset previous winner
    setShowConfetti(false); // Reset confetti
    try {
      const res = await fetch("/api/submissions");
      if (!res.ok) {
        throw new Error(`Failed to fetch submissions, status: ${res.status}`);
      }
      const data: Submission[] = await res.json();

      // Shuffle the submissions using Fisher-Yates algorithm
      const shuffledSubmissions = [...data];
      for (let i = shuffledSubmissions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledSubmissions[i], shuffledSubmissions[j]] = [
          shuffledSubmissions[j],
          shuffledSubmissions[i],
        ];
      }

      // Pick the first submission as the winner
      const winnerSubmission = shuffledSubmissions[0];

      // Extract the fields from the winnerSubmission
      const winnerFirstName =
        winnerSubmission.values.find((item) => item.name === "firstname")
          ?.value || "Unknown";
      const winnerLastName =
        winnerSubmission.values.find((item) => item.name === "lastname")
          ?.value || "Unknown";
      const winnerEmail =
        winnerSubmission.values.find((item) => item.name === "email")?.value ||
        "Unknown";

      setWinner({
        firstName: winnerFirstName,
        lastName: winnerLastName,
        email: winnerEmail,
      });
      setShowConfetti(true);
    } catch (err: any) {
      setError(err.message || "Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  // Hide confetti after 5 seconds
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <section className="pt-10">
      <div className="flex justify-between mb-10">
        <Heading size={"sm"}>Random Winner</Heading>
        <Button onClick={fetchSubmissionsAndPickWinner} disabled={loading}>
          {loading ? (
            <div className="flex items-center gap-x-3">
              <p>Loading...</p>
              <Loader className="animate-spin" size={24} />
            </div>
          ) : (
            "Pick a Random Winner"
          )}
        </Button>
        {error && <div className="text-rose-500 mb-5">{error}</div>}
      </div>
      <Card>
        <div className="relative p-5">
          {winner ? (
            <>
              <p className="text-lg">
                The winner is:{" "}
                <strong>
                  {winner.firstName} {winner.lastName}
                </strong>
              </p>
              <p className="text-lg">Email: {winner.email}</p>
              {showConfetti && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <ConfettiExplosion />
                </div>
              )}
            </>
          ) : (
            <p>No winner selected yet.</p>
          )}
        </div>
      </Card>
    </section>
  );
};

export default ShuffleWinner;
