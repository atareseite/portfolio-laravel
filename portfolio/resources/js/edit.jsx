import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SkillForm from '@/Components/SkillForm';
import { Head } from '@inertiajs/react';

export default function Edit({ skill, categories }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit skill</h2>}
        >
            <Head title="Edit skill" />
            <div className="mx-auto max-w-xl p-6">
                <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                    <SkillForm skill={skill} categories={categories} submitLabel="Update skill" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}