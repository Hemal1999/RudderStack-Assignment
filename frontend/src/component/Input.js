import React, { useReducer, useEffect } from 'react';
import { validate } from '../util/validators';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }
        default:
            return state;
    }
}

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isTouched: false,
        isValid: props.initialValid || false
    });

    const { id, onInput, invalidateFormOnChange } = props;
    const { value, isValid } = inputState;
    useEffect(() => {
        if (onInput)
            onInput(id, value, isValid, invalidateFormOnChange);
    }, [id, value, isValid, onInput, invalidateFormOnChange]);

    const changeHandler = (event, metaData) => {
        let val = event.target.value;

        if (event.target.type === 'checkbox')
            val = event.target.checked;

        if (event.target.type === 'radio') {
            val = event.target.id;
        }

        dispatch({
            type: 'CHANGE',
            val: val,
            validators: props.validators
        });

        if (props.onChange)
            props.onChange(val);
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    };

    let element;
    // eslint-disable-next-line default-case
    switch (props.type) {
        case "input":
            element = (
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    {/* <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        for={props.id}
                    >
                        {props.label}
                    </label> */}
                    {props.label}
                    <input
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name={props.name}
                        id={props.id}
                        value={inputState.value}
                        placeholder={props.placeholder}
                        onChange={changeHandler}
                        onBlur={touchHandler}
                    />
                    {!inputState.isValid && inputState.isTouched && (
                        <p class="text-red-500 text-xs italic">{props.regexErrorMessage || "Invalid field."}.</p>
                    )}

                </div>
            );
            break;
        case "checkbox":
            element = (
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <input
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        type="checkbox"
                        id={props.id}
                        name={props.name}
                        checked={inputState.value}
                        onChange={changeHandler}
                        onBlur={touchHandler}
                    />
                    <label
                        for={props.name}
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        {props.label}
                    </label>
                    {!inputState.isValid && inputState.isTouched && (
                        <p class="text-red-500 text-xs italic">{props.regexErrorMessage || "Invalid field."}.</p>
                    )}
                </div>
            )
            break;
        case "singleSelect":
            element = (
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <di>{props.label}</di>
                    <label
                        for={props.name}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    />
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name={props.name}
                        id={props.id}
                        onChange={changeHandler}
                        onBlur={touchHandler}
                    >
                        <option value="undefined" selected>Click to select</option>
                        {props.options.map((option, index) => {
                            return (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>
                            );
                        })}
                    </select>
                    {!inputState.isValid && inputState.isTouched && (
                        <p class="text-red-500 text-xs italic">{props.regexErrorMessage || "Invalid field."}.</p>
                    )}
                </div>
            )
            break;
        case "radio":
            element = (
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <p>{props.label}</p>
                    {props.options.map((option, index) => {
                        return (
                            <div key={index} class="flex items-center">
                                <input
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    key={index}
                                    type="radio"
                                    id={option.label}
                                    name={props.name}
                                    onChange={(e) => changeHandler(e, { parentId: props.id })}
                                    onBlur={touchHandler}
                                />
                                <label
                                    for="default-radio-2"
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {option.label}
                                </label>
                            </div>
                        );
                    })}
                    {!inputState.isValid && inputState.isTouched && (
                        <p class="text-red-500 text-xs italic">{props.regexErrorMessage || "Invalid field."}.</p>
                    )}
                </div>
            )
            break;
    }
    return (
        <React.Fragment>
            {element}
        </React.Fragment>
    );
}


export default Input;

