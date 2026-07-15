import { forwardRef, useImperativeHandle, useRef } from 'react';
import { ChevronDownIcon } from '@/Components/AuthIcons';

export default forwardRef(function IconSelect(
    { icon, className = '', placeholder, value, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    return (
        <div
            className={`flex items-center gap-3 rounded-xl bg-gray-100 px-4 py-3.5 transition focus-within:ring-2 focus-within:ring-teal-700/40 ${className}`}
        >
            <span className="text-gray-400 shrink-0">{icon}</span>
            <select
                {...props}
                ref={localRef}
                value={value}
                className={`w-full appearance-none bg-transparent border-none outline-none focus:ring-0 p-0 text-sm cursor-pointer ${
                    value ? 'text-gray-800' : 'text-gray-400'
                }`}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {props.children}
            </select>
            <ChevronDownIcon className="w-4 h-4 text-gray-400 shrink-0" />
        </div>
    );
});