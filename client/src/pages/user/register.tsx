import React from 'react';
import {useDispatch, useSelector} from "@@/exports";

export default function RegisterPage() {
    const dispatch = useDispatch();
    const count = useSelector((state: any) => state.count);

    return (
        <div>
            <h2>{count.num}</h2>
            <button onClick={() => dispatch({type: 'count/add'})}>+</button>
            <p>
                To get started, edit <code>pages/index.tsx</code> and save to reload.
            </p>
        </div>
    );
};
