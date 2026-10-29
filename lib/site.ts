// Every outbound link points at the public storefront repo. The app source is
// private, so nothing on this site may link to reh8n/otis-ide.
const releasesRepo = "https://github.com/reh8n/otis-ide-releases";

export const links = {
  download: `${releasesRepo}/releases/latest`,
  releases: `${releasesRepo}/releases`,
  repo: releasesRepo,
  issues: `${releasesRepo}/issues`,
  newIssue: `${releasesRepo}/issues/new`,
  discussions: `${releasesRepo}/discussions`,
};

export const pitch =
  "Run a fleet of Claude Code and Codex agents in parallel on your Mac, each in its own worktree, branch and port. Free, uses your existing subscription.";

// Launch video slot. When the film is ready, drop it in public/launch/ and set
// `src` (and optionally `poster`); the hero swaps the screenshot loop for it.
export const launchVideo: { src: string | null; poster: string | null } = {
  src: null,
  poster: null,
};
