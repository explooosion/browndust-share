import { useState, useEffect, memo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { MdRefresh, MdGetApp } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import {
    GiPerspectiveDiceSixFacesRandom,
    GiPerspectiveDiceOne,
} from "react-icons/gi";
import { Checkbox, Radio } from "pretty-checkbox-react";
import { toPng } from "html-to-image";
import moment from "moment";
import Clipboard from "clipboard";

import {
    setFormation,
    setQueue,
    setQueueMode,
    setOptions,
    reset,
} from "../reducers/dataset";
import { resizeImageURL } from "../utils";

const Toolbar = memo(function Toolbar() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { formation, options, queueMode, ref } = useSelector((state) => {
        return {
            formation: state.dataset.formation,
            options: state.dataset.options,
            queueMode: state.dataset.queueMode,
            ref: state.dataset.ref,
        };
    }, shallowEqual);

    const [downloadSizeSelected, setDownloadSizeSelected] = useState(1);
    const [downloadSizeCustom, setDownloadSizeCustom] = useState(0);

    useEffect(() => {
        new Clipboard(".tool-copylink");
    }, []);

    const downloadSize = [
        { value: 1, name: 700 },
        { value: 2, name: 520 },
        { value: 3, name: 420 },
        { value: 4, name: t("image-width-custom") },
    ];

    const onUpdateOptions = (payload) => {
        dispatch(setOptions({ ...options, ...payload }));
    };

    const onQueueClick = () => {
        if (queueMode) {
            dispatch(setQueue([]));
            dispatch(setQueueMode(false));
        } else {
            const updatedFormation = formation.map((f) => ({ ...f, queue: 0 }));
            dispatch(setFormation(updatedFormation));
            dispatch(setQueueMode(true));
        }
    };

    const onDownloadClick = async () => {
        const size =
            downloadSizeSelected !== 4
                ? downloadSize.find((d) => d.value === downloadSizeSelected)
                      .name
                : Number(downloadSizeCustom);

        if (Number(size) <= 0) return;

        try {
            const dataUrl = await toPng(document.getElementById(ref), {
                skipFonts: true,
            });

            const newDataUri = await resizeImageURL(dataUrl, size);
            const a = document.createElement("a");
            a.href = newDataUri;
            a.download = `output-${moment().format("YYYYMMDDTHmmss")}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (e) {
            console.error("Download error:", e);
        }
    };

    const onResetClick = () => {
        dispatch(reset());
    };

    const queueLen = formation.filter((f) => f.queue > 0).length;

    return (
        <div className="flex flex-col p-4 bg-black bg-opacity-30 rounded space-y-4">
            <div>
                <span>{t("show-content")}：</span>
                <Checkbox
                    shape="round"
                    color="info"
                    animation="jelly"
                    icon={<i className="mdi mdi-check" />}
                    checked={options.type}
                    onChange={(e) =>
                        onUpdateOptions({ type: e.target.checked })
                    }
                >
                    {t("mercenary-type")}
                </Checkbox>
                <Checkbox
                    shape="round"
                    color="info"
                    animation="jelly"
                    icon={<i className="mdi mdi-check" />}
                    checked={options.queue}
                    onChange={(e) =>
                        onUpdateOptions({ queue: e.target.checked })
                    }
                >
                    {t("mercenary-queue")}
                </Checkbox>
                <Checkbox
                    shape="round"
                    color="info"
                    animation="jelly"
                    icon={<i className="mdi mdi-check" />}
                    checked={options.backcolor}
                    onChange={(e) =>
                        onUpdateOptions({ backcolor: e.target.checked })
                    }
                >
                    {t("background-color")}
                </Checkbox>
                <Checkbox
                    shape="round"
                    color="info"
                    animation="jelly"
                    icon={<i className="mdi mdi-check" />}
                    checked={options.backimage}
                    onChange={(e) =>
                        onUpdateOptions({ backimage: e.target.checked })
                    }
                >
                    {t("background-grid")}
                </Checkbox>
                <Checkbox
                    shape="round"
                    color="info"
                    animation="jelly"
                    icon={<i className="mdi mdi-check" />}
                    checked={options.reverse}
                    onChange={(e) =>
                        onUpdateOptions({ reverse: e.target.checked })
                    }
                >
                    {t("reverse")}
                </Checkbox>
            </div>

            <div>
                <span>{t("image-width")}：</span>
                {downloadSize.map(({ value, name }) => (
                    <Radio
                        key={`download-size-${value}`}
                        name="download-size"
                        shape="round"
                        color="info"
                        animation="jelly"
                        icon={<i className="mdi mdi-check" />}
                        value={value}
                        checked={value === downloadSizeSelected}
                        onChange={() => setDownloadSizeSelected(value)}
                    >
                        {value !== 4 ? `${name}px` : name}
                    </Radio>
                ))}
                <input
                    type="number"
                    min={0}
                    max={2000}
                    className="p-1 w-16 h-6 text-white bg-gray-800 border border-gray-600 rounded"
                    value={downloadSizeCustom}
                    onChange={(e) =>
                        setDownloadSizeCustom(e.target.value.replace(/\D/, ""))
                    }
                    onFocus={() => setDownloadSizeSelected(4)}
                />{" "}
                px
            </div>

            <div className="flex items-center space-x-4">
                <button
                    type="button"
                    className="flex items-center justify-around w-36 h-10 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 border border-gray-600 text-white rounded shadow"
                    onClick={onResetClick}
                >
                    <MdRefresh size="2em" color="#fff" />
                    <span>{t("reset")}</span>
                </button>
                <button
                    type="button"
                    className={`flex items-center justify-around w-36 h-10 active:bg-red-600 border border-red-600 text-white rounded shadow ${
                        queueMode ? "bg-red-400" : "bg-red-700"
                    }`}
                    onClick={onQueueClick}
                >
                    {queueMode ? (
                        <div className="flex items-center justify-around w-full">
                            <GiPerspectiveDiceOne size="2em" color="#fff" />
                            <span>
                                {t("queue")}({queueLen})
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-around w-full">
                            <GiPerspectiveDiceSixFacesRandom
                                size="2em"
                                color="#fff"
                            />
                            <span>
                                {t("queue")}({queueLen})
                            </span>
                        </div>
                    )}
                </button>
                <button
                    type="button"
                    className="flex items-center justify-around w-36 h-10 bg-blue-600 hover:bg-blue-500 active:bg-blue-400 border border-blue-400 text-white rounded shadow"
                    onClick={onDownloadClick}
                >
                    <MdGetApp size="2em" color="#fff" />
                    <span>{t("download")}</span>
                </button>
            </div>

            <div className="flex space-x-4">
                <input
                    id="tool-copylink-text"
                    className="flex-grow p-1 text-md text-gray-400 bg-gray-900 border border-gray-600 rounded"
                    value={window.location.href}
                    readOnly
                />
                <button
                    type="button"
                    className="flex items-center justify-around w-36 h-10 bg-green-600 border border-green-400 text-white rounded shadow tool-copylink"
                    data-clipboard-target="#tool-copylink-text"
                >
                    <FaLink size="1.5em" color="#fff" />
                    <span>{t("copylink")}</span>
                </button>
            </div>
        </div>
    );
});

export default Toolbar;
