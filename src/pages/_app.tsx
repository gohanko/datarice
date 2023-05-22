import React from "react";
import "antd/dist/reset.css";
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
    return (
        <React.Fragment>
            <Component {...pageProps} />
        </React.Fragment>
    )
}
