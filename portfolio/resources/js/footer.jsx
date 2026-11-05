export default function Footer() {
    return (
        <footer className="border-t border-[#1b3978] py-7 text-sm text-[#93a8d4]">
            <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-2 px-5">
                <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
                <a href="#home" className="text-[#3be0ff] hover:underline">Back to top</a>
            </div>
        </footer>
    );
}