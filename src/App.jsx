import { useState, useEffect, memo } from "react";
import { HashRouter } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Header from "./container/Header";
import Formation from "./container/Formation";
import List from "./container/List";
import Toolbar from "./container/Toolbar";
import Tips from "./container/Tips";

import { setCharactersGlobal } from "./reducers/charactersGlobal";
import { setCharacters } from "./reducers/characters";
import { setFormation } from "./reducers/dataset";
import { getCharacters, getCharactersGlobal } from "./services/Characters";
import { initialFormation } from "./utils";

const App = memo(function App() {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    const formation = useSelector(
        (state) => state.dataset.formation,
        shallowEqual,
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const _cGlobal = await getCharactersGlobal();
                dispatch(setCharactersGlobal(_cGlobal));
                const _c = await getCharacters();
                dispatch(setCharacters(_c));
                const _f = initialFormation(formation, _c);
                dispatch(setFormation(_f));
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (isLoading) {
            fetchData();
        }
    }, [isLoading, dispatch, formation]);

    return (
        <HashRouter>
            <main className="p-4">
                <div className="relative lg:mx-auto mx-auto max-w-[1550px]">
                    <Header />
                    <section className="flex justify-between py-4">
                        <section className="space-y-4">
                            <Formation />
                            <Toolbar />
                            <Tips />
                        </section>
                        <List />
                    </section>
                </div>
            </main>
        </HashRouter>
    );
});

export default App;
