import { memo } from "react";

export interface MatIconProps {
    icon: string;
}

export const MatIcon = memo(({ icon }: MatIconProps) => {
    return <span className="material-symbols-outlined">{icon}</span>;
});
