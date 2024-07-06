import { useEffect, memo } from "react";
import { HashRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setCharactersGlobal } from "./reducers/charactersGlobal";
import { setCharacters } from "./reducers/characters";
import { setFormation } from "./reducers/dataset";
import { getCharacters, getCharactersGlobal } from "./services/Characters";
import { initialFormation } from "./utils";

import Header from "./container/Header";
import Formation from "./container/Formation";
import List from "./container/List";
import Toolbar from "./container/Toolbar";
import Tips from "./container/Tips";

const App = memo(function App() {
    const dispatch = useDispatch();

    const formation = useSelector((state) => state.dataset.formation);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [charactersGlobal, characters] = await Promise.all([
                    getCharactersGlobal(),
                    getCharacters(),
                ]);
                dispatch(setCharactersGlobal(charactersGlobal));
                dispatch(setCharacters(characters));
                dispatch(setFormation(initialFormation(formation, characters)));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <HashRouter>
            <main className="p-4">
                <div className="mx-auto max-w-[1550px]">
                    <Header />
                    <section className="flex-col md:flex-row flex items-start justify-around py-5 px-2 md:px-0">
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
