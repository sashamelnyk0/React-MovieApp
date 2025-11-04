import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import { Box } from '@mui/material';

const providers = [
        { id: 'google', name: 'Google' },
        { id: 'facebook', name: 'Facebook' },
        { id: 'twitter', name: 'Twitter' },
];
const BRANDING = {
  logo: (
        <MovieFilterOutlinedIcon
            alt='Movie app logo'
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 80 }}
        />
        
  ),
  title: 'Movie App',
};
const signIn = async (provider) => {
    const promise = new Promise((resolve) => {
    setTimeout(() => {
        console.log(`Sign in with ${provider.id}`);
        resolve({ error: 'This is a fake error' });
    }, 500);
    });
    return promise;
};

export default function LoginPage() {
    const theme = useTheme();
    return (
        <AppProvider branding={BRANDING} theme={theme}>
            <Box 
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '100vh', 
                padding: 4,
                
                }}>
                <SignInPage signIn={signIn} providers={providers} sx={{boxShadow:'0px 0px 12px rgba(144, 54, 186, 1)'}}/>
            </Box>
            
        </AppProvider>
    )
}