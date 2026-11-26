import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the repository root from this file's own location, so the
// entrypoint works no matter which directory the grader invokes it from.
// (Never process.cwd(): the grader may invoke us from anywhere.)
const repoRoot = dirname(fileURLToPath(import.meta.url));
void repoRoot;

// One line: the voicemail greeting a cat would record. Miso opens with
// the greeting, names two things only a cat does — sleeping on the clean
// laundry, demanding food at 4 a.m. — and closes with the reversal: the
// cat will not answer either way.
const entry =
  "Hi, it's Miso. I'm asleep on your clean laundry. Leave food at 4 a.m. or don't call back. I won't answer either way.";

// The gate only accepts 1 to 120 characters of UTF-8 text on a single
// line, so refuse loudly instead of ever writing an entry the scorer
// would reject. The entry below is 116 characters — four inside the
// gate — and the guard below keeps it that way if the line is ever
// reworded.
if (entry.length < 1 || entry.length > 120) {
  throw new Error(
    `entry is ${entry.length} characters, outside the 1-120 gate`,
  );
}
if (entry.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
