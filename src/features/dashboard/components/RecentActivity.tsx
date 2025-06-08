// src/features/dashboard/components/RecentActivity.tsx

import { Card, CardHeader, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, Box } from '@mui/material';
import { AddCircleOutline, PersonAddOutlined, ArrowUpwardOutlined } from '@mui/icons-material';

const RecentActivity = () => (
    <Card>
        <CardHeader 
            title="Atividade Recente" 
            titleTypographyProps={{ variant: 'h2', fontSize: '1.5rem' }} // Usando o h2 do tema
        />
        <Divider />
        <CardContent>
            <List>
                <ListItem>
                    <ListItemIcon><AddCircleOutline color="success" /></ListItemIcon>
                    <ListItemText 
                        primary={
                            <Typography variant="body2">
                                O livro <Box component="span" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Duna</Box> foi adicionado ao acervo.
                            </Typography>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon><PersonAddOutlined color="info" /></ListItemIcon>
                    <ListItemText 
                        primary={
                            <Typography variant="body2">
                                <Box component="span" sx={{ fontStyle: 'italic', color: 'text.primary' }}>Mariana Souza</Box> se cadastrou na plataforma.
                            </Typography>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon><ArrowUpwardOutlined color="primary" /></ListItemIcon>
                    <ListItemText 
                        primary={
                             <Typography variant="body2">
                                <Box component="span" sx={{ fontStyle: 'italic', color: 'text.primary' }}>João Silva</Box> pegou emprestado <Box component="span" sx={{ fontWeight: 'bold', color: 'text.primary' }}>O Hobbit</Box>.
                            </Typography>
                        }
                    />
                </ListItem>
            </List>
        </CardContent>
    </Card>
);

export default RecentActivity;