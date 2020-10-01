import React from "react";

const InputWithLabel = ({
                            id, children, onInputChange,
                            value, type = 'text', isFocused = false
                        }) => {

    const inputRef = React.useRef();

    React.useEffect(() => {
            if (isFocused && inputRef.current) {
                inputRef.current.focus();

            }
        }, [isFocused] // only run if isFocused value changed
    );
    return (
        <>
            <label className="text-success form-control-plaintext" htmlFor={id}>{children}</label>
            <input className="m-2 form-control"
                   placeholder="Search something here."
                   ref={inputRef}
                   type={type}
                   id={id}
                   value={value}
                   onChange={onInputChange}
            />
        </>
    );
};
export default InputWithLabel;