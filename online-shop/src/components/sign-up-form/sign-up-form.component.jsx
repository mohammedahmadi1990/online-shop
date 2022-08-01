import {useState, useContext} from "react";
import FormInput from "../form-input/form-input.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import './sign-up-form.styles.scss';
import Button from '../button/button.component';
import { UserContext } from "../../context/user.context";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const {setCurrentUser} = useContext(UserContext);

    // Form Reset
    const resetForm = ()=>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit= async (event)=>{
        event.preventDefault();
        if(password !== confirmPassword){
            alert("Passwords are not identical!");
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password);

            setCurrentUser(user);

            await createUserDocumentFromAuth(user, {displayName});
            resetForm(); 
        }catch(error){
            if( error.code === 'auth/email-already-in-use')
                {
                    alert('can not create user since there is a user with this email.')
                }
            console.log('user creation error: ', error);
        }
    }



    const handleChange = (event)=>{
        const {name, value} = event.target;
        setFormFields({ ...formFields, [name]: value});
    };

    return(
    <div className="sign-up-container">
        <h2>Don't have an account?</h2>
        <span>Sign up with your email address and password!</span>
        <form onSubmit={handleSubmit}>
            <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />

            <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

            <FormInput label="Pasword" type="password" required onChange={handleChange} name="password" value={password} />

            <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

            <Button name="submit" type="submit">Sign Up</Button>   
            {/* <Button name="reset" type="reset" onClick={resetForm}>Reset</Button>           */}
        </form>
    </div>
    )
}

export default SignUpForm 