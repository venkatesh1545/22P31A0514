import { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import logger from '../middleware/logger';
import { shortenURL } from '../utils/api';
import URLTable from './URLTable';

const URLForm = () => {
  const [urls, setUrls] = useState([{ url: '', validity: '', shortcode: '' }]);
  const [shortened, setShortened] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const handleDelete = (index) => {
    const newUrls = [...urls];
    newUrls.splice(index, 1);
    setUrls(newUrls);
  };

  const handleSubmit = async () => {
    const results = [];
    for (const entry of urls) {
      const { url, validity, shortcode } = entry;
      if (!url.startsWith('http')) {
        alert("Invalid URL: Must start with http or https");
        return;
      }

      const data = {
        url,
        validity: parseInt(validity) || 30,
        shortcode: shortcode.trim() || undefined,
      };

      logger('Shorten request', data);

      try {
        const res = await shortenURL(data);
        results.push(res.data);
      } catch (err) {
        console.error("API Error:", err);
        alert(err?.response?.data?.message || err?.message || "Unknown API Error");
      }
    }
    setShortened(results);
  };

  return (
    <Box
      maxWidth="800px"
      mx="auto"
      mt={5}
      p={4}
      className="card-box"
      component={Paper}
      elevation={4}
      sx={{ borderRadius: 3 }}
    >
      <Typography
        variant="h5"
        gutterBottom
        textAlign="center"
        fontWeight="bold"
        mb={3}
      >
        🔗 URL Shortener
      </Typography>

      {urls.map((entry, i) => (
        <Grid
          container
          spacing={2}
          key={i}
          sx={{ mb: 2 }}
          alignItems="center"
          className="fade-in"
        >
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              label="Original URL"
              variant="filled"
              value={entry.url}
              onChange={(e) => handleChange(i, 'url', e.target.value)}
            />
          </Grid>
          <Grid item xs={6} md={2.5}>
            <TextField
              fullWidth
              label="Validity (mins)"
              variant="filled"
              value={entry.validity}
              onChange={(e) => handleChange(i, 'validity', e.target.value)}
            />
          </Grid>
          <Grid item xs={6} md={2.5}>
            <TextField
              fullWidth
              label="Shortcode"
              variant="filled"
              value={entry.shortcode}
              onChange={(e) => handleChange(i, 'shortcode', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
            {urls.length > 1 && (
              <IconButton
                color="error"
                onClick={() => handleDelete(i)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      ))}

      {urls.length < 5 && (
        <Box mb={3}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() =>
              setUrls([...urls, { url: '', validity: '', shortcode: '' }])
            }
          >
            Add Another
          </Button>
        </Box>
      )}

      <Button
        variant="contained"
        startIcon={<RocketLaunchIcon />}
        onClick={handleSubmit}
        fullWidth
        sx={{ py: 1.4 }}
      >
        Shorten URLs
      </Button>

      {shortened.length > 0 && (
        <Box mt={4}>
          <URLTable urls={shortened} />
        </Box>
      )}
    </Box>
  );
};

export default URLForm;
