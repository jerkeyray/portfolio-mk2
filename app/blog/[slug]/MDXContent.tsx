"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";
import type { ComponentPropsWithoutRef, ComponentType } from "react";
import { Pre } from "../../components/mdx/Pre";

// Custom Image component for MDX that handles both local and external images
const MDXImage = (props: ComponentPropsWithoutRef<"img">) => {
  // For all images, use regular img tag (works for both local and external)
  // Local images should be in public/images/blog/ and referenced as /images/blog/filename.jpg
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={props.alt || ""}
      className="rounded-lg my-4 w-full"
      loading="lazy"
    />
  );
};

const mdxComponents = {
  Image: MDXImage,
  img: MDXImage,
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a {...props} className="text-accent underline underline-offset-4" />
  ),
  pre: Pre,
};

function MDXRenderer({
  Component,
}: {
  Component: ComponentType<{ components: typeof mdxComponents }>;
}) {
  return <Component components={mdxComponents} />;
}

export function MDXContent({ code }: { code: string }) {
  // useMDXComponent is a hook that returns a component - this is the standard contentlayer pattern
  // The component is stable for a given code string, so this is safe despite the React Compiler warning
  const Component = useMDXComponent(code);

  return (
    <div className="prose prose-neutral dark:prose-invert">
      <MDXRenderer Component={Component} />
    </div>
  );
}
