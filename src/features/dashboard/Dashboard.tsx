import { Box, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import WelcomeBanner from './WelcomeBanner';
import Layout from './Layout.tsx';
import LivrosRecentesDashboard from "./LivrosRecentesDashboard.tsx";

const Dashboard = () => {
    return (
        <Layout sx={{ display: 'flex', bgcolor: '#f7f9fb', minHeight: '100vh' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, ml: 20, p: 4, width: '85vw' }}>
                <WelcomeBanner />
                <LivrosRecentesDashboard/>
            </Box>
        </Layout>
    );
};

export default Dashboard;
