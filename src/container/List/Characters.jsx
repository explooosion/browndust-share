import { memo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import { sify } from "chinese-conv";
import isNull from "lodash/isNull";
import isNumber from "lodash/isNumber";
import PropTypes from "prop-types";

import Mercenary from "../../components/Mercenary";

const Characters = memo(function Characters(props) {
    const { search, stars, currentType, nameOptions } = props;
    const characters = useSelector((state) => state.characters.list);
    const { charactersGlobal, settings } = useSelector((state) => {
        return {
            charactersGlobal: state.charactersGlobal.list,
            settings: state.settings,
        };
    }, shallowEqual);

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
        <div className="overflow-y-scroll h-[calc(100vh-320px)] flex flex-wrap content-start">
            {characters.length === 0 ? (
                <HashLoader color="#5ac0de" size={100} />
            ) : (
                renderCharacters(characters)
            )}
        </div>
    );
});

Characters.propTypes = {
    search: PropTypes.string.isRequired,
    stars: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            checked: PropTypes.bool.isRequired,
            star: PropTypes.number.isRequired,
        }),
    ).isRequired,
    currentType: PropTypes.shape({
        filterType: PropTypes.number.isRequired,
        type: PropTypes.number,
        growType: PropTypes.number.isRequired,
        label: PropTypes.string,
    }).isRequired,
    nameOptions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            checked: PropTypes.bool.isRequired,
        }),
    ).isRequired,
};

export default Characters;
