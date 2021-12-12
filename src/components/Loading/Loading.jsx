import React from "react"
import ReactLoading from 'react-loading'

function Loader() {
    return (
        <>
             <ReactLoading type={"spin"} color={"#006F91"} height={200} width={200} />
        </>
    )
}

export default Loader