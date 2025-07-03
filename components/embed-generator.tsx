"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Badge } from "./ui/badge"
import { Copy, Check, Brain } from "lucide-react"

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

  const scriptCode = `<!-- ASVA AI Referral Tracking Script -->
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
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <img src="/asva-logo.png" alt="ASVA AI Logo" className="h-6 w-6" />
          </div>
          <CardTitle className="text-white">Embed Code</CardTitle>
        </div>
        <CardDescription className="text-gray-300">
          Add ASVA AI referral tracking to your website or dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Badge
            variant={embedType === "widget" ? "default" : "outline"}
            className={`cursor-pointer ${
              embedType === "widget" 
                ? "bg-white text-black" 
                : "border-gray-700 text-gray-300"
            }`}
            onClick={() => setEmbedType("widget")}
          >
            Widget
          </Badge>
          <Badge
            variant={embedType === "script" ? "default" : "outline"}
            className={`cursor-pointer ${
              embedType === "script" 
                ? "bg-white text-black" 
                : "border-gray-700 text-gray-300"
            }`}
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
            className="font-mono text-sm bg-gray-800 border-gray-700 text-white"
          />

          <Button
            onClick={() => copyToClipboard(embedType === "widget" ? widgetCode : scriptCode)}
            className="w-full bg-white text-black hover:bg-gray-100"
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

        <div className="text-sm text-gray-300">
          {embedType === "widget" ? (
            <p>Embed this iframe to display your ASVA AI referral dashboard on any website.</p>
          ) : (
            <p>Add this script to your website to automatically track AI referrals in GA4 with ASVA AI.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
