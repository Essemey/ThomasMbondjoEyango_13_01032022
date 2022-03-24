import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import Home from "./pages";



export default function App() {


    return <>
        <Header />
        <Outlet />
        <Footer />
    </>
}