// ============================================================
// Supabase TypeScript Types — oghie_blog
// Run: npx supabase gen types typescript --local > types/supabase.ts
// These are the hand-authored equivalents for reference.
// ============================================================

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      subscribers: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          subscribed_at: string;
          confirmed: boolean;
          confirmation_token: string;
          unsubscribed_at: string | null;
          tags: string[];
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          subscribed_at?: string;
          confirmed?: boolean;
          confirmation_token?: string;
          unsubscribed_at?: string | null;
          tags?: string[];
        };
        Update: Partial<Database["public"]["Tables"]["subscribers"]["Insert"]>;
      };
      post_views: {
        Row: {
          id: string;
          post_slug: string;
          viewed_at: string;
          referrer: string | null;
          country: string | null;
        };
        Insert: {
          id?: string;
          post_slug: string;
          viewed_at?: string;
          referrer?: string | null;
          country?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["post_views"]["Insert"]>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
  };
}

// ── Convenience types ─────────────────────────────────────
export type Subscriber = Database["public"]["Tables"]["subscribers"]["Row"];
export type NewSubscriber = Database["public"]["Tables"]["subscribers"]["Insert"];
export type PostView = Database["public"]["Tables"]["post_views"]["Row"];
export type NewPostView = Database["public"]["Tables"]["post_views"]["Insert"];
