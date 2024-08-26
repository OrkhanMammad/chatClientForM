import { createUseStyles } from 'react-jss';
import { breakpoint } from '../../../assets/styles/abstracts/mixins';

const styles = {
    authMain: {
        display: 'flex',

        alignItems: 'center',
        height: '100vh',
        position: 'relative'


    },

    authLeft: {
        backgroundColor: '#ecbc76 ',
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',

        paddingBottom: '250px',
        [breakpoint(1240)]: { 
            width: '100%',
        },
        '& img':{
            [breakpoint(1240)]: { 
                display:'none'
            },
        }
    }
    ,
    authRight: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',

        paddingBottom: '250px',
        [breakpoint(1240)]: { 
            display:'none'
        },
        
    }


}

export const useAuthStyle = createUseStyles(styles);
