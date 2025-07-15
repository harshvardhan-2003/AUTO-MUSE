"use client"
import React, { useEffect, useRef, useState } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface props {
  aiOutput: string;
}

function OutputSection({ aiOutput }: props) {
  const editorRef:any = useRef<Editor>(null);
  const [copied, setCopied] = useState(false); // ✅ state for copy feedback

  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance) {
      editorInstance.setMarkdown(aiOutput);
    }
  }, [aiOutput]);

  const handleCopy = () => {
    const editorInstance = editorRef.current?.getInstance();
    if (!editorInstance) return;

    const html = editorInstance.getHTML();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";

    navigator.clipboard.writeText(plainText).then(() => {
      setCopied(true); // ✅ show copied
      setTimeout(() => setCopied(false), 1000); // ✅ revert after 1 sec
    });
  };

  return (
    <div className='bg-black text-white shadow-lg border rounded-md'>
      <div className='flex justify-between items-center p-5'>
        <h2 className='font-medium text-lg text-white'>Your Result</h2>
        <Button className='flex gap-2' onClick={handleCopy}>
          {copied ? (
            <>
              <Check className='w-4 h-4 text-green-600' /> Copied
            </>
          ) : (
            <>
              <Copy className='w-4 h-4' /> Copy
            </>
          )}
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your Result Will Appear Here"
        initialEditType="wysiwyg"
        height="600px"
        useCommandShortcut={true}
        onChange={() => {
          const content = editorRef.current?.getInstance().getMarkdown();
          console.log(content);
        }}
      />
    </div>
  );
}

export default OutputSection;
