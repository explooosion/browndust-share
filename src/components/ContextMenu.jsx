import { useDispatch, useSelector, shallowEqual } from "react-redux";
import "react-contexify/dist/ReactContexify.css";
import { FaBookMedical, FaTrash, FaFortAwesomeAlt } from "react-icons/fa";
import { Menu, Item, Separator } from "react-contexify";

import { setFormation, setLevelDialog } from "../reducers/dataset";
import { bookDetailUrl } from "../config/api";

function RightMenu() {
    const dispatch = useDispatch();

    const formation = useSelector(
        (state) => state.dataset.formation,
        shallowEqual,
    );

    const levelDialog = useSelector(
        (state) => state.dataset.levelDialog,
        shallowEqual,
    );

    const characters = useSelector(
        (state) => state.characters.list,
        shallowEqual,
    );

    const CTMENU_EVENTS = {
        "ctmenu-item-link": ({ props }) => {
            const { uniqueCode } = formation.find(
                (f) => f.uniqueCode === props.uniqueCode,
            );
            const { _uniqueCode } = characters.find(
                (c) => c._uniqueCode === uniqueCode,
            );
            window.open(bookDetailUrl + _uniqueCode, "_blank");
        },
        "ctmenu-item-addLevel": ({ event }) => {
            const dialog = {
                ...levelDialog,
                show: true,
                left: event.clientX,
                top: event.clientY,
                id: event.target.id,
            };
            dispatch(setLevelDialog(dialog));
        },
        "ctmenu-item-clearAll": ({ event }) => {
            const formation = formation.map((f) =>
                f.id === event.target.id ? { ...f, level: 0 } : f,
            );
            dispatch(setFormation(formation));
        },
    };

    const onCTMenuItemClick = ({ id, event, props }) => {
        CTMENU_EVENTS[id]({ event, props });
    };

    return (
        <Menu
            id="ctmenu"
            animation="flip"
            className="react-contexify w-56 bg-white rounded-lg shadow-lg"
        >
            <Item
                id="ctmenu-item-link"
                onClick={onCTMenuItemClick}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
                <FaFortAwesomeAlt className="mr-2" />
                Mercenary Info
            </Item>
            <Item
                id="ctmenu-item-addLevel"
                onClick={onCTMenuItemClick}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
                <FaBookMedical className="mr-2" />
                Add Level
            </Item>
            <Separator className="my-2 border-t border-gray-200" />
            <Item
                id="ctmenu-item-clearAll"
                onClick={onCTMenuItemClick}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
                <FaTrash className="mr-2" />
                Clear Settings
            </Item>
        </Menu>
    );
}

export default RightMenu;
