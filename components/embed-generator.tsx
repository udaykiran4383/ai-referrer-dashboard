"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Copy, Check } from "lucide-react"

interface EmbedGeneratorProps {
  measurementId: string
}

export function EmbedGenerator({ measurementId }: EmbedGeneratorProps) {
  const [copied, setCopied] = useState(false)
  const [embedType, setEmbedType] = useState<"widget" | "script">("widget")

  const widgetCode = `<iframe 
  src="${typeof window !== "undefined" ? window.location.origin : ""}/embed?id=${measurementId}" 
  width="100%" 
  height="400" 
  frameborder="0">
</iframe>`

  const scriptCode = `<!-- AI Referrer Tracking Script -->
<script>
(function() {
  const aiSources = [
    'chat.openai.com',
    'perplexity.ai', 
    'bard.google.com',
    'you.com',
    'claude.ai',
    'copilot.microsoft.com'
  ];
  
  if (document.referrer) {
    const referrerDomain = new URL(document.referrer).hostname;
    const isAIReferral = aiSources.some(source => referrerDomain.includes(source));
    
    if (isAIReferral && typeof gtag !== 'undefined') {
      gtag('event', 'ai_referral_detected', {
        'ai_source': referrerDomain,
        'page_location': window.location.href
      });
    }
  }
})();
</script>`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Embed Code</CardTitle>
        <CardDescription>Add AI referral tracking to your website or dashboard</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Badge
            variant={embedType === "widget" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setEmbedType("widget")}
          >
            Widget
          </Badge>
          <Badge
            variant={embedType === "script" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setEmbedType("script")}
          >
            Tracking Script
          </Badge>
        </div>

        <div className="space-y-2">
          <Textarea
            value={embedType === "widget" ? widgetCode : scriptCode}
            readOnly
            rows={embedType === "widget" ? 5 : 15}
            className="font-mono text-sm"
          />

          <Button
            onClick={() => copyToClipboard(embedType === "widget" ? widgetCode : scriptCode)}
            className="w-full"
            variant="outline"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </>
            )}
          </Button>
        </div>

        <div className="text-sm text-gray-600">
          {embedType === "widget" ? (
            <p>Embed this iframe to display your AI referral dashboard on any website.</p>
          ) : (
            <p>Add this script to your website to automatically track AI referrals in GA4.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
