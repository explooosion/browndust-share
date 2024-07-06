import { memo } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Checkbox } from "pretty-checkbox-react";

const Labels = memo(function Labels({ nameOptions, setNameOptions }) {
    const { t } = useTranslation();

    const onNameOptionsChange = (label) => {
        setNameOptions((prevOptions) =>
            prevOptions.map((option) =>
                option.label === label
                    ? { ...option, checked: !option.checked }
                    : option,
            ),
        );
    };

    const renderFilterNameOptions = () =>
        nameOptions.map(({ label, checked }, index) => (
            <div className="text-xl" key={`name-${index}`}>
                <Checkbox
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

    return (
        <div className="flex items-center">
            <span>{t("name")}：</span>
            {renderFilterNameOptions()}
        </div>
    );
});

Labels.propTypes = {
    nameOptions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            checked: PropTypes.bool.isRequired,
        }),
    ).isRequired,
    setNameOptions: PropTypes.func.isRequired,
};

export default Labels;
