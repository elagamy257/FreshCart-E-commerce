import React from "react";
import { Bars } from "react-loader-spinner";

export default function Loader() {
    return (
        <div className="h-screen d-flex justify-content-center align-items-center position-fixed top-0 start-0 end-0 bottom-0 bg-light z-50">
            <Bars
                height="80"
                width="80"
                color="#0d6efd"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
}