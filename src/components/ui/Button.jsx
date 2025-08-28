export default function Button({ variant, text, className, ...props }) {
    const variantClasses = {
        contained: `bg-primary border-2 border-transparent px-8 py-3 xl:px-10 xl:py-3 3xl:px-12 3xl:py-4 rounded-4xl text-white text-[16px] xl:text-sm 3xl:text-base cursor-pointer ${className}`,
        outlined: `bg-transparent border-2 cursor-pointer border-primary px-8 py-3 md:px-12 md:py-4 rounded-4xl text-white text-[16px] xl:text-sm 3xl:text-base ${className}`,
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
