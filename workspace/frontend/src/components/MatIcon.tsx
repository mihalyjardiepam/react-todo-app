export interface MatIconProps {
    icon: string;
}

function MatIcon({ icon }: MatIconProps) {
    return (
        <span className="material-symbols-outlined">
            {icon}
        </span>
    );
}

export default MatIcon;