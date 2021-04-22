import React from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export const SearchSymbol = props => {
    return (
        <div className="p-field">
            <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-search"></i>
                </span>
                <InputText
                    id="symbol"
                    autoFocus
                    onChange={props.onChange}
                    value={props.value}
                    aria-describedby="symbol-help"
                    className="p-d-block"
                    placeholder="Enter a symbol (Exemple: IBM)"
                />
                <Button
                    icon="pi pi-search"
                    label="Search"
                    onClick={props.onSearchOrganization}
                />
            </div>
            <small id="symbol-help" className="p-d-block">Enter a symbol and click on search button</small>
        </div>
    )
}