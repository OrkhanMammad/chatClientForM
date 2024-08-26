
import imgLeft from "../../../assets/images/statics/Saly-3.png";
import imgRight from "../../../assets/images/statics/Saly-2.png";
import { useAuthStyle } from "./auth.style";
const AuthComponent = ({children}:any) => {
    const {authMain,authLeft,authRight}=useAuthStyle()
    return (
        <div className={authMain}>
            <div className={authLeft}><img src={imgLeft} alt="" /></div>
            <div className={authRight}> <img src={imgRight} alt="" /></div>
            {children}
        </div>)
}

export default AuthComponent