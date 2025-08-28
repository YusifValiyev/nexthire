export default function Button({ variant, text, className, ...props }) {
    const variantClasses = {
        contained: `bg-primary border-2 border-transparent px-8 py-3 md:px-12 md:py-4 rounded-4xl text-white text-base ${className}`,
        outlined: `bg-transparent border-2 border-primary px-8 py-3 md:px-12 md:py-4 rounded-4xl text-white text-base ${className}`,
    };

    return (
        <button
            {...props}
            className={variantClasses[variant] ?? variantClasses.contained}
        >
            {text ?? "Click Me"}
        </button>
    );
}
