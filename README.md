<div align="center">
<h1>📊 GitHub Studio Insights 🚀</h1>

<p>
A YouTube Studio-inspired analytics dashboard for GitHub repositories.
Track your 14-day visibility (views, unique visitors, clones), discover top-performing repositories, monitor traffic sources, and compare growth trends — all in one modern private dashboard powered by Next.js + Vercel.
</p>

<!-- Badges -->

</div>

<!-- Screenshots -->

<hr>

<h2>✨ Features</h2>
<ul>
  <li><strong>YouTube Studio-like UI</strong>: Sidebar layout, modern cards, rounded components, and quick visual hierarchy.</li>
  <li><strong>14-Day Visibility Overview</strong>: Total views, unique visitors, clones, and trend chart.</li>
  <li><strong>Repository Rankings</strong>: Top by score, top by views, top by community (stars + forks).</li>
  <li><strong>Traffic Insights</strong>: Referrers chart (traffic sources) + popular paths chart.</li>
  <li><strong>Top Performing Repositories</strong>: Period-over-period growth indicators (↑ / ↓).</li>
  <li><strong>Search & Filter</strong>: Filter repositories and switch period (7d / 14d).</li>
  <li><strong>Theme Mode</strong>: Light / Dark / Auto with persisted preference.</li>
  <li><strong>Private by Design</strong>: GitHub token is server-side only via environment variables.</li>
</ul>

<h2>🧠 Data Source Notes</h2>
<ul>
  <li>Data is fetched from GitHub Traffic API endpoints (<code>/traffic/views</code>, <code>/traffic/clones</code>, <code>/traffic/popular/referrers</code>, <code>/traffic/popular/paths</code>).</li>
  <li><strong>Geographic/region analytics are not exposed</strong> by GitHub Traffic API.</li>
  <li>The dashboard focuses on repositories with traffic data available.</li>
</ul>

<h2>🛠️ Tech Stack</h2>
<ul>
  <li><strong>Framework:</strong> Next.js (App Router, TypeScript)</li>
  <li><strong>Styling:</strong> Tailwind CSS</li>
  <li><strong>Charts:</strong> Recharts</li>
  <li><strong>Icons:</strong> Lucide React</li>
  <li><strong>Deployment:</strong> Vercel</li>
</ul>

<h2>⚡ Local Development</h2>
<ol>
  <li><strong>Clone the repository</strong></li>
</ol>

```bash
git clone https://github.com/R0mb0/GitHub_Studio_Insights.git
cd GitHub_Studio_Insights
npm install
```

<ol start="2">
  <li><strong>Create environment file</strong> in project root:</li>
</ol>

```bash
# .env.local
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxx
GITHUB_USERNAME=your github name
```

<ol start="3">
  <li><strong>Run the app</strong></li>
</ol>

```bash
npm run dev
```

<p>Open <code>http://localhost:3000</code></p>

<h2>🚀 Deploy on Vercel (Step-by-step)</h2>
<ol>
  <li>Push your code to GitHub (<code>main</code> branch).</li>
  <li>Go to <a href="https://vercel.com/new">Vercel → New Project</a>.</li>
  <li>Import <code>R0mb0/GitHub_Studio_Insights</code>.</li>
  <li>Set the <strong>Root Directory</strong> correctly (folder containing <code>package.json</code>).</li>
  <li>Add Environment Variables in Vercel Project Settings:
    <ul>
      <li><code>GITHUB_TOKEN</code> = your token</li>
      <li><code>GITHUB_USERNAME</code> = <code>your github name</code></li>
    </ul>
  </li>
  <li>Deploy.</li>
  <li>After any env update, run <strong>Redeploy</strong>.</li>
</ol>

<h2>🧩 Suggested Repository Structure</h2>

```text
src/
  app/
    page.tsx
  components/
    app-shell.tsx
    dashboard-client.tsx
    kpi-card.tsx
    repo-table.tsx
    trend-chart.tsx
    referrers-chart.tsx
    popular-paths-chart.tsx
    top-performing-list.tsx
    theme-toggle.tsx
  lib/
    github.ts
    dashboard.ts
```

<a href="https://github.com/R0mb0/Crafted_with_AI">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/R0mb0/Crafted_with_AI/blob/main/Badge/SVG/CraftedWithAIDark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/R0mb0/Crafted_with_AI/blob/main/Badge/SVG/NotMadeByAILight.svg">
    <img alt="Not made by AI" src="https://github.com/R0mb0/Crafted_with_AI/blob/main/Badge/SVG/NotMadeByAIDefault.svg">
  </picture>
</a>
