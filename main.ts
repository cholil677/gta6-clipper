// GTA 6 Clipper entrypoint (Node 22, standard library only).
//
// The entry is the video itself: this program only carries VIDEO.json from the
// repository root to /output/VIDEO.json, where the gate reads the video's
// address and scores its YouTube views. Nothing written here about the video
// is scored, so the file stays small and does exactly one job: read the
// address, check it looks like a YouTube address, and write it back out in
// one canonical shape. Two runs write the same bytes: no clock, no random,
// no network.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

/** A YouTube address: a Shorts, watch, or youtu.be link. Captures the video ID. */
const YOUTUBE_URL =
  /^https:\/\/(?:www\.youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)([A-Za-z0-9_-]+)/;

/**
 * The video ID in a YouTube address, or null when there is none.
 * A real YouTube video ID is exactly 11 characters; accepting any length
 * would let a typo'd or truncated ID (or a pasted playlist/channel address)
 * slip through and fail only at the gate.
 */
function videoId(url: string): string | null {
  const match = YOUTUBE_URL.exec(url);
  if (match === null) return null;
  const id = match[1];
  return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
}

function fail(message: string): never {
  console.error(`gta6-clipper: ${message}`);
  process.exit(1);
}

function main(): void {
  const source = join(BOT_DIR, 'VIDEO.json');
  let raw: string | undefined;
  try {
    raw = readFileSync(source, 'utf8');
  } catch (err) {
    fail(`cannot read ${source}: ${(err as Error).message}`);
  }
  if (raw === undefined) fail(`cannot read ${source}`);

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    fail(`${source} is not valid JSON`);
  }
  const record = parsed as { url?: unknown };
  if (typeof record !== 'object' || record === null || typeof record.url !== 'string') {
    fail(`${source} must hold {"url": "<youtube address>"}`);
  }
  if (videoId(record.url) === null) {
    fail(
      `${source} does not name a YouTube video with an 11-character video ID: ${record.url}`,
    );
  }

  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(join(OUTPUT_DIR, 'VIDEO.json'), `${JSON.stringify({ url: record.url })}\n`);
}

main();
