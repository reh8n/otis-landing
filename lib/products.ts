export type ProductSlug = "personal" | "business" | "ide" | "ecosystem";

export type Product = {
  slug: ProductSlug;
  index: string;
  name: string;
  shortName: string;
  label: string;
  orbitCopy: string;
  summary: string;
  promise: string;
  screen: string;
  className: string;
  capabilities: Array<{ title: string; copy: string }>;
  upcoming: Array<{ title: string; copy: string; status?: "Planned" | "Exploring" }>;
};

export const products: Product[] = [
  {
    slug: "personal",
    index: "01",
    name: "Otis Personal",
    shortName: "Personal",
    label: "Your everyday AI",
    orbitCopy: "Remember & act",
    summary: "A private assistant that remembers your context, works across your Mac and connected apps, and asks before consequential actions.",
    promise: "A calmer way to remember, decide, and move everyday work forward.",
    screen: "Today",
    className: "personal",
    capabilities: [
      { title: "Personal context", copy: "Bring together the notes, files, conversations, and preferences you choose." },
      { title: "Connected action", copy: "Work across your Mac and connected services from one conversational surface." },
      { title: "Permission first", copy: "Review sensitive actions and destinations before Otis proceeds. Payments always stop with you." },
    ],
    upcoming: [
      { title: "Needs You and daily brief", copy: "Gather decisions that need your attention and shape a useful daily view of plans, tasks, and goals." },
      { title: "Approvals that wait for you", copy: "Hold consequential actions until you can review the details and decide when Otis should proceed." },
      { title: "Commitments and guided booking", copy: "Track promises and help move booking flows forward while keeping the final choice with you." },
    ],
  },
  {
    slug: "business",
    index: "02",
    name: "Otis Business",
    shortName: "Business",
    label: "Inventory intelligence",
    orbitCopy: "Find trapped cash",
    summary: "Inventory intelligence for trading and distribution teams, turning ERP exports into dead-stock findings and exact SKU actions.",
    promise: "See where cash is trapped in inventory and what to do next, with every number traceable.",
    screen: "Inventory",
    className: "business",
    capabilities: [
      { title: "Deterministic inventory math", copy: "Calculate from ERP exports with consistent financial logic that can be checked again." },
      { title: "Traceable SKU decisions", copy: "Move from dashboard signals to stop-reorder guidance and SKU-level drilldowns." },
      { title: "Governed reporting", copy: "Import, roll back, audit, and share English reports with an Arabic executive summary." },
    ],
    upcoming: [
      { title: "Smarter import mapping", copy: "Use AI to help map unfamiliar columns while preserving deterministic financial calculations." },
      { title: "Broader ERP profile library", copy: "Explore additional export formats, with each profile added only after it is verified.", status: "Exploring" },
      { title: "UAE-resident workspaces", copy: "Offer hosted workspaces designed for teams that require UAE data residency." },
    ],
  },
  {
    slug: "ide",
    index: "03",
    name: "Otis IDE",
    shortName: "IDE",
    label: "Build with a team of agents",
    orbitCopy: "Build together",
    summary: "A focused environment where agents discuss, plan, review, and work together on real projects under your direction.",
    promise: "Give capable agents a shared room, a real project, and boundaries you can see.",
    screen: "Agent room",
    className: "ide",
    capabilities: [
      { title: "Agent rooms", copy: "Bring multiple models and local subscription seats into one focused project conversation." },
      { title: "Mission control", copy: "Assign bounded work with budgets, time limits, project permissions, and an overseer." },
      { title: "Reviewable changes", copy: "Inspect proposed patches, compare attempts, and apply only the result you choose." },
    ],
    upcoming: [
      { title: "Editor, explorer, and search", copy: "Bring project navigation and focused editing into the same workspace as the agent room." },
      { title: "Terminal, tests, and live preview", copy: "Run and inspect the project without leaving the governed workspace." },
      { title: "Durable sessions and Git", copy: "Add checkpoints, session continuity, and version-control flows for longer missions." },
    ],
  },
  {
    slug: "ecosystem",
    index: "04",
    name: "Otis Ecosystem",
    shortName: "Ecosystem",
    label: "One home for every Otis",
    orbitCopy: "Manage it all",
    summary: "The lightweight hub for installing, opening, updating, and caring for the Otis products on your Mac.",
    promise: "Keep every Otis product easy to find, install, update, and understand.",
    screen: "My apps",
    className: "hub",
    capabilities: [
      { title: "One app shelf", copy: "See which Otis products are installed, running, and ready to open." },
      { title: "Safe housekeeping", copy: "Review reclaimable files with real sizes and remove only what you select." },
      { title: "Local installers", copy: "Install registered Otis releases while protecting source code and personal data." },
    ],
    upcoming: [
      { title: "Updates in place", copy: "Update registered apps safely once their repositories have verified release remotes." },
      { title: "Shared release center", copy: "Keep versions, release notes, installers, and update readiness in one clear place." },
      { title: "Otis Create in the hub", copy: "Bring the separate Otis Create experience into the ecosystem catalog when it is ready." },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
