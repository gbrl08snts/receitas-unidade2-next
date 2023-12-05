import React from 'react';
import { NewPhrase2 } from "./index2";
import { NewPhrase3 } from "./index3";
import { NewPhrase4 } from "./index4";
import { NewPhrase5 } from "./index5";

export default function Home() {
    return(
        <div>
            <h2>Viva Santana!</h2>
            {NewPhrase2()}
            {NewPhrase3()}
            {NewPhrase4()}
            {NewPhrase5()}
        </div>
    );
};
