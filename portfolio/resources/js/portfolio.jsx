import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import SectionTitle from '@/Components/SectionTitle';
import SkillCard from '@/Components/SkillCard';
import ProjectCard from '@/Components/ProjectCard';

const projects = [
    { title: 'Student Portal', text: 'A login-based portal where students view grades and announcements.', tags: ['HTML', 'CSS', 'PHP', 'MySQL'] },
    { title: 'Task Tracker', text: 'A simple to-do app with filters, due dates and saved tasks in the browser.', tags: ['JavaScript', 'CSS'] },
    { title: 'Barangay Info Site', text: 'A mobile-friendly information site with news, services and a contact form.', tags: ['HTML', 'CSS', 'JavaScript'] },
];

const timeline = [
    { date: '2024 – Present', title: 'BS Information Technology', org: 'Your University', text: 'Coursework in web development, databases, networking and systems analysis.' },
    { date: '2026', title: 'Web Development Course Projects', org: 'IT ELEC01 – Advanced Web Development', text: 'Built a personal portfolio and a Laravel + Inertia + React CRUD application.' },
    { date: '2020 – 2024', title: 'Senior High School', org: 'Your School', text: 'Graduated with a strong interest in computers and programming.' },
];

export default function Portfolio({ skills }) {
    const [category, setCategory] = useState('All');
    const categories = ['All', ...new Set(skills.map((s) => s.category))];
    const visible = category === 'All' ? skills : skills.filter((s) => s.category === category);

    return (
        <div className="min-h-screen bg-[#040a1c] font-['IBM_Plex_Sans'] text-[#e6efff]">
            <Head title="Your Name | Web Developer Portfolio" />
            <Navbar />

            <main>
                {/* Hero */}
                <section
                    id="home"
                    className="flex min-h-screen items-center bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,rgba(47,123,255,.28),transparent_70%)] px-5 pt-24"
                >
                    <div className="mx-auto w-full max-w-5xl">
                        <p className="font-['Chakra_Petch'] text-xl text-[#3be0ff]">Hi, I'm</p>
                        <h1 className="font-['Chakra_Petch'] text-6xl font-bold drop-shadow-[0_0_30px_rgba(47,123,255,.6)] sm:text-7xl">
                            Your Name
                        </h1>
                        <p className="mt-3 font-['Chakra_Petch'] text-xl text-[#93a8d4]">
                            BSIT student and aspiring full-stack web developer
                        </p>
                        <p className="mt-4 max-w-xl text-[#93a8d4]">
                            I build clean, responsive websites and web apps. Right now I'm learning Laravel,
                            Inertia.js and React to build data-driven applications.
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <a href="#projects" className="rounded bg-gradient-to-br from-[#3be0ff] to-[#2f7bff] px-5 py-2.5 font-['Chakra_Petch'] font-semibold text-[#021028]">
                                View my projects
                            </a>
                            <a href="#contact" className="rounded border border-[#3be0ff] px-5 py-2.5 font-['Chakra_Petch'] font-semibold text-[#3be0ff]">
                                Get in touch
                            </a>
                        </div>
                    </div>
                </section>

                {/* About */}
                <section id="about" className="py-24">
                    <div className="mx-auto max-w-5xl px-5">
                        <SectionTitle>About me</SectionTitle>
                        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
                            <div className="grid h-52 w-52 place-items-center rounded-xl border border-[#3be0ff] bg-gradient-to-br from-[#0e1f47] to-[#040a1c] font-['Chakra_Petch'] text-5xl font-bold text-[#3be0ff]">
                                YN
                            </div>
                            <div className="max-w-2xl space-y-4 text-[#93a8d4]">
                                <p>
                                    I'm a BSIT student who enjoys turning ideas into working websites. I like the whole
                                    process: planning the layout, writing the code, and fixing the bugs along the way.
                                </p>
                                <p>
                                    Outside of class I practice by rebuilding interfaces I admire and experimenting with
                                    new tools. I'm looking for opportunities to grow as a developer and work with a team.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Skills: dynamic, loaded from the database */}
                <section id="skills" className="border-y border-[#1b3978] bg-[#0a1634] py-24">
                    <div className="mx-auto max-w-5xl px-5">
                        <SectionTitle>Skills</SectionTitle>

                        <div className="mb-7 flex flex-wrap gap-2">
                            {categories.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setCategory(c)}
                                    className={`rounded-full border px-4 py-1 text-sm transition ${
                                        c === category
                                            ? 'border-[#3be0ff] bg-[#3be0ff] text-[#021028]'
                                            : 'border-[#1b3978] text-[#93a8d4] hover:border-[#2f7bff]'
                                    }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>

                        {visible.length === 0 ? (
                            <p className="text-[#93a8d4]">No skills added yet.</p>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {visible.map((skill) => (
                                    <SkillCard key={skill.id} skill={skill} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Projects */}
                <section id="projects" className="py-24">
                    <div className="mx-auto max-w-5xl px-5">
                        <SectionTitle>Projects</SectionTitle>
                        <div className="grid gap-6 md:grid-cols-3">
                            {projects.map((p) => (
                                <ProjectCard key={p.title} {...p} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Experience and education */}
                <section id="experience" className="border-y border-[#1b3978] bg-[#0a1634] py-24">
                    <div className="mx-auto max-w-5xl px-5">
                        <SectionTitle>Experience and education</SectionTitle>
                        <ol className="ml-2 border-l-2 border-[#1b3978] pl-8">
                            {timeline.map((t) => (
                                <li key={t.title} className="relative pb-9 last:pb-0">
                                    <span className="absolute -left-[41px] top-2 h-3 w-3 rounded-full border-2 border-[#3be0ff] bg-[#040a1c] shadow-[0_0_10px_#3be0ff]" />
                                    <p className="font-['Chakra_Petch'] text-sm text-[#3be0ff]">{t.date}</p>
                                    <h3 className="font-['Chakra_Petch'] text-xl font-bold">{t.title}</h3>
                                    <p className="text-[#93a8d4]">{t.org}</p>
                                    <p className="mt-1 text-[#93a8d4]">{t.text}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* Contact */}
                <section id="contact" className="py-24">
                    <div className="mx-auto max-w-5xl px-5">
                        <SectionTitle>Contact</SectionTitle>
                        <p className="max-w-xl text-[#93a8d4]">
                            Have a project or an opportunity in mind? Email me at{' '}
                            <a href="mailto:yourname@email.com" className="text-[#3be0ff] hover:underline">
                                yourname@email.com
                            </a>{' '}
                            and I'll reply as soon as I can.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}