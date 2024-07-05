import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import _ from "lodash";

import { setFormation, setLevelDialog } from "../reducers/dataset";

const Dialog = ({ id, left, top, mode }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const dataset = useSelector((state) => state.dataset);
    const [level, setLevel] = useState(0);

    useEffect(() => {
        if (_.isNull(id)) return;
        const formation = dataset.formation.find((f) => f.id === id);
        const level = _.isUndefined(formation) ? 0 : formation.level;
        setLevel(level);
    }, [id, dataset.formation]);

    const onLevelClick = (id) => {
        if (_.isUndefined(id) || level > 15 || level < 0) return;
        const formation = dataset.formation.map((f) =>
            f.id === id ? { ...f, level } : f,
        );

        const levelDialog = {
            show: false,
            id: null,
            left: 0,
            top: 0,
        };
        dispatch(setLevelDialog(levelDialog));
        dispatch(setFormation(formation));
    };

    const renderLevelDialog = (id) => (
        <div className="dialog-level">
            <h3 className="text-center text-gray-200">{t("Level")}</h3>
            <hr />
            <input
                type="number"
                min={0}
                max={15}
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                onKeyPress={({ charCode }) =>
                    charCode === 13 ? onLevelClick(id) : null
                }
                onFocus={(e) => e.target.select()}
                className="w-full text-lg p-1"
                autoFocus
            />
            <button
                type="button"
                onClick={() => onLevelClick(id)}
                className="float-right mt-2 mb-1 w-16 h-6 text-lg bg-gray-300 rounded-md outline-none hover:bg-gray-400 active:bg-white"
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
};

Dialog.propTypes = {
    id: PropTypes.number,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    mode: PropTypes.string.isRequired,
};

export default Dialog;
