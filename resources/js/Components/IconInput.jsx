import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function IconInput(
    { icon, className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <div
            className={`flex items-center gap-3 rounded-xl bg-gray-100 px-4 py-3.5 transition focus-within:ring-2 focus-within:ring-teal-700/40 ${className}`}
        >
            <span className="text-gray-400 shrink-0">{icon}</span>
            <input
                {...props}
                ref={localRef}
                className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 text-gray-800 placeholder-gray-400 text-sm"
            />
        </div>
    );
});