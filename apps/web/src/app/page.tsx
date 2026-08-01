import { Button } from "../components/ui/button.js";

const modules = ["Organizations", "Users", "Factories", "Suppliers", "Products", "Inventory", "Orders", "Analytics"];

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <section className="mx-auto max-w-6xl rounded-2xl border border-border bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">TrimAtlas Product OS</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Enterprise operating system for product teams.</h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              Manage organizations, users, factories, suppliers, products, inventory, orders, and analytics from a secure tenant-aware workspace.
            </p>
            <div className="mt-6 flex gap-3">
              <Button>Open workspace</Button>
              <Button variant="secondary">View API status</Button>
            </div>
          </div>
          <div className="rounded-xl bg-slate-950 p-5 text-slate-50">
            <p className="text-sm text-slate-300">Platform status</p>
            <p className="mt-2 text-3xl font-bold">Backend bootstrap active</p>
            <p className="mt-3 text-sm text-slate-400">Auth, RBAC, PostgreSQL schema, Docker, and CI foundations are now represented in the monorepo.</p>
          </div>
        </div>
      </section>
      <section className="mx-auto mt-8 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((module) => (
          <article key={module} className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <h2 className="font-semibold">{module}</h2>
            <p className="mt-2 text-sm text-slate-600">Planned enterprise module with REST API, RBAC, audit logging, tests, and workflow support.</p>
          </article>
        ))}
      </section>
    </main>
  );
}
