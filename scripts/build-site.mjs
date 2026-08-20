import { spawnSync } from "node:child_process";

const command = process.platform === "win32" ? "npx.cmd" : "npx";
const args = process.env.VERCEL === "1" ? ["next", "build"] : ["vinext", "build"];
const result = spawnSync(command, args, { stdio: "inherit", env: process.env });

if (result.error) throw result.error;
process.exit(result.status ?? 1);
