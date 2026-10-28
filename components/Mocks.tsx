// Small HTML illustrations of Otis IDE surfaces that have no screenshot yet.
// They mirror real app states; keep the copy in line with the app.

export function SessionsMock() {
  const rows = [
    { name: "Scout", color: "#e0457b", branch: "otis/audit-port-allocator", port: 3000, state: "Writing" },
    { name: "Mason", color: "#9bbf2e", branch: "otis/tighten-patch-copy", port: 3001, state: "Running tests" },
    { name: "Wren", color: "#2fbf8f", branch: "otis/fix-resume-queue", port: 3002, state: "Waiting on you" },
  ];
  return (
    <div className="mock mock-sessions" aria-hidden="true">
      <div className="mock-head"><span>Managed sessions</span><b>3 running</b></div>
      {rows.map((r) => (
        <div className="session-row" key={r.name}>
          <span className="avatar" style={{ background: r.color }}>{r.name.slice(0, 2).toUpperCase()}</span>
          <div className="session-main">
            <strong>{r.name}</strong>
            <code>{r.branch}</code>
            <small>own worktree · {r.branch.replace("otis/", "")}</small>
          </div>
          <div className="session-side">
            <span className="port">:{r.port}</span>
            <span className={`state${r.state === "Waiting on you" ? " state--wait" : ""}`}>{r.state}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SeatsMock() {
  const seats = [
    { name: "Scout", role: "Investigator", color: "#e0457b", perms: [["Read", true], ["Write", false], ["Run", true]] },
    { name: "Mason", role: "Builder", color: "#9bbf2e", perms: [["Read", true], ["Write", true], ["Run", true]] },
    { name: "Wren", role: "Reviewer", color: "#8b5cf6", perms: [["Read", true], ["Write", false], ["Run", false]] },
  ] as const;
  return (
    <div className="mock mock-seats" aria-hidden="true">
      <div className="mock-head"><span># port-allocator</span><b>3 seats</b></div>
      {seats.map((s) => (
        <div className="seat-row" key={s.name}>
          <span className="avatar" style={{ background: s.color }}>{s.name.slice(0, 2).toUpperCase()}</span>
          <div className="seat-main"><strong>@{s.name.toLowerCase()}</strong><small>{s.role}</small></div>
          <div className="perms">
            {s.perms.map(([label, on]) => (
              <span key={label} className={on ? "perm perm--on" : "perm"}>{label}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function InboxMock() {
  const items = [
    { kind: "Question", tone: "q", who: "Wren", text: "Hold the lock across worktree creation, or release it first?", room: "#port-allocator", age: "2m" },
    { kind: "Approval", tone: "a", who: "Mason", text: "Run npm install in otis/tighten-patch-copy", room: "#otis-ide", age: "6m" },
    { kind: "Patch", tone: "p", who: "Scout", text: "3 hunks in lib/agentWorkspace/ports.ts", room: "#port-allocator", age: "9m" },
    { kind: "Failed check", tone: "f", who: "Mason", text: "tests/ports.test.ts: 1 failing", room: "#otis-ide", age: "14m" },
  ];
  return (
    <div className="mock mock-inbox" aria-hidden="true">
      <div className="mock-head"><span>Needs You</span><b className="count">4</b></div>
      {items.map((it) => (
        <div className="inbox-row" key={it.text}>
          <span className={`tag tag--${it.tone}`}>{it.kind}</span>
          <div className="inbox-main">
            <p>{it.text}</p>
            <small>{it.who} in {it.room} · {it.age} ago</small>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ReviewMock() {
  return (
    <div className="mock mock-review" aria-hidden="true">
      <div className="mock-head"><span>lib/agentWorkspace/ports.ts</span><b>2 of 3 accepted</b></div>
      <div className="hunk is-accepted">
        <div className="hunk-head"><code>@@ -180,6 +180,8 @@ startManagedSession</code><span className="pill pill--ok">Accepted</span></div>
        <pre><span className="ln del">-  const port = await choosePort();</span><span className="ln add">+  const port = await serialized(async () =&gt; {"{"}</span><span className="ln add">+    return reservePort(await choosePort());</span><span className="ln add">+  {"}"});</span></pre>
      </div>
      <div className="hunk">
        <div className="hunk-head"><code>@@ -212,4 +214,4 @@ createWorktree</code><span className="hunk-actions"><span className="pill">Reject</span><span className="pill pill--primary">Accept</span></span></div>
        <pre><span className="ln del">-  await serialized(() =&gt; git.worktreeAdd(dir));</span><span className="ln add">+  await git.worktreeAdd(dir);</span></pre>
      </div>
      <div className="review-foot">Checkpoint taken before apply · stale hunks are refused, never guessed</div>
    </div>
  );
}

export function OfficeMock() {
  const desks = [
    { name: "Scout", color: "#e0457b", label: "Reading ports.ts", x: 22, y: 26 },
    { name: "Mason", color: "#9bbf2e", label: "npm test", x: 72, y: 22 },
    { name: "Wren", color: "#8b5cf6", label: "Waiting on you", x: 28, y: 70, wait: true },
    { name: "Claude", color: "#d97757", label: "Writing", x: 74, y: 66 },
  ];
  return (
    <div className="mock mock-office" aria-hidden="true">
      <div className="office-floor">
        {desks.map((d) => (
          <div key={d.name} className="desk" style={{ left: `${d.x}%`, top: `${d.y}%` }}>
            <span className={`bubble${d.wait ? " bubble--wait" : ""}`}>{d.label}</span>
            <span className="agent" style={{ background: d.color }} />
            <span className="desk-top" />
            <span className="desk-name">{d.name}</span>
          </div>
        ))}
      </div>
      <div className="office-code">
        <div className="code-tabs"><span className="on">ports.ts</span><span>session.ts</span></div>
        <pre>{`export async function startManagedSession(task) {
  const port = await serialized(async () => {
    return reservePort(await choosePort());
  });
  const dir = await createWorktree(task.branch);`}</pre>
      </div>
    </div>
  );
}
