import React from 'react';
import './index.css';
import App from './App';
import ThreeEntrypoint from './threejs/ThreeEntrypoint';
import {Pong} from './pages/Pong';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/boids" element={<ThreeEntrypoint sceneInteractable={true}/>} />
            <Route path="/ping" element={<Pong/>} />
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
