import React from 'react';
import errorImg from '/src/assets/images/not-found.jpg';

export default function Notfound() {
    return (
    <div className="w-50 mx-auto">
        <img src={errorImg} className="w-100" alt="error 404 not found" />
    </div>
    );
}