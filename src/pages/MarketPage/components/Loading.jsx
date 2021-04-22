import { Skeleton } from "primereact/skeleton";
import React from "react";

export const Loading = () => {
    return (
        <div className="p-mb-3">
            <div className="p-d-flex p-ai-center">
                <Skeleton shape="circle" size="4rem" className="p-mr-2" />
                <div style={{ flex: '1' }}>
                    <Skeleton width="100%" className="p-mb-2" />
                    <Skeleton width="75%" />
                </div>
            </div>
        </div>
    )
}