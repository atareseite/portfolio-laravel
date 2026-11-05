import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SkillForm from '@/Components/SkillForm';
import { Head } from '@inertiajs/react';

export default function Create({ categories }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Add skill</h2>}
        >
            <Head title="Add skill" />
            <div className="mx-auto max-w-xl p-6">
                <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                    <SkillForm categories={categories} submitLabel="Save skill" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}