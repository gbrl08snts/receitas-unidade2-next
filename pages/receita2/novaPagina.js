import React from 'react';
import { GatoDeBotas } from "./components/novoComponente";
import { SextaFeira } from "./components/novoComponente2";
import { Cerveja } from "./components/novoComponente3";

export default function Principal() {
    return(
        <div>
            <h1>Nova Página!</h1>
            <MariaPrea/>
            <GatoDeBotas/>
            <SextaFeira/>
            <Cerveja/>
            <MariaPrea mensagem="Morreu Maria Preá..."/>
        </div>
    );
};

export function MariaPrea({mensagem}) {
    return(
        <h2>{mensagem}</h2>
    );
};
