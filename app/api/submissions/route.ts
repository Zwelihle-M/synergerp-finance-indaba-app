/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

const HUBSPOT_API_URL = `https://api.hubapi.com/form-integrations/v1/submissions/forms/${process.env.HUBSPOT_API_FORM_ID}`;

interface HubspotSubmission {
  results: Array<{
    submittedAt: string;
    values: Record<string, any>;
  }>;
}

export async function GET() {
  const token = process.env.HUBSPOT_API_TOKEN;
  const formId = process.env.HUBSPOT_API_FORM_ID;

  if (!token) {
    return NextResponse.json({ error: 'API token is missing' }, { status: 500 });
  }

  if (!formId) {
    return NextResponse.json({ error: 'Form ID is missing' }, { status: 500 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000); // Set a timeout of 5 seconds

  try {
    const response = await fetch(HUBSPOT_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch submissions, status: ${response.status}` },
        { status: response.status }
      );
    }

    const data: HubspotSubmission = await response.json();

    // Return only the results array
    const submissions = data.results || [];

    return NextResponse.json(submissions, { status: 200 });
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return NextResponse.json({ error: 'Request timed out please try again' }, { status: 408 });
    }

    return NextResponse.json(
      { error: `Failed to fetch submissions: ${error.message}` },
      { status: 500 }
    );
  }
}




