import { memo, useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Checkbox } from "pretty-checkbox-react";
import PropTypes from "prop-types";

import { setOptions } from "../../reducers/dataset";

const CheckboxItem = memo(function CheckboxItem({ optionKey, label }) {
    const dispatch = useDispatch();
    const options = useSelector((state) => state.dataset.options, shallowEqual);

    const onUpdateOptions = useCallback(
        (payload) => {
            dispatch(setOptions({ ...options, ...payload }));
        },
        [dispatch, options],
    );

    return (
        <Checkbox
            shape="round"
            color="info"
            animation="jelly"
            icon={<i className="mdi mdi-check" />}
            checked={options[optionKey]}
            onChange={(e) => onUpdateOptions({ [optionKey]: e.target.checked })}
        >
            {label}
        </Checkbox>
    );
});

CheckboxItem.propTypes = {
    optionKey: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

const DISPLAY_GROUP = {
    type: "mercenary-type",
    queue: "mercenary-queue",
    backcolor: "background-color",
    backimage: "background-grid",
    reverse: "reverse",
};

const DisplayGroup = memo(function DisplayGroup() {
    const { t } = useTranslation();

    const renderCheckboxItem = useCallback(() => {
        return Object.entries(DISPLAY_GROUP).map(([key, label]) => (
            <CheckboxItem key={key} optionKey={key} label={t(label)} />
        ));
    }, []);

    return (
        <div>
            <span>{t("show-content")}：</span>
            {renderCheckboxItem()}
        </div>
    );
});

export default DisplayGroup;
