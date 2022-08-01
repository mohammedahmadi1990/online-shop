import {useState, useContext} from "react";
import './sign-in-form.styles.scss';
import Button from '../button/button.component';
import FormInput from "../form-input/form-input.component";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"
import { UserContext } from "../../context/user.context";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = ()=>{

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext); 

    // Form Reset
    const resetForm = ()=>{
        setFormFields(defaultFormFields);
    }
    
    const signInWithGoogle = async ()=>{
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit= async (event)=>{
        event.preventDefault();

        try{
            const {user} = 
            await signInAuthUserWithEmailAndPassword(email,password);
            setCurrentUser(user);
            
            resetForm(); 
        }catch(error){
            switch(error.code){
                case 'auth/user-not-found':
                    alert('Unable to match this email with a user!');
                    break;
                case 'auth/wrong-password':
                    alert('Password is wrong!');
                    break;
                default:
                    alert('Something went wrong');
                    console.log(error);
            }
        }
    }

    const handleChange = (event)=>{
        const {name, value} = event.target;
        setFormFields({ ...formFields, [name]: value});
    };

    return(
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with you  email and Password!</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label="Pasword" type="password" required onChange={handleChange} name="password" value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>   
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div> 
            </form>

        </div>
    )
}

export default SignInForm