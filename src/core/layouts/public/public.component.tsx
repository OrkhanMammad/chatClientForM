import { useAuthStyle } from "../auth/auth.style";



const PublicComponent = () => {
    

    const {authMain,authLeft,authRight}=useAuthStyle()
    return (
        <div className={authMain}>
            <div className={authLeft}></div>
            <div className={authRight}></div>
        </div>)
};


export default PublicComponent;

