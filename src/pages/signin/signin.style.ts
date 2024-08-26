import { createUseStyles } from 'react-jss';
import sizes from './../../assets/styles/abstracts/sizes';
import fonts from '../../assets/styles/abstracts/fonts';
import colors from '../../assets/styles/abstracts/color';
import { breakpoint } from '../../assets/styles/abstracts/mixins';

const styles = {
    main: {

        backgroundColor: 'white',
        borderRadius: `${sizes.borderRadiusMain + 'px'}`,
        boxShadow: '0px 4px 4px 0px #00000040',
       
        width: '32%',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: `'${fonts.fontMain}', sans-serif`,
        position:'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex: '3',
        [breakpoint(1300)]: { 
            width: '40%',
        },
        [breakpoint(1024)]: { 
            width: '50%',
        },
        [breakpoint(850)]: { 
            width: '60%',
        },
        [breakpoint(520)]: { 
            width: '70%',
            height:'88vh'
        },
        [breakpoint(420)]: { 
            width: '80%',

        },

    },
    title: {
        fontSize: '3.3em',
        marginTop: '8px',
        marginBottom: '10px'
    },
    buttons: {
        marginTop: '3.5em',
        [breakpoint(520)]: { 
            marginTop: '2.5em',

        },

        '& p': {
            textAlign: 'center',
            color: `${colors.txtGray}`,
            margin: '30px 0',
            [breakpoint(520)]: { 
                margin: '15px 0',

            },

        }
    },
    form: {
        position: 'relative',
        width:'100%'
    },
   


}

export const useSigninStyles = createUseStyles(styles);
