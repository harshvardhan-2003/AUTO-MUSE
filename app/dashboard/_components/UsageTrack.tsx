"use client";

import { Button } from '@/components/ui/button';
import { db } from '@/utils/db'; 
import { AIOutput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import React, { useContext, useEffect } from 'react';
import { eq } from 'drizzle-orm';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';

// Define HISTORY type (matches AIOutput shape or relevant subset)
interface HISTORY {
  aiResponse: string;
  createdBy: string;
}

function UsageTrack() {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);

  useEffect(() => {
    if (user) {
      fetchUsageData();
    }
  }, [user]);

  // Fetch user usage data from the database
  const fetchUsageData = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      // Query AIOutput table for records created by this user's email
      const result: HISTORY[] = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress));

      calculateTotalUsage(result);
    } catch (error) {
      console.error("Failed to fetch usage data:", error);
    }
  };

  // Calculate total usage by summing length of aiResponse strings
  const calculateTotalUsage = (records: HISTORY[]) => {
    let total = 0;
    records.forEach(record => {
      total += record.aiResponse?.length || 0;
    });
    setTotalUsage(total);
    console.log("Total usage:", total);
  };

  return (
    <div className="m-5">
      <div className="bg-black p-3 text-white rounded-lg border border-gray-700">
        <h2 className="font-medium text-white">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{ width: `${(totalUsage / 10000) * 100}%` }}
          ></div>
        </div>
        <h2 className="text-sm my-2 text-white">{totalUsage}/10,000 Credit Used</h2>
      </div>
      <Button variant="secondary" className="text-primary w-full my-3">
        Upgrade
      </Button>
    </div>
  );
}

export default UsageTrack;
