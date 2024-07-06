import { useEffect, memo } from "react";
import { useTranslation } from "react-i18next";
import { Radio } from "pretty-checkbox-react";
import Clipboard from "clipboard";
import PropTypes from "prop-types";

const OutputGroup = memo(function OutputGroup(props) {
    const {
        downloadSizeSelected,
        setDownloadSizeSelected,
        downloadSizeCustom,
        setDownloadSizeCustom,
    } = props;

    const { t } = useTranslation();

    useEffect(() => {
        new Clipboard(".tool-copylink");
    }, []);

    const downloadSize = [
        { value: 1, name: 700 },
        { value: 2, name: 520 },
        { value: 3, name: 420 },
        { value: 4, name: t("image-width-custom") },
    ];

    return (
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
    );
});

OutputGroup.propTypes = {
    downloadSizeSelected: PropTypes.number.isRequired,
    setDownloadSizeSelected: PropTypes.func.isRequired,
    downloadSizeCustom: PropTypes.number.isRequired,
    setDownloadSizeCustom: PropTypes.func.isRequired,
};

export default OutputGroup;
