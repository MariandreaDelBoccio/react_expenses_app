import Button from './Button'
import Logout from '../assets/images/log-out.svg?react';
import { auth } from '../firebase/firebaseConfig'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate()

    const logout = async () => {
        try {
            await signOut(auth);
            navigate('/login')
        } catch(e: unknown) {
            console.log(e);
        }
    }

    return (
        <Button $bigIcon as="button" onClick={logout} to="#">
            <Logout />
        </Button>
    )
}

export default LogoutButton