// ============================================================
// Portable Text Renderer — oghie_blog
// Renders Sanity rich text body in Next.js
// npm install @portabletext/react @sanity/image-url
// ============================================================

import { PortableText as SanityPortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface Props {
  value: PortableTextBlock[];
}

const components: PortableTextComponents = {
  types: {
    image: (props) => {
      const value = props.value as { asset: SanityImageSource; alt?: string; caption?: string };
      return (
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
      );
    },
    code: (props) => {
      const value = props.value as { code: string; language?: string };
      return (
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-6 overflow-x-auto my-6 text-sm">
          <code>{value.code}</code>
        </pre>
      );
    },
  },
  marks: {
    link: (props) => {
      const href = (props.value as { href?: string })?.href ?? "#";
      return (
        <a
          href={href}
          className="text-blue-600 underline underline-offset-2 hover:text-blue-800"
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {props.children}
        </a>
      );
    },
    strong: (props) => <strong className="font-bold text-slate-900">{props.children}</strong>,
    em: (props) => <em className="italic">{props.children}</em>,
    code: (props) => (
      <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono">
        {props.children}
      </code>
    ),
  },
  block: {
    h2: (props) => <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">{props.children}</h2>,
    h3: (props) => <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">{props.children}</h3>,
    h4: (props) => <h4 className="text-lg font-semibold text-slate-900 mt-6 mb-2">{props.children}</h4>,
    normal: (props) => <p className="text-slate-700 leading-relaxed mb-5">{props.children}</p>,
    blockquote: (props) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 italic text-slate-600 my-6">
        {props.children}
      </blockquote>
    ),
  },
  list: {
    bullet: (props) => (
      <ul className="list-disc list-inside text-slate-700 space-y-2 mb-5 pl-4">{props.children}</ul>
    ),
    number: (props) => (
      <ol className="list-decimal list-inside text-slate-700 space-y-2 mb-5 pl-4">{props.children}</ol>
    ),
  },
  listItem: {
    bullet: (props) => <li className="leading-relaxed">{props.children}</li>,
    number: (props) => <li className="leading-relaxed">{props.children}</li>,
  },
};

export default function PortableText({ value }: Props) {
  return (
    <div className="prose-custom max-w-none">
      <SanityPortableText value={value} components={components} />
    </div>
  );
}
