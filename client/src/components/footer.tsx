import { Link, Typography, Box} from '@mui/material';

export default function Footer() {
    return (
      <Box>
          <Typography  component="footer" variant="body2" color="text.secondary" align="center" mt={5}>
            Copyright © '
            <Link color="inherit" href="/">
            Angelo
            </Link>{' '}
            {new Date().getFullYear()}.
          </Typography>
    </Box>
    );
  }
  