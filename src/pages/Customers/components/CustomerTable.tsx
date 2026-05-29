import { useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  CircularProgress,
  Typography,
  Box,
  Card,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { customerApi } from "../api/customerApi";
import type { ICustomer } from "../api/ICustomer";
import { openDialog } from "../../../shared/ui/dialog/dialogHelper";
import type { DialogActionsType } from "../../../shared/interfaces/dialog/DialogActionsType";
import EditCustomerDialog from "./EditCustomerDialog";
import DeleteCustomerDialog from "./DeleteCustomerDialog";

interface CustomerTableProps {}

export default function CustomerTable(_: CustomerTableProps) {
  const { data: customers, isLoading } = customerApi.useGetList();

  const editDialogRef = useRef<DialogActionsType | null>(null);
  const deleteDialogRef = useRef<DialogActionsType | null>(null);

  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(null);

  const handleEdit = (c: ICustomer) => {
    setSelectedCustomer(c);
    openDialog(editDialogRef);
  };

  const handleDelete = (c: ICustomer) => {
    setSelectedCustomer(c);
    openDialog(deleteDialogRef);
  };

  if (isLoading) return (
    <Box display="flex" justifyContent="center" p={5}><CircularProgress /></Box>
  );

  return (
    <>
      <EditCustomerDialog ref={editDialogRef} customer={selectedCustomer!} />
      <DeleteCustomerDialog ref={deleteDialogRef} customer={selectedCustomer!} />

      <Card sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "background.default" }}>
                {["Nome", "Indirizzo", "Località", "Telefono", "Email", "Note", "Azioni"].map((header) => (
                  <TableCell key={header} sx={{ fontWeight: 700, color: "text.primary" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {customers?.map((row) => (
                <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{row.address}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{`${row.city} (${row.province})`}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{row.phone}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{row.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>{row.notes}</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="Modifica">
                        <IconButton color="primary" onClick={() => handleEdit(row)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Elimina">
                        <IconButton color="error" onClick={() => handleDelete(row)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}

              {customers?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">Nessun cliente</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}
