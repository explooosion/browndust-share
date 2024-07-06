import { memo } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import { getBackgroundImageStyleByFilterType } from "../../utils";

const Types = memo(function Types({ currentType, setCurrentType }) {
    const { t } = useTranslation();

    const types = [
        { type: null, filterType: 0, growType: 4, label: t("mythic") },
        { type: null, filterType: 1, growType: 3, label: t("exalted") },
        { type: null, filterType: 2, growType: 2, label: t("legend") },
        { type: 1, filterType: 3, growType: 1, label: t("attacker") },
        { type: 2, filterType: 4, growType: 1, label: t("defender") },
        { type: 3, filterType: 5, growType: 1, label: t("magician") },
        { type: 4, filterType: 6, growType: 1, label: t("supporter") },
        { type: null, filterType: 7, growType: 1, label: t("other") },
    ];

    return (
        <div className="flex items-center justify-between">
            {types.map((typeObj) => (
                <TypeButton
                    key={`type-${typeObj.type}-${typeObj.filterType}-${typeObj.growType}`}
                    typeObj={typeObj}
                    isActive={typeObj.filterType === currentType.filterType}
                    setCurrentType={setCurrentType}
                />
            ))}
        </div>
    );
});

const TypeButton = ({ typeObj, isActive, setCurrentType }) => {
    const { type, filterType, growType, label } = typeObj;

    return (
        <button
            type="button"
            className={`flex justify-center items-center w-20 h-11 text-white border border-gray-500 rounded shadow space-x-1 ${
                isActive ? "bg-blue-500" : "bg-gray-700"
            }`}
            onClick={() =>
                setCurrentType({ type, filterType, growType, label })
            }
        >
            {[2, 3, 4, 5, 6].includes(filterType) && (
                <i
                    className="w-7 h-7 bg-center bg-no-repeat bg-cover"
                    style={getBackgroundImageStyleByFilterType(filterType)}
                />
            )}
            <span className="text-xs">{label}</span>
        </button>
    );
};

TypeButton.propTypes = {
    typeObj: PropTypes.shape({
        type: PropTypes.number,
        filterType: PropTypes.number.isRequired,
        growType: PropTypes.number.isRequired,
        label: PropTypes.string,
    }).isRequired,
    isActive: PropTypes.bool.isRequired,
    setCurrentType: PropTypes.func.isRequired,
};

Types.propTypes = {
    currentType: PropTypes.shape({
        filterType: PropTypes.number.isRequired,
        type: PropTypes.number,
        growType: PropTypes.number.isRequired,
        label: PropTypes.string,
    }).isRequired,
    setCurrentType: PropTypes.func.isRequired,
};

export default Types;
