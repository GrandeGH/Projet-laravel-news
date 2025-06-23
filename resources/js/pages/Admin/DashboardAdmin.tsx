import Layout from "@/layouts/DefaultLayout2"
import { usePage } from "@inertiajs/react"

export default function AdminDashboard({ stats }) {
    const { auth } = usePage().props

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-8 text-white">Tableau de bord administrateur</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <StatCard title="Utilisateurs" value={stats.users} />
                    <StatCard title="Articles" value={stats.articles} />
                    <StatCard title="Commentaires" value={stats.commentaires} />
                    <StatCard title="Catégories" value={stats.categories} />
                    <StatCard title="Tags" value={stats.tags} />

                </div>
            </div>
        </Layout>
    )
}

function StatCard({ title, value }) {
    return (
        <div className="bg-white/10 border border-white/20 text-white rounded-xl shadow p-6 text-center transition hover:scale-105 duration-100">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="text-5xl font-bold">{value}</p>
        </div>
    )
}
