import { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import _ from "lodash";

import { setFormation, setLevelDialog } from "../reducers/dataset";

const Dialog = memo(function Dialog({ id, left, top, mode }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [level, setLevel] = useState(0);

    const { formation, levelDialog } = useSelector((state) => {
        return {
            formation: state.dataset.formation,
            levelDialog: state.dataset.levelDialog,
        };
    }, shallowEqual);

    // useEffect(() => {
    //     if (_.isNull(id)) return;
    //     const formation = formation.find((f) => f.id === id);
    //     const level = _.isUndefined(formation) ? 0 : formation.level;
    //     setLevel(level);
    // }, []);

    const onLevelClick = (id) => {
        if (_.isUndefined(id) || level > 15 || level < 0) return;

        const payload = {
            levelDialog,
            formation,
        };

        payload.formation = formation.map((f) =>
            f.uniqueCode === id ? { ...f, level } : f,
        );

        payload.levelDialog = {
            show: false,
            id: null,
            left: 0,
            top: 0,
        };

        dispatch(setLevelDialog(payload.levelDialog));
        dispatch(setFormation(payload.formation));
    };

    const renderLevelDialog = (id) => (
        <div className="w-[150px]">
            <h3 className="font-bold text-center text-gray-200 mb-2">
                {t("Level")}
            </h3>
            <hr />
            <input
                type="number"
                min={0}
                max={15}
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                onFocus={(e) => e.target.select()}
                className="w-full p-1 text-black"
                autoFocus
            />
            <button
                type="button"
                onClick={() => onLevelClick(id)}
                className="float-right mt-2 mb-1 w-16 h-6 text-lg text-black bg-gray-300 hover:bg-gray-200 rounded outline-none  active:bg-white"
            >
                OK
            </button>
        </div>
    );

    let renderTemplate = null;
    switch (mode) {
        case "level":
            renderTemplate = renderLevelDialog(id);
            break;
        default:
            renderTemplate = null;
    }

    return (
        <div
            id="dialog"
            className="absolute p-1.5 w-30 bg-gray-800 bg-opacity-95 border-4 border-gray-400 border-opacity-95 rounded-lg z-50"
            style={{ left: `${left}px`, top: `${top - 60}px` }}
        >
            {renderTemplate}
        </div>
    );
});

Dialog.propTypes = {
    id: PropTypes.number,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    mode: PropTypes.string.isRequired,
};

export default Dialog;
