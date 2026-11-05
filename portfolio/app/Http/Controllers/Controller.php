<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SkillController extends Controller
{
    private const CATEGORIES = ['Frontend', 'Backend', 'Tools'];

    public function index()
    {
        return Inertia::render('Skills/Index', [
            'skills' => Skill::orderBy('display_order')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Skills/Create', [
            'categories' => self::CATEGORIES,
        ]);
    }

    public function store(Request $request)
    {
        Skill::create($this->validated($request));

        return redirect()->route('skills.index')
            ->with('success', 'Skill added successfully.');
    }

    public function edit(Skill $skill)
    {
        return Inertia::render('Skills/Edit', [
            'skill' => $skill,
            'categories' => self::CATEGORIES,
        ]);
    }

    public function update(Request $request, Skill $skill)
    {
        $skill->update($this->validated($request, $skill));

        return redirect()->route('skills.index')
            ->with('success', 'Skill updated successfully.');
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();

        return redirect()->route('skills.index')
            ->with('success', 'Skill deleted successfully.');
    }

    /**
     * One place for the rules, shared by store() and update().
     * On update, unique() ignores the record being edited.
     */
    private function validated(Request $request, ?Skill $skill = null): array
    {
        return $request->validate([
            'name' => [
                'required', 'string', 'min:2', 'max:50',
                Rule::unique('skills', 'name')->ignore($skill?->id),
            ],
            'category'      => ['required', Rule::in(self::CATEGORIES)],
            'level'         => ['required', 'integer', 'between:1,100'],
            'icon'          => ['required', 'string', 'max:4'],
            'display_order' => ['required', 'integer', 'min:0'],
        ], [
            'name.required' => 'Please enter the skill name.',
            'name.unique'   => 'You already added this skill.',
            'level.between' => 'Proficiency must be a number from 1 to 100.',
            'level.integer' => 'Proficiency must be a whole number.',
            'icon.max'      => 'The icon can only be up to 4 characters, like "JS".',
            'category.in'   => 'Choose Frontend, Backend or Tools.',
        ]);
    }
}