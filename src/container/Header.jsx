import { memo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// import ReactFlagsSelect from "react-flags-select";

import { setLocale } from "../reducers/settings";
import FlagSelect from "../components/FlagSelect";

const Header = memo(function Header() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { locale } = useSelector((state) => state.settings, shallowEqual);

    const onSelectFlag = (countryCode) => {
        dispatch(setLocale(countryCode));
    };

    return (
        <header className="text-2xl">
            <div className="relative flex justify-center items-center text-center lg:text-left">
                <h1>
                    <a
                        href={import.meta.env.VITE_WEB_URL}
                        className="block text-yellow-500 no-underline text-4xl font-bold text-center"
                    >
                        BROWNDUST{" "}
                        <small className="hidden sm:inline">{t("title")}</small>
                    </a>
                </h1>
                <div className="absolute top-0 left-2.5 font-sans text-gray-800">
                    {/* <ReactFlagsSelect
                        id="flag-select"
                        selected={locale}
                        countries={countries}
                        customLabels={customLabels}
                        selectedSize={25}
                        onSelect={onSelectFlag}
                    /> */}
                    <FlagSelect selected={locale} onSelect={onSelectFlag} />
                </div>
            </div>
        </header>
    );
});

export default Header;
