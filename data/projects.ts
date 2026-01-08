export type Project = {
  title: string;
  description: string;
  tags: string[];
  /** Optional link to the live site */
  sourceLink?: string;
  /** Optional link to the GitHub repo */
  repoLink?: string;
};

export const projects: Project[] = [
  {
    title: "Mimori",
    description:
      "distributed kv store built in go using the raft consensus algorithm. explores leader election, log replication, snapshots, membership changes and observability.",
    tags: ["Go", "Raft", "gRPC", "Prometheus", "Grafana"],
    repoLink: "https://github.com/jerkeyray/mimori.git",
  },
  {
    title: "Pika Language Interpreter",
    description:
      "interpreter for my programming language written in go. built to learn parsing, evaluation and language design.",
    tags: ["Go", "Interpreters", "Parsing"],
    repoLink: "https://github.com/jerkeyray/pika-interpreter.git",
  },
  {
    title: "Yudoku",
    description:
      "a focused learning web app that turns youtube playlists into structured, finite courses. designed around progress, flow, and completion rather than engagement.",
    tags: ["Typescript", "Next.js", "Supabase", "Prisma", "Tailwind CSS"],
    sourceLink: "https://yudoku.jerkeyray.com/",
    repoLink: "https://github.com/jerkeyray/yudoku",
  },
  {
    title: "Walrus",
    description:
      "persistent key-value store in go with a custom write-ahead log. built to explore crash recovery, corruption handling, batching and log segmentation.",
    tags: ["Go"],
    repoLink: "https://github.com/jerkeyray/walrus.git",
  },
  {
    title: "Dory",
    description:
      "ffmpeg based video utility cli built in go. a small tool for experimenting with cli structure and file processing.",
    tags: ["Go", "ffmpeg", "CLI"],
    repoLink: "https://github.com/jerkeyray/dory.git",
  },
  {
    title: "Tokbuk",
    description:
      "token bucket rate limiter built in go. explores burst control, refill behavior and simple concurrency.",
    tags: ["Go"],
    repoLink: "https://github.com/jerkeyray/tokbuk.git",
  },
  {
    title: "Goober",
    description:
      "go file watcher that automatically reloads applications on save. a simple nodemon style utility for go development.",
    tags: ["Go", "CLI"],
    repoLink: "https://github.com/jerkeyray/goober.git",
  },
  {
    title: "Hookinator",
    description:
      "webhook manager with a go backend and a typescript interface. built to try out http handling, request routing and webhook utilities.",
    tags: ["Go", "Webhooks", "Next.js"],
    sourceLink: "https://hookinator.jerkeyray.com/",
    repoLink: "https://github.com/jerkeyray/hookinator.git",
  },
  {
    title: "GoStore",
    description:
      "redis style key value store written in go. built from scratch to learn request handling, in-memory storage and simple concurrency behavior.",
    tags: ["Go"],
    repoLink: "https://github.com/jerkeyray/gostore.git",
  },
];
