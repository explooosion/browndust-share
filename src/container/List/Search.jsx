import { memo } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const Search = memo(function Search(props) {
    const { search, setSearch } = props;

    const { t } = useTranslation();

    return (
        <input
            className="w-full p-2 text-md bg-gray-800 border border-gray-600 rounded"
            type="text"
            placeholder={t("search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    );
});

Search.propTypes = {
    search: PropTypes.string.isRequired,
    setSearch: PropTypes.func.isRequired,
};

export default Search;
