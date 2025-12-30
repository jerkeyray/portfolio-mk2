import { ImageResponse } from "next/og";
import { allPosts } from "contentlayer/generated";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);

  const title = post?.title ?? "Blog";
  const excerpt = post?.excerpt ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0b0b0f",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 22, opacity: 0.85, marginBottom: 18 }}>
          jerkeyray.dev
        </div>
        <div style={{ fontSize: 52, fontWeight: 750, lineHeight: 1.12 }}>
          {title}
        </div>
        {excerpt ? (
          <div
            style={{
              marginTop: 22,
              fontSize: 26,
              opacity: 0.82,
              lineHeight: 1.25,
              maxWidth: 1000,
            }}
          >
            {excerpt}
          </div>
        ) : null}
      </div>
    ),
    size
  );
}
