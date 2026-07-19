import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-display mt-8 text-2xl font-semibold text-[var(--brand-ink)]">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display mt-6 text-xl font-semibold text-[var(--brand-ink)]">{children}</h3>
    ),
    normal: ({ children }) => <p className="mt-4 leading-relaxed text-[var(--brand-muted)]">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mt-4 border-l-4 border-[var(--brand-indigo)] pl-4 italic text-[var(--brand-muted)]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--brand-muted)]">{children}</ul>,
    number: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-[var(--brand-muted)]">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} className="text-[var(--brand-indigo)] underline underline-offset-2">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const src = urlFor(value).width(1000).url();
      return (
        <figure className="my-6">
          <Image
            src={src}
            alt={value.alt || ""}
            width={1000}
            height={600}
            className="h-auto w-full rounded-xl object-cover"
          />
        </figure>
      );
    },
  },
};

export function RichBody({
  body,
  bodyText,
}: {
  body?: unknown;
  bodyText?: string;
}) {
  if (Array.isArray(body) && body.length > 0) {
    return <PortableText value={body} components={components} />;
  }
  if (bodyText) {
    return (
      <div className="prose-gridev">
        {bodyText.split("\n\n").map((para) => (
          <p key={para.slice(0, 32)}>{para}</p>
        ))}
      </div>
    );
  }
  return null;
}
