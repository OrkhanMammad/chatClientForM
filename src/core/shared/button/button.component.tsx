import { NavLink } from "react-router-dom";
import { IBtnProps } from "./button";
import { useButtonStyle } from "./button.style";
import { Routes } from "../../../router/routes";

const ButtonComponent = ({ content, btnClassName, type,onClick }: IBtnProps) => {
    const { button, buttonMain, secondaryButton } = useButtonStyle();

    return (
        <>
            {btnClassName === "buttonMain" ? (
                <button  onClick={onClick} type={type || "button"} className={`${button} ${buttonMain}`}>
                    {content}
                </button>
            ) : (
                <NavLink to={'/'+Routes.signup}>
                    <button onClick={onClick} className={`${button} ${secondaryButton}`}>
                        {content}
                    </button>
                </NavLink>
            )}
        </>
    );
};

export default ButtonComponent;
