import { useState, useEffect, memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "pretty-checkbox-react";
import "@djthoms/pretty-checkbox";

import { FaStar } from "react-icons/fa";
import HashLoader from "react-spinners/HashLoader";
import { sify } from "chinese-conv";
import isNull from "lodash/isNull";
import isNumber from "lodash/isNumber";

import Mercenary from "../components/Mercenary";
import { getIconUrlByTypeId } from "../utils";
import { setFormation } from "../reducers/dataset";

const List = memo(function List() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const characters = useSelector((state) => state.characters.list);
    const charactersGlobal = useSelector(
        (state) => state.charactersGlobal.list,
    );
    const dataset = useSelector((state) => state.dataset);
    const settings = useSelector((state) => state.settings);
    const [search, setSearch] = useState("");
    const [currentType, setCurrentType] = useState({
        type: 1,
        filterType: 3,
        growType: 1,
        label: t("attacker"),
    });

    const [stars, setStars] = useState([
        { label: "6", checked: true, star: 6 },
        { label: "5", checked: true, star: 5 },
        { label: "4", checked: false, star: 4 },
        { label: "3", checked: false, star: 3 },
        { label: "2", checked: false, star: 2 },
        { label: "1", checked: false, star: 1 },
    ]);

    const types = [
        { type: null, filterType: 0, growType: 4, label: "神話" },
        { type: null, filterType: 1, growType: 3, label: "超越" },
        { type: null, filterType: 2, growType: 2, label: "傳說" },
        { type: 1, filterType: 3, growType: 1, label: t("attacker") },
        { type: 2, filterType: 4, growType: 1, label: t("defender") },
        { type: 3, filterType: 5, growType: 1, label: t("magician") },
        { type: 4, filterType: 6, growType: 1, label: t("supporter") },
        { type: null, filterType: 7, growType: 1, label: "合作" },
    ];

    const [nameOptions, setNameOptions] = useState([
        { label: t("show"), checked: true },
        { label: t("bold"), checked: false },
    ]);

    useEffect(() => {
        setNameOptions((prev) => [
            { ...prev[0], label: t("show") },
            { ...prev[1], label: t("bold") },
        ]);
    }, [t]);

    const onStarChange = (label) => {
        setStars((prevStars) =>
            prevStars.map((star) =>
                star.label === label
                    ? { ...star, checked: !star.checked }
                    : star,
            ),
        );
    };

    const onNameOptionsChange = (label) => {
        setNameOptions((prevOptions) =>
            prevOptions.map((option) =>
                option.label === label
                    ? { ...option, checked: !option.checked }
                    : option,
            ),
        );
    };

    const onRemoveByDrop = (event) => {
        const sid = event.dataTransfer.getData("sid");

        if (sid === "0") return;
        const formation = dataset.formation.map((f) =>
            sid !== f.id
                ? f
                : {
                      ...f,
                      type: 0,
                      backgroundImage: null,
                      uniqueCode: 0,
                      dragOver: false,
                      queue: 0,
                      level: 0,
                  },
        );
        dispatch(setFormation(formation));
    };

    const onDragOver = (event) => {
        event.preventDefault();
    };

    const getListBySearch = (search = "", characters) => {
        if (search === "") return characters;

        return charactersGlobal.filter((c) => {
            const {
                _charName,
                _charName_ENG,
                _charName_TW,
                _charName_JAP,
                _charName_SPA,
                _charName_GER,
                _charName_TH,
            } = c;
            let match = false;
            switch (settings.locale) {
                case "US":
                    match = _charName_ENG.includes(search);
                    break;
                case "ES":
                    match = _charName_SPA.includes(search);
                    break;
                case "DE":
                    match = _charName_GER.includes(search);
                    break;
                case "TW":
                    match =
                        _charName_TW.includes(search) ||
                        sify(_charName_TW).includes(search);
                    break;
                case "CN":
                    match =
                        _charName_TW.includes(search) ||
                        sify(_charName_TW).includes(search);
                    break;
                case "JP":
                    match = _charName_JAP.includes(search);
                    break;
                case "KR":
                    match = _charName.includes(search);
                    break;
                case "TH":
                    match = _charName_TH.includes(search);
                    break;
                default:
                    match = true;
            }
            return match;
        });
    };

    const renderTypes = () => (
        <div className="flex items-center justify-between">
            {types.map((type) => {
                return (
                    <button
                        key={`type-${type.type}-${type.filterType}-${type.growType}`}
                        type="button"
                        className={`flex justify-center items-center w-20 h-11 text-white border border-gray-500 rounded shadow space-x-1  ${
                            type.filterType === currentType.filterType
                                ? "bg-blue-500"
                                : "bg-gray-700"
                        }`}
                        onClick={() => setCurrentType(type)}
                    >
                        {[2, 3, 4, 5, 6].includes(type.filterType) && (
                            <i
                                className="w-7 h-7 bg-center bg-no-repeat bg-cover"
                                style={{
                                    backgroundImage: getIconUrlByTypeId(
                                        type.filterType,
                                    ),
                                }}
                            />
                        )}
                        <span className="text-xs">{type.label}</span>
                    </button>
                );
            })}
        </div>
    );

    const renderFilterStars = () =>
        stars.map(({ label, checked }, index) => (
            <div className="text-xl" key={`star-${index}`}>
                <Checkbox
                    shape="round"
                    color="info"
                    animation="jelly"
                    icon={<i className="mdi mdi-check" />}
                    checked={checked}
                    onChange={() => onStarChange(label)}
                >
                    <span>{label}</span>
                </Checkbox>
            </div>
        ));

    const renderFilterNameOptions = () =>
        nameOptions.map(({ label, checked }, index) => (
            <div className="text-xl" key={`star-${index}`}>
                <Checkbox
                    key={`name-${index}`}
                    shape="round"
                    color="info"
                    animation="jelly"
                    icon={<i className="mdi mdi-check" />}
                    checked={checked}
                    onChange={() => onNameOptionsChange(label)}
                >
                    <span>{label}</span>
                </Checkbox>
            </div>
        ));

    const renderCharacters = (characters) =>
        getListBySearch(search, characters)
            .filter((character) => {
                const { _type, _star, _filterType } = character;

                if (search.trim().length > 0) return true;

                const isStarChecked = (star) =>
                    stars.some(
                        (s, index) => s.checked && Number(star) === 6 - index,
                    );

                if (isNull(currentType.type)) {
                    return (
                        currentType.filterType === Number(_filterType) &&
                        isStarChecked(_star)
                    );
                }

                return (
                    isNumber(currentType.type) &&
                    currentType.type === Number(_type) &&
                    isStarChecked(_star)
                );
            })
            .map((c, index) => (
                <Mercenary
                    key={`mercenary-${index}`}
                    params={c}
                    nameOptions={nameOptions}
                />
            ));

    return (
        <div
            className="w-1/2 min-w-[760px] p-4 bg-black bg-opacity-30 rounded space-y-4"
            onDragOver={onDragOver}
            onDrop={onRemoveByDrop}
        >
            {renderTypes()}
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="flex justify-center items-center space-x-1">
                        <FaStar />
                        <span>{t("star")}：</span>
                    </div>
                    {renderFilterStars()}
                </div>
                <div className="flex items-center">
                    <span>{t("name")}：</span>
                    {renderFilterNameOptions()}
                </div>
            </div>
            <input
                className="w-full p-2 text-lg bg-gray-800 border border-gray-600 rounded"
                type="text"
                placeholder={t("search")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="overflow-y-scroll h-[calc(100vh-300px)] flex flex-wrap content-start">
                {characters.length === 0 ? (
                    <HashLoader color="#5ac0de" size={100} />
                ) : (
                    renderCharacters(characters)
                )}
            </div>
        </div>
    );
});

export default List;
