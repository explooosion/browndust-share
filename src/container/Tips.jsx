import { useState, memo } from "react";
import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa";
import { GoIssueOpened, GoQuestion } from "react-icons/go";

const Tips = memo(function Tips() {
    const [helpTips, setHelpTips] = useState(false);
    const { t } = useTranslation();

    const toggleHelpTips = () => {
        setHelpTips((prev) => !prev);
    };

    return (
        <footer className="relative flex flex-col justify-start p-3">
            <div className="flex items-center select-none cursor-pointer">
                <a
                    className="footer-link mr-3 text-white hover:text-yellow-300"
                    title="GitHub"
                    href="https://github.com/explooosion/browndust-share"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaGithub size="2em" />
                </a>
                <a
                    className="footer-link mr-3 text-white hover:text-yellow-300"
                    title="Issue"
                    href="https://github.com/explooosion/browndust-share/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <GoIssueOpened size="2.3em" />
                </a>
                <span
                    className="footer-link mr-3 text-white hover:text-yellow-300"
                    onClick={toggleHelpTips}
                >
                    <GoQuestion size="2.3em" />
                </span>
            </div>
            <div
                className={`absolute top-[-11rem] left-[9rem] mt-3 p-3 text-white bg-gray-900 border border-yellow-500 rounded-md transition-opacity duration-200 ease-in-out ${
                    helpTips ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            >
                {Array.from({ length: 6 }, (_, i) => (
                    <span key={i} className="block text-lg tracking-wider">
                        {i + 1}. {t(`tip${i + 1}`)}
                    </span>
                ))}
            </div>
            <span className="fixed bottom-5 left-5 text-sm text-gray-400 hidden lg:block">
                This site is fan-made and not affiliated with NEOWIZ and GAMFS
                in any way.
            </span>
        </footer>
    );
});

export default Tips;
