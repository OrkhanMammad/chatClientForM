import { createUseStyles } from 'react-jss';
import colors from '../../../assets/styles/abstracts/color';
import sizes from '../../../assets/styles/abstracts/sizes';

const styles = {
    button: {
        width: '100%',
        padding: '15px',
        borderRadius: `${sizes.borderRadiusInpBtn}px`,
        border: `none`,
        cursor:'pointer',


    },

buttonMain: {
    backgroundColor: `${colors.mainButtonBgColor}`,
        color: `${colors.mainButtonTextColor}`,

        boxShadow:'0px 4px 19px 0px #7793414D'

},
secondaryButton:{
    backgroundColor: `${colors.secondaryButtonBgColor}`,
    color: `${colors.secondaryButtonTextColor}`,
}}

export const useButtonStyle = createUseStyles(styles);
