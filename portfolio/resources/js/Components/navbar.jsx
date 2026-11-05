import { Link, usePage } from '@inertiajs/react';

const links = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
    const { auth } = usePage().props;

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-[#1b3978] bg-[#040a1c]/85 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
                <a href="#home" className="font-['Chakra_Petch'] text-xl font-bold text-[#3be0ff]">
                    &lt;YourName /&gt;
                </a>
                <nav className="flex items-center gap-6 text-sm text-[#93a8d4]">
                    {links.map((l) => (
                        <a key={l.href} href={l.href} className="hidden transition hover:text-[#3be0ff] md:block">
                            {l.label}
                        </a>
                    ))}
                    <Link
                        href={auth.user ? route('skills.index') : route('login')}
                        className="rounded bg-gradient-to-br from-[#3be0ff] to-[#2f7bff] px-3 py-1 font-['Chakra_Petch'] font-semibold text-[#021028]"
                    >
                        {auth.user ? 'Manage skills' : 'Login'}
                    </Link>
                </nav>
            </div>
        </header>
    );
}