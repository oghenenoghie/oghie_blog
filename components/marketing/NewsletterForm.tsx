"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2 } from "lucide-react";

const schema = z.object({
  name:  z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});
type FormData = z.infer<typeof schema>;

interface Props {
  compact?: boolean;
}

export default function NewsletterForm({ compact = false }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <CheckCircle size={40} style={{ color: "var(--color-teal-500)", margin: "0 auto 1rem" }} aria-hidden="true" />
        <h3 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-navy-900)", marginBottom: "0.5rem" }}>
          Check your inbox!
        </h3>
        <p style={{ fontSize: "0.9375rem", color: "var(--color-navy-500)" }}>
          We sent you a confirmation link. Click it to complete your subscription.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div style={{ display: "flex", flexDirection: compact ? "row" : "column", gap: "0.875rem", flexWrap: "wrap" }}>
        {!compact && (
          <div>
            <Label htmlFor="name" style={{ marginBottom: "0.375rem", display: "block" }}>Your name</Label>
            <Input id="name" placeholder="Patrick" {...register("name")} />
            {errors.name && <p style={{ fontSize: "0.75rem", color: "hsl(var(--destructive))", marginTop: "0.25rem" }}>{errors.name.message}</p>}
          </div>
        )}

        <div style={{ flex: 1 }}>
          {!compact && <Label htmlFor="email" style={{ marginBottom: "0.375rem", display: "block" }}>Email address</Label>}
          <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
          {errors.email && <p style={{ fontSize: "0.75rem", color: "hsl(var(--destructive))", marginTop: "0.25rem" }}>{errors.email.message}</p>}
        </div>

        <div style={{ display: "flex", alignItems: compact ? "center" : "flex-start", paddingTop: compact ? 0 : (errors.email ? 0 : "1.5rem") }}>
          <Button variant="cta" type="submit" disabled={status === "loading"} style={{ whiteSpace: "nowrap" }}>
            {status === "loading" ? (
              <><Loader2 size={16} className="animate-spin" aria-hidden="true" /> Subscribing…</>
            ) : (
              "Get free insights →"
            )}
          </Button>
        </div>
      </div>

      {status === "error" && (
        <p style={{ fontSize: "0.8125rem", color: "hsl(var(--destructive))", marginTop: "0.75rem" }}>
          Something went wrong. Please try again.
        </p>
      )}

      <p style={{ fontSize: "0.75rem", color: "var(--color-navy-400)", marginTop: "0.75rem" }}>
        No spam. Unsubscribe anytime. We respect your privacy.
      </p>
    </form>
  );
}
