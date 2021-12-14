import { useState, createContext } from "react";

const AppContext = createContext();

function AppProvider({ children }) {

    const [user, setUser] = useState({});
    const [allPokemon, setAllPokemon] = useState([]);
    const [myPokemon, setMyPokemon] = useState([]);
    const [battlePokemon, setBattlePokemon] = useState({});

    const state = {
        userState: [user, setUser],
        allPokemonState: [allPokemon, setAllPokemon],
        myPokemonState: [myPokemon, setMyPokemon],
        battlePokemonState: [battlePokemon, setBattlePokemon]
    };

    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider };