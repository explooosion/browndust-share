import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import isUndefined from "lodash/isUndefined";
import isNull from "lodash/isNull";
import isEmpty from "lodash/isEmpty";
import { sify } from "chinese-conv";

import { getThumbnailUrlByImageName } from "../utils";
import { bookDetailUrl } from "../config/api";
import { setMercenarySelected } from "../reducers/dataset";

const Mercenary = memo(function Mercenary({ params, nameOptions }) {
    const dispatch = useDispatch();
    const settings = useSelector((state) => state.settings);
    const formation = useSelector((state) => state.dataset.formation);
    const mercenarySelected = useSelector(
        (state) => state.dataset.mercenarySelected,
    );
    const charactersGlobal = useSelector(
        (state) => state.charactersGlobal.list,
    );

    const { _uiIconImageName, _uniqueCode } = params;
    const nops = nameOptions.map((n) => n.checked);
    const URL = getThumbnailUrlByImageName(_uiIconImageName);
    const opacity = isUndefined(
        formation.find((f) => f.uniqueCode === _uniqueCode),
    )
        ? 1
        : 0.2;

    const onDragStart = useCallback((event, suCode, sid) => {
        event.dataTransfer.setData("suCode", suCode);
        event.dataTransfer.setData("sid", sid);
    }, []);

    const onDoubleClick = useCallback((_uniqueCode) => {
        window.open(bookDetailUrl + _uniqueCode, "_blank");
    }, []);

    const onClickSetCode = useCallback(
        (_uniqueCode) => {
            const uniqueCode =
                mercenarySelected === _uniqueCode ? null : _uniqueCode;
            dispatch(setMercenarySelected(uniqueCode));
        },
        [dispatch, mercenarySelected],
    );

    const getCharNameByLocale = useCallback(
        (locale, params) => {
            if (isNull(params)) return "";

            /* eslint-disable */
            const {
                _uniqueCode,
                _charName,
                _charName_ENG,
                _charName_TW,
                _charName_JAP,
                _charName_SPA,
                _charName_GER,
                _charName_TH,
            } = params;
            /* eslint-enable */

            const nameMap = {
                US: _charName_ENG,
                ES: _charName_SPA,
                DE: _charName_GER,
                TW: _charName_TW,
                CN: sify(_charName_TW),
                JP: _charName_JAP,
                KR: _charName,
                TH: _charName_TH,
            };

            let name = nameMap[locale] || _charName_ENG;

            const cGlobal = charactersGlobal.find(
                (c) => c._uniqueCode === _uniqueCode,
            );

            if (cGlobal) {
                name = nameMap[locale] || cGlobal._charName;
            }

            return isEmpty(name) ? cGlobal?._charName : name;
        },
        [charactersGlobal],
    );

    const charName = useMemo(
        () => getCharNameByLocale(settings.locale, params),
        [settings.locale, params, getCharNameByLocale],
    );

    return (
        <div
            className={`relative w-16 h-16 bg-center bg-no-repeat bg-cover border border-gray-400 rounded transition-all ease-in-out duration-100 cursor-pointer text-xs m-2 ${
                nops[0] ? "before:block" : "before:hidden"
            } ${nops[1] ? "before:font-bold" : ""} ${
                mercenarySelected === _uniqueCode && opacity === 1
                    ? "border-red-500"
                    : ""
            } before:content-[attr(data-tooltip)]`}
            draggable
            style={{ backgroundImage: `url(${URL})`, opacity }}
            data-tooltip={charName}
            onClick={() => onClickSetCode(_uniqueCode)}
            onDragStart={(e) => onDragStart(e, _uniqueCode, 0)}
            onDoubleClick={() => onDoubleClick(_uniqueCode)}
        ></div>
    );
});

Mercenary.propTypes = {
    nameOptions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            checked: PropTypes.bool.isRequired,
        }),
    ).isRequired,
    params: PropTypes.shape({
        _uiIconImageName: PropTypes.string.isRequired,
        _uniqueCode: PropTypes.number.isRequired,
    }).isRequired,
};

export default Mercenary;
