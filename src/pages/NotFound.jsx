import { Box, Typography, Button } from '@mui/material';
import { useNavigate, useRouteError } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

export default function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError(); // Pode capturar erros caso usado como errorElement
  const isErrorElement = !!error; // Para exibir log no console se foi um erro de loader

  if (isErrorElement) {
    console.error("Route Error:", error);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: '60vh',
        textAlign: 'center',
        animation: 'fadeIn 0.5s ease-in-out',
        '@keyframes float': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        '@keyframes fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '6rem', md: '10rem' },
          fontWeight: 900,
          background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2,
          animation: 'float 6s ease-in-out infinite',
        }}
      >
        404
      </Typography>
      <Typography
        variant="h4"
        color="text.primary"
        gutterBottom
        sx={{ fontWeight: 600, mb: 1 }}
      >
        {isErrorElement ? 'Ocorreu um Erro' : 'Página não encontrada'}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4, maxWidth: '500px' }}
      >
        {isErrorElement 
          ? 'Desculpe, ocorreu um erro inesperado ao carregar esta página.' 
          : 'Desculpe, a página que você está procurando não existe ou foi movida.'}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<HomeIcon />}
        onClick={() => navigate('/')}
        sx={{
          borderRadius: '28px',
          padding: '10px 30px',
          textTransform: 'none',
          fontSize: '1.1rem',
          boxShadow: '0 8px 16px rgba(25, 118, 210, 0.24)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 20px rgba(25, 118, 210, 0.32)',
          }
        }}
      >
        Voltar para o Início
      </Button>
    </Box>
  );
}