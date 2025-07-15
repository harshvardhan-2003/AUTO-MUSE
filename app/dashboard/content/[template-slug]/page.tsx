"use client"
import React, { useContext, useState } from 'react'
import { useParams } from 'next/navigation'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { createChatSession } from '@/utils/AiModel'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { useRouter } from 'next/navigation';

function CreateNewContent() {
  const { "template-slug": templateSlug } = useParams() as { "template-slug": string }
  const selectedTemplate: TEMPLATE | undefined = Templates.find((item) => item.slug === templateSlug)
  const [loading, setLoading] = useState(false)
  const [aiOutput, setAiOutput] = useState<string>('')
  const { user } = useUser();
  const router=useRouter();
  const [error, setError] = useState<string | null>(null)
  const {totalUsage, setTotalUsage}=useContext(TotalUsageContext);

  const GenerateAIContent = async (FormData: Record<string, any>) => {
     if(totalUsage >= 10000) {
      alert("Plase Upgrade");
      router.push('/dashboard/billing')
      return ;
     }

    if (!selectedTemplate?.aiPrompt) return setError('Template prompt is missing.')

    setLoading(true)
    setError(null)

    try {
      const FinalAIPrompt = `${selectedTemplate.aiPrompt}\n\nUser Input:\n${JSON.stringify(FormData, null, 2)}`
      const chatSession = await createChatSession()
      const result = await chatSession.sendMessage(FinalAIPrompt)
      const outputText = result.response.text()

      setAiOutput(outputText)
      await saveInDb(FormData, selectedTemplate.slug, outputText)
    } catch (err: any) {
      console.error('AI Generation Error:', err)
      setError('Something went wrong while generating content.')
    }

    setLoading(false)
  }

  const saveInDb = async (
  formData: any, 
  slug: string, 
  aiOutput: string
) => {
  try {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.warn("User email not found. Skipping DB save.")
      return
    }

    await db.insert(AIOutput).values({
      formData: formData,
      templateSlug: slug,
      aiResponse: aiOutput,
      createdBy: user.primaryEmailAddress.emailAddress,
      createdAt: new Date(),

    })

    console.log("AI output successfully saved to DB.")
  } catch (err) {
    console.error("DB Save Error:", err)
  }
}


  if (!selectedTemplate) {
    return <div className="p-5 text-red-600 font-semibold">⚠️ Invalid or missing template. Please go back and choose a valid one.</div>
  }

  return (
    <div className="p-5">
      <Link href="/dashboard">
        <Button><ArrowLeft className="mr-2" />Back</Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-5">
        {/* Form Section */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAIContent(v)}
          loading={loading}
        />

        {/* Output Section */}
        <div className="col-span-2">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  )
}

export default CreateNewContent
