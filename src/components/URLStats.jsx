import { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import axios from 'axios';

const URLStats = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/stats').then(res => setUrls(res.data)).catch(console.error);
  }, []);

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Long URL</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Expires</TableCell>
            <TableCell>Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((u, i) => (
            <TableRow key={i}>
              <TableCell><a href={u.short_url} target="_blank">{u.short_url}</a></TableCell>
              <TableCell>{u.original_url}</TableCell>
              <TableCell>{u.created_at}</TableCell>
              <TableCell>{u.expires_at}</TableCell>
              <TableCell>{u.clicks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default URLStats;
