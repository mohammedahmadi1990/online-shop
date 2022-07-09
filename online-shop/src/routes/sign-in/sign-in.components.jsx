import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import Button from '../../components/button/button.component';

const SignIn = ()=>{

    const logGoogleUser = async ()=>{
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign In</h1>
            <Button buttonType='google' onClick={logGoogleUser}>Sign in with Google</Button>
            <SignUpForm />
        </div>
    )
}

export default SignIn