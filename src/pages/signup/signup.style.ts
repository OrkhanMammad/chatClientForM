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
        padding:'40px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
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
            padding:'30px',

        },
        [breakpoint(420)]: { 
            width: '80%',
            padding:'20px',

        },



    },
    title:{
        width:'100%',
        fontSize:'3.3em',
        marginTop:'8px',
        marginBottom:'10px',
        textAlign:'start'
    },
    buttons:{
        marginTop:'2.3em',
        [breakpoint(520)]: { 
            marginTop: '2em',

        },
        [breakpoint(420)]: { 
            marginTop: '0.5em',

        },

       
    },
    form:{
        position:'relative',
        width:'100%'
    },
    signUptoSingIn:{
        textDecoration:'none',
       
        color:'#ca974f'
    },
    signUpHeader:{
        width:'100%',
        display:'flex',
        justifyContent:'space-between',
        
        '& div':{
        '& p':{
            color:`${colors.txtGray}`,
    
           }}
    },
    signUpAdditionalFormItem:{
        display:'flex',
        justifyContent:'space-between',
        '& div':{
            width:'100%'
        }
    }
   
    
}

export const useSignupStyles = createUseStyles(styles);
