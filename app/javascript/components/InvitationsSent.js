import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { format, parseISO } from "date-fns";

const InvitationsSent = ({ invitations }) => {
  return (
    <Grid item xs={12} sm={8} md={8}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell align="right">Invited Email</TableCell>
              <TableCell align="right">Invited At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invitations.map((row, index) => {
              const datetime = parseISO(row.created_at);
              return (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">
                    {format(datetime, "cccc, MMM d, yyyy - h:mm aaa")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default InvitationsSent;
