import { useState, useEffect, memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { setFormation } from "../../reducers/dataset";

import Types from "./Types";
import Stars from "./Stars";
import Labels from "./Labels";
import Search from "./Search";
import Characters from "./Characters";

const List = memo(function List() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

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

    const [nameOptions, setNameOptions] = useState([
        { label: t("show"), checked: true },
        { label: t("bold"), checked: false },
    ]);

    const formation = useSelector((state) => state.dataset.formation);

    useEffect(() => {
        setNameOptions((prev) => [
            { ...prev[0], label: t("show") },
            { ...prev[1], label: t("bold") },
        ]);
    }, [t]);

    const onRemoveByDrop = (event) => {
        const sid = event.dataTransfer.getData("sid");

        if (sid === "0") return;
        const payload = formation.map((f) =>
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
        dispatch(setFormation(payload));
    };

    const onDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div
            className="w-1/2 min-w-[760px] p-4 bg-black bg-opacity-30 rounded space-y-4"
            onDragOver={onDragOver}
            onDrop={onRemoveByDrop}
        >
            <Types currentType={currentType} setCurrentType={setCurrentType} />
            <div className="flex justify-between items-center">
                <Stars stars={stars} setStars={setStars} />
                <Labels
                    nameOptions={nameOptions}
                    setNameOptions={setNameOptions}
                />
            </div>
            <Search search={search} setSearch={setSearch} />
            <Characters
                search={search}
                stars={stars}
                currentType={currentType}
                nameOptions={nameOptions}
            />
        </div>
    );
});

export default List;
