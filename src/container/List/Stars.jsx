import { memo } from "react";
import { FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Checkbox } from "pretty-checkbox-react";
import PropTypes from "prop-types";

const Stars = memo(function Star(props) {
    const { stars, setStars } = props;

    const { t } = useTranslation();

    const onStarChange = (label) => {
        setStars((prevStars) =>
            prevStars.map((star) =>
                star.label === label
                    ? { ...star, checked: !star.checked }
                    : star,
            ),
        );
    };

    const renderFilterStars = () =>
        stars.map(({ label, checked }, index) => (
            <div key={`star-${index}`}>
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

    return (
        <div className="flex items-center text-md">
            <div className="flex justify-center items-center space-x-1">
                <FaStar />
                <span>{t("star")}：</span>
            </div>
            {renderFilterStars()}
        </div>
    );
});

Stars.propTypes = {
    stars: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            checked: PropTypes.bool.isRequired,
            star: PropTypes.number.isRequired,
        }),
    ).isRequired,
    setStars: PropTypes.func.isRequired,
};

export default Stars;
