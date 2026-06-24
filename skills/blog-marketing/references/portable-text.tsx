// ============================================================
// Portable Text Renderer — oghie_blog
// Renders Sanity rich text body in Next.js
// npm install @portabletext/react @sanity/image-url
// ============================================================

import { PortableText as SanityPortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { PortableTextBlock } from "@portabletext/types";

interface Props {
  value: PortableTextBlock[];
}

const components = {
  types: {
    image: ({ value }: { value: { asset: import("@sanity/image-url/lib/types/types").SanityImageSource; alt?: string; caption?: string } }) => (
      <figure className="my-8">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
          <Image
            src={urlFor(value.asset).width(1200).url()}
            alt={value.alt ?? ""}
            fill
            className="object-cover"
          />
        </div>
        {value.caption && (
          <figcaption className="text-center text-sm text-slate-500 mt-2">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    code: ({ value }: { value: { code: string; language?: string } }) => (
      <pre className="bg-slate-900 text-slate-100 rounded-xl p-6 overflow-x-auto my-6 text-sm">
        <code>{value.code}</code>
      </pre>
    ),
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value: { href: string } }) => (
      <a
        href={value.href}
        className="text-blue-600 underline underline-offset-2 hover:text-blue-800"
        target={value.href.startsWith("http") ? "_blank" : undefined}
        rel={value.href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-bold text-slate-900">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
      <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  block: {
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="text-lg font-semibold text-slate-900 mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="text-slate-700 leading-relaxed mb-5">{children}</p>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 italic text-slate-600 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside text-slate-700 space-y-2 mb-5 pl-4">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside text-slate-700 space-y-2 mb-5 pl-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }: { children: React.ReactNode }) => <li className="leading-relaxed">{children}</li>,
  },
};

export default function PortableText({ value }: Props) {
  return (
    <div className="prose-custom max-w-none">
      <SanityPortableText value={value} components={components} />
    </div>
  );
}
