import React from "react";
import "antd/dist/reset.css";
import '../styles/globals.css'
import HydrationZustand from "../components/HydrationZustand/hydration_zustand";

export default function App({ Component, pageProps }) {
    return (
        <HydrationZustand>
            <Component {...pageProps} />
        </HydrationZustand>
    )
}
