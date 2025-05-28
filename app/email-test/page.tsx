"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

export default function EmailTestPage() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [response, setResponse] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setStatus("loading");
    
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, subject, message }),
      });
      
      const data = await res.json();
      console.log("API Response:", data);
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to send email");
      }
      
      setResponse(data);
      setStatus("success");
    } catch (error) {
      console.error("Error sending email:", error);
      setResponse(error instanceof Error ? { error: error.message } : { error: "An unknown error occurred" });
      setStatus("error");
    }
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Email Test Page</h1>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Send Test Email</CardTitle>
          <CardDescription>
            Test the Resend email API by filling out this form
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Important Note</AlertTitle>
            <AlertDescription>
              If the email sends successfully but doesn't appear in your Resend dashboard, check the following:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Verify your API key is correct</li>
                <li>Make sure you're using a verified domain or the default Resend sender</li>
                <li>Check if you're in test mode (emails won't be delivered to non-verified addresses)</li>
                <li>Check your spam folder</li>
              </ul>
            </AlertDescription>
          </Alert>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                type="email"
                placeholder="recipient@example.com"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Send Email"}
            </Button>
          </form>
        </CardContent>
        
        {(status === "success" || status === "error") && (
          <CardFooter className="flex flex-col items-start">
            <Alert variant={status === "success" ? "default" : "destructive"} className="w-full">
              {status === "success" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle>
                {status === "success" ? "Email sent successfully" : "Failed to send email"}
              </AlertTitle>
              <AlertDescription className="mt-2">
                <div className="mb-2">
                  {status === "success" ? 
                    "The API request was successful, but you may need to check your Resend dashboard or spam folder to verify delivery." : 
                    "There was an error sending the email. Please check the response below for details."}
                </div>
                <pre className="text-xs overflow-auto p-2 bg-slate-100 rounded-md max-h-60">
                  {JSON.stringify(response, null, 2)}
                </pre>
                
                {status === "success" && (
                  <div className="mt-4">
                    <Link 
                      href="https://resend.com/dashboard" 
                      target="_blank" 
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Check Resend Dashboard →
                    </Link>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          </CardFooter>
        )}
      </Card>
    </div>
  );
} 