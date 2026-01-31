import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';

const columns = [
  { id: 'ticketId', label: 'Id', minWidth: 40 },
  { id: 'title', label: 'Title', minWidth: 70 },
  { id: 'description', label: 'Description', minWidth: 140 },
  { id: 'category', label: 'Category', minWidth: 40 },
  { id: 'priority', label: 'Priority', minWidth: 40 },
  { id: 'time', label: 'Time', minWidth: 40 },
  { id: 'status', label: 'Status', minWidth: 40 }
];

export default function Tickets({ tickets }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([{ ticketId: "256", title: 'hello', description: 'hello ', category: 'wow', priority: 'highe', time: '466', status: 'opne' }]);
  

  

  //React.useEffect(()=>setRows(tickets),[tickets]);
  React.useEffect(() => {
    //console.log(tickets);
    if (tickets) {
      const mapped = tickets.map(t => ({
        ticketId: t.ticketId,
        title: t.title,
        description: t.description,
        category: t.category,
        priority: t.priority,
        time: t.time,
        status: t.status
      }));
      if(mapped.length>0){
            setRows(mapped);
      }
    }
  }, [tickets]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{backgroundColor:'balck', color:'white'}}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.ticketId}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 75, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
