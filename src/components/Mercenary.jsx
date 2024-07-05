import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
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
    const opacity = _.isUndefined(
        formation.find((f) => f.uniqueCode === _uniqueCode),
    )
        ? 1
        : 0.2;

    const onDragStart = (event, suCode, sid) => {
        event.dataTransfer.setData("suCode", suCode);
        event.dataTransfer.setData("sid", sid);
    };

    const onDoubleClick = (_uniqueCode) => {
        window.open(bookDetailUrl + _uniqueCode, "_blank");
    };

    const onClickSetCode = (_uniqueCode) => {
        const uniqueCode =
            mercenarySelected === _uniqueCode ? null : _uniqueCode;
        dispatch(setMercenarySelected(uniqueCode));
    };

    const getCharNameByLocale = (locale = "US", params = null) => {
        if (_.isNull(params)) return;

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

        let name = "";
        switch (locale) {
            case "US":
                name = _charName_ENG;
                break;
            case "ES":
                name = _charName_SPA;
                break;
            case "DE":
                name = _charName_GER;
                break;
            case "TW":
                name = _charName_TW;
                break;
            case "CN":
                name = sify(_charName_TW);
                break;
            case "JP":
                name = _charName_JAP;
                break;
            case "KR":
                name = _charName;
                break;
            case "TH":
                name = _charName_TH;
                break;
            default:
                console.warn("can not find character by locale.");
                name = _charName_ENG;
                break;
        }

        if (_.isUndefined(charactersGlobal)) return _charName;

        const cGlobal = charactersGlobal.find(
            (c) => c._uniqueCode === _uniqueCode,
        );
        if (_.isUndefined(cGlobal)) return _charName;

        switch (locale) {
            case "US":
                name = cGlobal._charName_ENG;
                break;
            case "ES":
                name = cGlobal._charName_SPA;
                break;
            case "DE":
                name = cGlobal._charName_GER;
                break;
            case "TW":
                name = cGlobal._charName_TW;
                break;
            case "CN":
                name = sify(cGlobal._charName_TW);
                break;
            case "JP":
                name = cGlobal._charName_JAP;
                break;
            case "KR":
                name = cGlobal._charName;
                break;
            case "TH":
                name = cGlobal._charName_TH;
                break;
            default:
                name = cGlobal._charName;
                break;
        }

        return _.isEmpty(name) ? cGlobal._charName : name;
    };

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
            data-tooltip={getCharNameByLocale(settings.locale, params)}
            onClick={() => onClickSetCode(_uniqueCode)}
            onDragStart={(e) => onDragStart(e, _uniqueCode, 0)}
            onDoubleClick={() => onDoubleClick(_uniqueCode)}
        ></div>
    );
});

Mercenary.propTypes = {
    nameOptions: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
};

export default Mercenary;
