import { useEffect, memo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import pick from "lodash/pick";
import { useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

import Dialog from "../components/Dialog";
import ContextMenu from "../components/ContextMenu";
import {
    getThumbnailUrlByImageName,
    getBackgroundColorStyleByType,
    getBackgroundImageStyleByType,
} from "../utils";
import {
    setRef,
    setFormation,
    setQueue,
    setMercenarySelected,
    DATA_KEYS,
} from "../reducers/dataset";

const Formation = memo(function Formation() {
    const dispatch = useDispatch();

    const {
        ref,
        characters,
        options,
        formation,
        levelDialog,
        queue,
        queueMode,
        mercenarySelected,
    } = useSelector((state) => {
        return {
            ref: state.dataset.ref,
            characters: state.characters.list,
            options: state.dataset.options,
            formation: state.dataset.formation,
            levelDialog: state.dataset.levelDialog,
            queue: state.dataset.queue,
            queueMode: state.dataset.queueMode,
            mercenarySelected: state.dataset.mercenarySelected,
        };
    }, shallowEqual);

    const { show } = useContextMenu({
        id: "ctmenu",
    });

    const { type, backcolor, backimage, queue: queueOption, reverse } = options;

    const onRemoveFormation = (pid) => {
        if (queueMode) return;

        const payload = formation.map((f) => {
            if (f.id === pid) {
                return {
                    ...f,
                    uniqueCode: 0,
                    backgroundImage: null,
                    type: 0,
                    queue: 0,
                    level: 0,
                };
            }
            return f;
        });
        dispatch(setFormation(payload));
    };

    const onDragChangeStyle = (tid, bool) => {
        let hasUpdate = false;
        const payload = formation.map((f) => {
            if (f.id === tid) {
                if (f.dragOver !== bool) hasUpdate = true;
                return { ...f, dragOver: bool };
            }
            return f;
        });
        if (hasUpdate) dispatch(setFormation(payload));
    };

    const onContextMenu = (event, uniqueCode) => {
        event.preventDefault();
        if (formation.find((f) => uniqueCode && f.uniqueCode === uniqueCode)) {
            show({
                event,
                props: {
                    uniqueCode,
                },
            });
        }
    };

    const onFormationClick = (id) => {
        const target = formation.find((f) => f.id === id);

        if (target.uniqueCode && queueMode) {
            const payload = {
                formation: [...formation],
                queue: [...queue],
            };

            let nextQueue = 1;

            // Update queue and determine the nextQueue value
            const queueIndex = payload.queue.findIndex((q) => q.id === id);
            if (queueIndex > -1) {
                payload.queue = payload.queue.filter((q) => q.id !== id);
            } else {
                if (payload.queue.length > 0) {
                    nextQueue = payload.queue.length + 1;
                }
                payload.queue.push({ id, queue: nextQueue });
            }

            // Update formation queue values and handle queue removal
            payload.formation = payload.formation.map((f) => {
                if (f.id === id) {
                    return {
                        ...f,
                        queue: f.queue === 0 ? nextQueue : 0,
                    };
                }
                return f;
            });

            // Adjust subsequent queue numbers if an item is removed
            if (queueIndex > -1) {
                payload.queue = payload.queue.map((q, index) => ({
                    ...q,
                    queue: index + 1,
                }));
            }

            // Update formation to reflect the new queue numbers
            payload.formation = payload.formation.map((f) => {
                if (f.queue > 0) {
                    const newQueueValue =
                        payload.queue.find((q) => q.id === f.id)?.queue || 0;
                    return {
                        ...f,
                        queue: newQueueValue,
                    };
                }
                return f;
            });

            dispatch(setQueue(payload.queue));
            dispatch(setFormation(payload.formation));
        }

        const source = formation.find(
            (f) => f.uniqueCode === mercenarySelected,
        );

        let payload = [...formation];

        // 如果陣型其他位置已經有位置，則直接剔除並且設置新的位置
        if (source) {
            payload = formation.map((f) => {
                if (f.id === target.id) {
                    return {
                        ...f,
                        ...pick(source, DATA_KEYS),
                    };
                } else if (f.id === source.id) {
                    return {
                        ...f,
                        ...pick(target, DATA_KEYS),
                    };
                }
                return f;
            });
        }
        // 直接新增角色在陣型中
        else {
            const character = characters.find(
                ({ _uniqueCode }) => _uniqueCode === mercenarySelected,
            );

            if (!character) {
                dispatch(setMercenarySelected(null));
                return;
            }

            const backgroundImage = `
            url(${getThumbnailUrlByImageName(character._uiIconImageName)})`;

            payload = payload.map((f) => {
                if (f.id === target.id) {
                    return {
                        ...f,
                        backgroundImage,
                        type: Number(character._type),
                        uniqueCode: character._uniqueCode,
                        dragOver: false,
                    };
                }
                return f;
            });
        }

        dispatch(setFormation(payload));
        dispatch(setMercenarySelected(null));
    };

    const onDragStart = (event, suCode, sid) => {
        event.dataTransfer.setData("suCode", suCode);
        event.dataTransfer.setData("sid", sid);
    };

    const onDragOver = (event) => {
        event.preventDefault();
    };

    const onDragEnter = (event, tid) => {
        event.preventDefault();
        onDragChangeStyle(tid, true);
    };

    const onDragLeave = (event, tid) => {
        event.preventDefault();
        onDragChangeStyle(tid, false);
    };

    const onDrop = (event, tid) => {
        let payload = [...formation];

        // 來源的陣型位置
        const sid = event.dataTransfer.getData("sid");
        // 來源的角色代號
        const suCode = Number(event.dataTransfer.getData("suCode"));
        // 取得當前的陣型
        const target = formation.find((f) => f.id === tid);
        // 取得來源的陣型
        const source = formation.find((f) => f.id === sid);

        const character = characters.find(
            ({ _uniqueCode }) => _uniqueCode === suCode,
        );

        // 拖曳的角色與陣型中的相同，不處理 OR 拖曳中的角色不存在
        if (suCode === target.uniqueCode || !character) {
            payload = payload.map((f) => {
                if (f.id === target.id) {
                    return {
                        ...f,
                        dragOver: false,
                    };
                }
                return f;
            });

            dispatch(setFormation(payload));
            dispatch(setMercenarySelected(null));
            return;
        }

        // 拖曳中的角色和陣型中的角色不同，且陣型中有角色，則直接交換。
        if (
            source && // 來源有資料
            target.uniqueCode && // 陣形中有角色
            source.uniqueCode !== target.uniqueCode // 來源和目標不同
        ) {
            payload = payload.map((f) => {
                if (f.id === target.id) {
                    return {
                        ...f,
                        dragOver: false,
                        uniqueCode: source.uniqueCode,
                        backgroundImage: source.backgroundImage,
                        type: source.type,
                        queue: source.queue,
                        level: source.level,
                    };
                } else if (f.id === source.id) {
                    return {
                        ...f,
                        dragOver: false,
                        uniqueCode: target.uniqueCode,
                        backgroundImage: target.backgroundImage,
                        type: target.type,
                        queue: target.queue,
                        level: target.level,
                    };
                }
                return f;
            });
        }
        // 拖曳中的角色和陣型中的角色不同
        else {
            const existSelft = payload.find((f) => f.uniqueCode === suCode);

            const backgroundImage = `
            url(${getThumbnailUrlByImageName(character._uiIconImageName)})`;

            payload = payload.map((f) => {
                // 清除其他位置出現當前拖曳的角色
                if (existSelft && f.id === existSelft.id) {
                    return {
                        ...f,
                        dragOver: false,
                        uniqueCode: 0,
                        backgroundImage: null,
                        type: 0,
                        queue: 0,
                        level: 0,
                    };
                }
                // 設置當前位置為當前拖曳的角色
                else if (f.id === target.id) {
                    return {
                        ...target,
                        backgroundImage,
                        type: Number(character._type),
                        uniqueCode: suCode,
                        dragOver: false,
                    };
                }
                return f;
            });
        }

        dispatch(setFormation(payload));
        dispatch(setMercenarySelected(null));
    };

    const onDragEnd = (event) => {
        event.preventDefault();
    };

    const renderFormation = (typeShow, queueShow) => {
        return formation.map(
            ({
                id,
                top,
                left,
                type,
                backgroundImage,
                uniqueCode,
                dragOver,
                queue,
                level,
            }) => {
                const draggable = uniqueCode > 0;
                return (
                    <div
                        key={`formation-${id}`}
                        className={`absolute w-[6.5rem] h-[6.5rem] bg-center bg-no-repeat bg-cover ${
                            dragOver
                                ? "bg-[rgba(200,200,255,0.3)] border border-yellow-500"
                                : ""
                        } ${draggable ? "cursor-pointer" : ""}`}
                        draggable={draggable}
                        style={{
                            top,
                            left,
                            backgroundImage,
                            ...(backcolor
                                ? getBackgroundColorStyleByType(type)
                                : {}),
                            ...(reverse
                                ? { transform: `rotateY(180deg)` }
                                : {}),
                        }}
                        onClick={() => onFormationClick(id)}
                        onDoubleClick={() => onRemoveFormation(id)}
                        onContextMenu={(e) => onContextMenu(e, uniqueCode)}
                        onDragStart={(e) => onDragStart(e, uniqueCode, id)}
                        onDragOver={onDragOver}
                        onDragEnter={(e) => onDragEnter(e, id)}
                        onDragLeave={(e) => onDragLeave(e, id)}
                        onDrop={(e) => onDrop(e, id)}
                        onDragEnd={(e) => onDragEnd(e)}
                    >
                        {typeShow ? (
                            <div
                                className="absolute top-0 right-0 w-9 h-9 bg-center bg-no-repeat"
                                style={{
                                    ...getBackgroundImageStyleByType(type),
                                }}
                            ></div>
                        ) : null}
                        {queueShow && queue > 0 ? (
                            <div className="absolute top-0 left-0 flex items-center justify-center w-9 h-9 text-yellow-400 bg-black bg-opacity-50">
                                {queue}
                            </div>
                        ) : null}
                        {level > 0 ? (
                            <div
                                className="absolute bottom-1 left-1 flex justify-center items-center text-center w-12 text-white bg-blue-700 bg-opacity-70 rounded-full font-bold italic"
                                style={{
                                    ...(reverse
                                        ? { transform: `rotateY(180deg)` }
                                        : {}),
                                }}
                            >
                                {level && `+${level}`}
                            </div>
                        ) : null}
                    </div>
                );
            },
        );
    };

    useEffect(() => {
        dispatch(setRef("formation"));
    }, []);

    return (
        <div
            id={ref}
            className={`relative w-[700px] h-[350px] bg-center bg-cover bg-[#17293C] rounded border border-transparent ${
                backimage
                    ? "bg-[url('images/formation_background.jpg')]"
                    : "bg-none"
            }`}
        >
            {renderFormation(type, queueOption)}
            <ContextMenu />
            {levelDialog.show ? <Dialog {...levelDialog} mode="level" /> : null}
        </div>
    );
});

export default Formation;
