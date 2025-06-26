// src/components/URLTable.jsx
import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from '@mui/material';

const URLTable = ({ urls }) => {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Typography variant="h6" sx={{ p: 2, pb: 0 }}>
        📋 Shortened URLs
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="shortened url table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Short URL</strong></TableCell>
            <TableCell><strong>Original URL</strong></TableCell>
            <TableCell><strong>Expires At</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((item, i) => (
            <TableRow key={i} hover>
              <TableCell>
                <a href={item.short_url} target="_blank" rel="noopener noreferrer">
                  {item.short_url}
                </a>
              </TableCell>
              <TableCell>{item.original_url}</TableCell>
              <TableCell>{new Date(item.expires_at).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default URLTable;
