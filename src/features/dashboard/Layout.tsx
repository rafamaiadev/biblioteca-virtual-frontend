import type { ReactNode } from 'react';
import { Box } from '@mui/material';
import UserProfileMenu from "../../components/UserProfile";

interface LayoutProps {
    children: ReactNode;
    sx?: object;
}

export default function Layout({ children, sx }: LayoutProps) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
            sx={sx}
        >
            <UserProfileMenu />
            <Box component="main" flexGrow={1} px={4} py={8}>
                {children}
            </Box>
        </Box>
    );
}
