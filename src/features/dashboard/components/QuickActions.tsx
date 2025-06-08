// src/features/dashboard/components/QuickActions.tsx

import { Card, CardHeader, CardContent, List, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { PersonAdd, FileUpload, History } from '@mui/icons-material';

const QuickActions = () => (
    <Card>
        <CardHeader 
            title="Ações Rápidas"
            titleTypographyProps={{ variant: 'h2', fontSize: '1.5rem' }}
        />
        <Divider />
        <CardContent>
            <List component="nav">
                <ListItemButton>
                    <ListItemIcon><PersonAdd color="primary"/></ListItemIcon>
                    <ListItemText primary="Cadastrar Novo Usuário" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon><FileUpload color="primary"/></ListItemIcon>
                    <ListItemText primary="Importar Acervo (.csv)" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon><History color="primary"/></ListItemIcon>
                    <ListItemText primary="Ver Histórico de Empréstimos" />
                </ListItemButton>
            </List>
        </CardContent>
    </Card>
);

export default QuickActions;