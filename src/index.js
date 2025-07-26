import React from 'react';
import './index.css';
import App from './App';
import ThreeEntrypoint from './threejs/ThreeEntrypoint';
import {Pong} from './pages/Pong';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import NotFound from "./pages/NotFound";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<App/>}/>
            <Route exact path="/boids" element={<ThreeEntrypoint sceneInteractable={true}/>}/>
            <Route exact path="/ping" element={<Pong/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
