import { createUseStyles } from 'react-jss';
import colors from '../../../assets/styles/abstracts/color';
import sizes from '../../../assets/styles/abstracts/sizes';
import { breakpoint } from '../../../assets/styles/abstracts/mixins';

const styles = {
    input: {
        
        margin:'10px 0',
        width: '100%',
        padding: '15px',
        backgroundColor: '#ffffff6e',
        backdropFilter: 'blur(2px)',
        borderRadius: `${sizes.borderRadiusInpBtn}px`,
        color: '#808080',
        border: `1px solid ${colors.inputBorder}`,
        outline: 'none',
        
        '&:focus': {
            outline: '1px solid #4285F4',
            boxShadow: `0px 4px 4px 0px ${colors.inputShadowColor}`,

        }
    },
    formItem:{
        marginTop:'20px',
        width:'100%',
        [breakpoint(420)]: { 
            marginTop:'10px',

        },
    },
    inpLabel:{
        fontSize:'14px'
    }
};

export const useInputStyles = createUseStyles(styles);
