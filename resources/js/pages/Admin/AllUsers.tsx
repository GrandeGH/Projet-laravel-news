import Layout from "@/layouts/DefaultLayout2"



export default function AllUsers( { users }) {

    return(
        <Layout>
             <div className="p-6 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-white">Liste des utilisateurs</h1>

                <div className="overflow-x-auto rounded-sm shadow">
                    <table className="min-w-full bg-green-200/10 ">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 tracking-wider">Pseudo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 tracking-wider">Rôle</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 tracking-wider">Date de création</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-500 transition duration-500">
                                    <td className="px-6 py-4 text-sm text-white">{user.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-300">{user.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-300">{user.role}</td>
                                    <td className="px-6 py-4 text-sm text-gray-400">
                                        {new Date(user.created_at).toLocaleDateString('fr-FR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}