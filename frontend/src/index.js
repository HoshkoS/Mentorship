import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import Login from './login/Login';
import "./App.scss";

const domNode = document.getElementById("root");

const root = createRoot(domNode);
root.render(<Login />);
