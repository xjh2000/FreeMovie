import React from 'react';
import yayJpg from '../assets/yay.jpg';

export default function HomePage() {
    function testClick() {
        alert('test');
    }

    return (
        <div>
            <h2>Yay! Welcome to umi!</h2>
            <p>
                <img src={yayJpg} width="388"/>
            </p>
            <button onClick={testClick}>Click me</button>
            <p>
                To get started, edit <code>pages/index.tsx</code> and save to reload.
            </p>
        </div>
    );
}
