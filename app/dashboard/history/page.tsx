import Templates from "@/app/(data)/Templates";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import React from "react";
import HistoryList, { HISTORY, TEMPLATE } from "./HistoryList";

async function HistoryPage() {
  const user = await currentUser();
  let HistoryListData: HISTORY[] = [];
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  if (userEmail) {
    const dbResults = await db
      .select()
      .from(AIOutput)
      .where(eq(AIOutput.createdBy, userEmail))
      .orderBy(desc(AIOutput.id));
    HistoryListData = dbResults.map((item: any) => {
      let createdAtStr = "";
      if (typeof item.createdAt === "string") {
        // Check if it's a valid date string
        const parsed = Date.parse(item.createdAt);
        createdAtStr = isNaN(parsed) ? "" : new Date(parsed).toISOString();
      } else if (item.createdAt instanceof Date) {
        createdAtStr = isNaN(item.createdAt.getTime()) ? "" : item.createdAt.toISOString();
      } else if (typeof item.createdAt === "number") {
        const date = new Date(item.createdAt);
        createdAtStr = isNaN(date.getTime()) ? "" : date.toISOString();
      } else if (item.createdAt && typeof item.createdAt.toDate === "function") {
        const date = item.createdAt.toDate();
        createdAtStr = isNaN(date.getTime()) ? "" : date.toISOString();
      }
      return {
        ...item,
        createdAt: createdAtStr,
      };
    });
  }

  const getTemplateName = (slug: string): TEMPLATE | undefined => {
    return Templates?.find((item) => item.slug === slug);
  };

  return (
    <div className="m-5 p-5 border rounded-lg bg-black text-white">
      <h2 className="font-bold text-3xl text-white">History</h2>
      <p className="text-white">Search your previously generated content</p>
      <div className="grid grid-cols-7 font-bold bg-secondary">
        <h2 className="col-span-2">TEMPLATE</h2>
        <h2 className="col-span-2">AI RESP</h2>
        <h2>DATE</h2>
        <h2>WORDS</h2>
        <h2>Copy</h2>
      </div>
      <HistoryList history={HistoryListData} templates={Templates} />
    </div>
  );
}

export default HistoryPage;
