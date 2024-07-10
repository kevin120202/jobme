import React from 'react'

export default function FormRowSelect({ name, labelText, list, defaultValue = "" }) {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">{labelText || name}</label>
            <select name={name} id={name} className="form-select" defaultValue={defaultValue}>
                {list.map(itemVal => {
                    return (
                        <option key={itemVal} value={itemVal}>{itemVal}</option>
                    )
                })}
            </select>
        </div>
    )
}
