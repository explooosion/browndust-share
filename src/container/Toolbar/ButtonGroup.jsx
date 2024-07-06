import { useEffect, memo, useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { MdRefresh, MdGetApp } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import PropTypes from "prop-types";
import {
    GiPerspectiveDiceSixFacesRandom,
    GiPerspectiveDiceOne,
} from "react-icons/gi";
import { toPng } from "html-to-image";
import moment from "moment";
import Clipboard from "clipboard";

import {
    setFormation,
    setQueue,
    setQueueMode,
    reset,
} from "../../reducers/dataset";
import { resizeImageURL } from "../../utils";

const downloadSizes = [
    { value: 1, name: 700 },
    { value: 2, name: 520 },
    { value: 3, name: 420 },
    { value: 4, name: "image-width-custom" },
];

const ButtonGroup = memo(function ButtonGroup({
    downloadSizeSelected,
    downloadSizeCustom,
}) {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { formation, queueMode, ref } = useSelector(
        (state) => ({
            formation: state.dataset.formation,
            queueMode: state.dataset.queueMode,
            ref: state.dataset.ref,
        }),
        shallowEqual,
    );

    useEffect(() => {
        new Clipboard(".tool-copylink");
    }, []);

    const handleQueueClick = useCallback(() => {
        if (queueMode) {
            dispatch(setQueue([]));
            dispatch(setQueueMode(false));
        } else {
            const updatedFormation = formation.map((f) => ({ ...f, queue: 0 }));
            dispatch(setFormation(updatedFormation));
            dispatch(setQueueMode(true));
        }
    }, [dispatch, formation, queueMode]);

    const handleDownloadClick = useCallback(async () => {
        const size =
            downloadSizeSelected !== 4
                ? downloadSizes.find((d) => d.value === downloadSizeSelected)
                      ?.name
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
    }, [downloadSizeSelected, downloadSizeCustom, ref]);

    const handleResetClick = useCallback(() => {
        dispatch(reset());
    }, [dispatch]);

    const queueLen = formation.filter((f) => f.queue > 0).length;

    return (
        <>
            <div className="flex items-center space-x-4">
                <Button onClick={handleResetClick} color="gray">
                    <MdRefresh size="2em" color="#fff" />
                    <span>{t("reset")}</span>
                </Button>
                <Button
                    onClick={handleQueueClick}
                    color={queueMode ? "red-light" : "red-dark"}
                >
                    {queueMode ? (
                        <IconLabel
                            icon={
                                <GiPerspectiveDiceOne size="2em" color="#fff" />
                            }
                            label={`${t("queue")}(${queueLen})`}
                        />
                    ) : (
                        <IconLabel
                            icon={
                                <GiPerspectiveDiceSixFacesRandom
                                    size="2em"
                                    color="#fff"
                                />
                            }
                            label={`${t("queue")}(${queueLen})`}
                        />
                    )}
                </Button>
                <Button onClick={handleDownloadClick} color="blue">
                    <MdGetApp size="2em" color="#fff" />
                    <span>{t("download")}</span>
                </Button>
            </div>

            <div className="flex space-x-4">
                <input
                    id="tool-copylink-text"
                    className="flex-grow p-1 text-md text-gray-400 bg-gray-900 border border-gray-600 rounded"
                    value={window.location.href}
                    readOnly
                />
                <Button
                    className="tool-copylink"
                    color="green"
                    dataClipboardTarget="#tool-copylink-text"
                    onClick={() => {}}
                >
                    <FaLink size="1.5em" color="#fff" />
                    <span>{t("copylink")}</span>
                </Button>
            </div>
        </>
    );
});

const Button = memo(function Button({
    children,
    onClick,
    color,
    className,
    dataClipboardTarget,
}) {
    const baseClasses =
        "flex items-center justify-around w-36 h-10 border text-white rounded shadow";
    const colorClasses = {
        gray: "bg-gray-800 hover:bg-gray-700 active:bg-gray-600 border-gray-600",
        "red-light": "bg-red-400 active:bg-red-600 border-red-600",
        "red-dark": "bg-red-700 active:bg-red-600 border-red-600",
        blue: "bg-blue-600 hover:bg-blue-500 active:bg-blue-400 border-blue-400",
        green: "bg-green-600 border-green-400",
    };

    return (
        <button
            type="button"
            className={`${baseClasses} ${colorClasses[color]} ${
                className || ""
            }`}
            onClick={onClick}
            data-clipboard-target={dataClipboardTarget}
        >
            {children}
        </button>
    );
});

const IconLabel = memo(function IconLabel({ icon, label }) {
    return (
        <div className="flex items-center justify-around w-full">
            {icon}
            <span>{label}</span>
        </div>
    );
});

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.oneOf(["gray", "red-light", "red-dark", "blue", "green"])
        .isRequired,
    className: PropTypes.string,
    dataClipboardTarget: PropTypes.string,
};

IconLabel.propTypes = {
    icon: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
};

ButtonGroup.propTypes = {
    downloadSizeSelected: PropTypes.number.isRequired,
    downloadSizeCustom: PropTypes.number.isRequired,
};

export default ButtonGroup;
