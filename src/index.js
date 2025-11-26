import React from 'react';
import './index.css';
import App from './App';
import ThreeEntrypoint from './pages/portfolio/threejs/ThreeEntrypoint'
import {Pong} from './pages/Pong';
import Furiganaizer from './pages/Furiganaizer';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import NotFound from "./pages/NotFound";
import { MonDocsHead } from './pages/monster-restaurant-docs/MonDocsHead';
import { MonDocsMarkdownPage } from './pages/monster-restaurant-docs/MonDocsMarkdownPage';

const container = document.getElementById('root');
const root = createRoot(container);

const getMonAppetitDocs = () => {
    return (
        <>
            <Route path="mondocs" element={<MonDocsHead/>}>
                <Route path=":slug" element={<MonDocsMarkdownPage />} />
                <Route index element={<MonDocsMarkdownPage/>}/>
            </Route>
        </>
    );
}

root.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="" element={<App/>}/>
            <Route exact path="boids" element={<ThreeEntrypoint sceneInteractable={true}/>}/>
            {getMonAppetitDocs()}
            <Route exact path="ping" element={<Pong/>}/>
            <Route exact path="furiganaize" element={<Furiganaizer/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
