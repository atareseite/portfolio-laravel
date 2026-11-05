export default function ProjectCard({ title, text, tags }) {
    return (
        <article className="flex flex-col rounded-xl border border-[#1b3978] bg-[#0a1634] p-6 transition hover:border-[#3be0ff]">
            <h3 className="mb-2 font-['Chakra_Petch'] text-xl font-bold">{title}</h3>
            <p className="flex-1 text-[#93a8d4]">{text}</p>
            <ul className="my-4 flex flex-wrap gap-2">
                {tags.map((t) => (
                    <li key={t} className="rounded border border-[#3be0ff]/30 bg-[#3be0ff]/10 px-2 py-0.5 text-xs text-[#3be0ff]">
                        {t}
                    </li>
                ))}
            </ul>
            <div className="flex gap-5 text-sm text-[#3be0ff]">
                <a href="#" className="hover:underline">Live demo</a>
                <a href="#" className="hover:underline">Source code</a>
            </div>
        </article>
    );
}