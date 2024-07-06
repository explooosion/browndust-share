import { memo, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import flags from "../models/Flags";

const FlagSelect = memo(function FlagSelect({ selected, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loadedFlags, setLoadedFlags] = useState({});

    const dropdownRef = useRef(null);

    const handleSelect = (countryCode) => {
        onSelect(countryCode);
        setIsOpen(false);
    };

    const selectedFlag = flags[selected];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleImageLoad = (countryCode) => {
        setLoadedFlags((prevState) => ({
            ...prevState,
            [countryCode]: true,
        }));
    };

    return (
        <div ref={dropdownRef} className="z-50 relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="flex justify-center items-center w-full rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-800 text-sm font-medium text-white outline-none"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <img
                        src={selectedFlag.flagUrl}
                        alt={selectedFlag.label}
                        className="inline-block w-6 h-auto mr-2"
                    />
                    {selectedFlag.label}
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.44l3.71-3.21a.75.75 0 111.02 1.08l-4 3.5a.75.75 0 01-1.02 0l-4-3.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div
                    className="origin-top-left absolute mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-y-auto max-h-60"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <div className="py-1" role="none">
                        {Object.entries(flags).map(
                            ([countryCode, { label, flagUrl }]) => (
                                <button
                                    key={countryCode}
                                    onClick={() => handleSelect(countryCode)}
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left text-sm"
                                    role="menuitem"
                                    tabIndex="-1"
                                >
                                    {!loadedFlags[countryCode] && (
                                        <div className="inline-block w-6 h-6 mr-2 bg-gray-200 animate-pulse"></div>
                                    )}
                                    <img
                                        src={flagUrl}
                                        alt={label}
                                        className={`inline-block w-6 h-auto mr-2 ${
                                            loadedFlags[countryCode]
                                                ? ""
                                                : "hidden"
                                        }`}
                                        onLoad={() =>
                                            handleImageLoad(countryCode)
                                        }
                                    />
                                    {label}
                                </button>
                            ),
                        )}
                    </div>
                </div>
            )}
        </div>
    );
});

FlagSelect.propTypes = {
    selected: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default FlagSelect;
