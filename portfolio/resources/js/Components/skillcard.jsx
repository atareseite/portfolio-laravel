export default function SkillCard({ skill }) {
    return (
        <article className="rounded-md border border-[#1b3978] bg-[#040a1c] p-5">
            <div className="mb-3 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded border border-[#1b3978] bg-[#0e1f47] font-['Chakra_Petch'] text-sm font-bold text-[#3be0ff]">
                    {skill.icon}
                </span>
                <h3 className="font-['Chakra_Petch'] font-semibold">{skill.name}</h3>
                <span className="ml-auto text-sm text-[#93a8d4]">{skill.level}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#0e1f47]">
                <div
                    className="h-full bg-gradient-to-r from-[#2f7bff] to-[#3be0ff] shadow-[0_0_10px_#3be0ff]"
                    style={{ width: `${skill.level}%` }}
                />
            </div>
        </article>
    );
}