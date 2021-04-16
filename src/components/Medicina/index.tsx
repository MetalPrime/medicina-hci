import React, { useEffect, useRef } from "react";
import "./index.scss";
import MedicinaConfig from "./src/main";

const Medicina = () => {

    const refContainer = useRef<any>()

    useEffect(() => {
        MedicinaConfig(refContainer.current)
    }, [])
    return <div ref={refContainer} className="Medicina"></div>
}

export default Medicina;