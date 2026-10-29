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
