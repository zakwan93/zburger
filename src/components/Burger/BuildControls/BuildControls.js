import React from 'react';

import classes from "./BuildControls.css";
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Meat', type:'meat'},
    {label: 'Cheese', type:'cheese'}
];


const buildControls = (props) => (
    <div className = {classes.BuildControls}>
        {controls.map( ctrl => (
            <BuildControl 
                key = {ctrl.label} 
                label = {ctrl.label}
                // type = {ctrl.type}
                added = { () => props.ingredientAdded(ctrl.type)}
                removed = { () => props.ingredientRemove(ctrl.type)}
                disabled = {props.disabled[ctrl.type]} />
        ))}
    </div>
);


export default buildControls;


