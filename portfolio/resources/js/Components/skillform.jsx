import { Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

/**
 * Shared by Create and Edit.
 * Pass `skill` to edit; omit it to create.
 */
export default function SkillForm({ skill = null, categories, submitLabel }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: skill?.name ?? '',
        category: skill?.category ?? '',
        level: skill?.level ?? '',
        icon: skill?.icon ?? '',
        display_order: skill?.display_order ?? 0,
    });

    const submit = (e) => {
        e.preventDefault();
        if (skill) {
            put(route('skills.update', skill.id));
        } else {
            post(route('skills.store'));
        }
    };

    return (
        // noValidate: the server (Laravel) does the validating, so its messages show
        <form onSubmit={submit} noValidate className="space-y-5">
            <div>
                <InputLabel htmlFor="name" value="Skill name" />
                <TextInput
                    id="name"
                    className="mt-1 block w-full"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="category" value="Category" />
                <select
                    id="category"
                    value={data.category}
                    onChange={(e) => setData('category', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="">Select a category</option>
                    {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                <InputError message={errors.category} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="level" value="Proficiency (1-100)" />
                <TextInput
                    id="level"
                    inputMode="numeric"
                    className="mt-1 block w-full"
                    value={data.level}
                    onChange={(e) => setData('level', e.target.value)}
                />
                <InputError message={errors.level} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="icon" value="Icon text (up to 4 characters)" />
                <TextInput
                    id="icon"
                    className="mt-1 block w-full"
                    value={data.icon}
                    onChange={(e) => setData('icon', e.target.value)}
                />
                <InputError message={errors.icon} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="display_order" value="Display order" />
                <TextInput
                    id="display_order"
                    inputMode="numeric"
                    className="mt-1 block w-full"
                    value={data.display_order}
                    onChange={(e) => setData('display_order', e.target.value)}
                />
                <InputError message={errors.display_order} className="mt-2" />
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>{submitLabel}</PrimaryButton>
                <Link href={route('skills.index')} className="text-sm text-gray-600 underline">
                    Cancel
                </Link>
            </div>
        </form>
    );
}