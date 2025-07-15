"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export interface HISTORY {
  id: Number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}

export interface TEMPLATE {
  slug: string;
  name: string;
  icon: string;
}

interface HistoryListProps {
  history: HISTORY[];
  templates: TEMPLATE[];
}

const HistoryList: React.FC<HistoryListProps> = ({ history, templates }) => {
  return (
    <>
      {history.map((item, index) => {
        const template = templates.find((t) => t.slug === item.templateSlug);
        return (
          <React.Fragment key={item.id as any}>
            <div className="grid grid-cols-7 my-5 py-5 px-3">
              <h2 className="col-span-2 flex gap-2 items-center">
                <Image src={template?.icon || ""} width={25} height={25} alt="image" />
                {template?.name || item.templateSlug}
              </h2>
              <h2 className="col-span-2 line-clamp-3">{item?.aiResponse}</h2>
              <h2>{
                isNaN(new Date(item.createdAt).getTime())
                  ? 'N/A'
                  : new Date(item.createdAt).toLocaleString()
              }</h2>
              <h2>{item?.aiResponse.length}</h2>
              <h2>
                <Button
                  variant="ghost"
                  className="text-primary"
                  onClick={() => navigator.clipboard.writeText(item.aiResponse)}
                >
                  Copy
                </Button>
              </h2>
            </div>
            <hr />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default HistoryList; 