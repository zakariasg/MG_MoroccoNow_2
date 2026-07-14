export function EnvelopeIcon(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            className="w-5 h-5"
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5A2.25 2.25 0 0 1 18.75 19.5H5.25A2.25 2.25 0 0 1 3 17.25V6.75Z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3.5 6.5 8 6.25a1.5 1.5 0 0 0 1.85 0l8.15-6.25"
            />
        </svg>
    );
}

export function LockIcon(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            className="w-5 h-5"
            {...props}
        >
            <rect x="5" y="10.5" width="14" height="9.5" rx="2" strokeLinejoin="round" />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10.5V7.5a4 4 0 0 1 8 0v3"
            />
        </svg>
    );
}

export function UserIcon(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            className="w-5 h-5"
            {...props}
        >
            <circle cx="12" cy="8" r="3.25" />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.75 19.25a7.25 7.25 0 0 1 14.5 0"
            />
        </svg>
    );
}