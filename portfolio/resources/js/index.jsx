import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index({ skills }) {
    const { flash } = usePage().props;
    const [toDelete, setToDelete] = useState(null); // skill waiting for confirmation

    const confirmDelete = () => {
        router.delete(route('skills.destroy', toDelete.id), {
            preserveScroll: true,
            onFinish: () => setToDelete(null),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Skills</h2>
                    <Link
                        href={route('skills.create')}
                        className="rounded-md bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-gray-700"
                    >
                        Add skill
                    </Link>
                </div>
            }
        >
            <Head title="Skills" />

            <div className="mx-auto max-w-4xl p-6">
                {flash.success && (
                    <div className="mb-4 rounded border border-green-300 bg-green-50 p-3 text-green-800">
                        {flash.success}
                    </div>
                )}

                {skills.length === 0 ? (
                    <p className="text-gray-600">No skills yet. Add your first skill.</p>
                ) : (
                    <div className="overflow-x-auto bg-white shadow-sm sm:rounded-lg">
                        <table className="w-full text-left">
                            <thead className="border-b text-sm text-gray-600">
                                <tr>
                                    <th className="p-3">Icon</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Category</th>
                                    <th className="p-3">Level</th>
                                    <th className="p-3">Order</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {skills.map((skill) => (
                                    <tr key={skill.id} className="border-b last:border-0">
                                        <td className="p-3">{skill.icon}</td>
                                        <td className="p-3">{skill.name}</td>
                                        <td className="p-3">{skill.category}</td>
                                        <td className="p-3">{skill.level}%</td>
                                        <td className="p-3">{skill.display_order}</td>
                                        <td className="flex gap-4 p-3">
                                            <Link
                                                href={route('skills.edit', skill.id)}
                                                className="text-blue-600 underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => setToDelete(skill)}
                                                className="text-red-600 underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Delete confirmation */}
            <Modal show={toDelete !== null} onClose={() => setToDelete(null)} maxWidth="md">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Delete this skill?</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        "{toDelete?.name}" will be removed from your portfolio. This cannot be undone.
                    </p>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setToDelete(null)}>Cancel</SecondaryButton>
                        <DangerButton onClick={confirmDelete}>Delete skill</DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}