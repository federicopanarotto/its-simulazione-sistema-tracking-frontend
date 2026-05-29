import { useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Box,
  CircularProgress,
  Chip,
  Typography,
  IconButton,
  Tooltip,
  Stack,
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { openDialog } from "../../../shared/ui/dialog/dialogHelper";
import type { DialogActionsType } from "../../../shared/interfaces/dialog/DialogActionsType";
import { deliveryApi } from "../api/deliveryApi";
import type { IDelivery, DeliveryStatus } from "../api/IDelivery";
import DeliveryDetailDialog from "./DeliveryDetailDialog";
import EditDeliveryDialog from "./EditDeliveryDialog";
import DeleteDeliveryDialog from "./DeleteDeliveryDialog";
import UpdateDeliveryStatusDialog from "./UpdateDeliveryStatusDialog";

const statusConfig: Record<DeliveryStatus, { label: string; color: "default" | "success" | "warning" | "error" }> = {
  in_deposito: { label: "In deposito", color: "warning" },
  da_ritirare: { label: "Da ritirare", color: "default" },
  in_consegna: { label: "In consegna", color: "default" },
  consegnata: { label: "Consegnata", color: "success" },
  in_giacenza: { label: "In giacenza", color: "error" },
};

interface DeliveryTableProps {
  customerId?: string | null;
  status?: DeliveryStatus | "";
}

export default function DeliveryTable({ customerId = null, status = "" }: DeliveryTableProps) {
  const queryParams: Record<string, string> = {};
  if (customerId) queryParams.customer = customerId;
  if (status) queryParams.status = status;

  const { data: deliveries, isLoading } = deliveryApi.useGetList(
    Object.keys(queryParams).length > 0 ? { queryParams } : undefined
  );

  const [selectedDelivery, setSelectedDelivery] = useState<IDelivery | null>(null);

  const detailDialogRef = useRef<DialogActionsType | null>(null);
  const editDialogRef = useRef<DialogActionsType | null>(null);
  const deleteDialogRef = useRef<DialogActionsType | null>(null);
  const statusDialogRef = useRef<DialogActionsType | null>(null);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={5}>
        <CircularProgress />
      </Box>
    );
  }

  const filteredDeliveries = deliveries ?? [];

  const openDetail = (delivery: IDelivery) => {
    setSelectedDelivery(delivery);
    openDialog(detailDialogRef);
  };

  const openEdit = (delivery: IDelivery) => {
    setSelectedDelivery(delivery);
    openDialog(editDialogRef);
  };

  const openDelete = (delivery: IDelivery) => {
    setSelectedDelivery(delivery);
    openDialog(deleteDialogRef);
  };

  const openStatus = (delivery: IDelivery) => {
    setSelectedDelivery(delivery);
    openDialog(statusDialogRef);
  };

  return (
    <>
      <DeliveryDetailDialog ref={detailDialogRef} delivery={selectedDelivery ?? undefined} />
      <EditDeliveryDialog ref={editDialogRef} delivery={selectedDelivery ?? undefined} />
      <DeleteDeliveryDialog ref={deleteDialogRef} delivery={selectedDelivery ?? undefined} />
      <UpdateDeliveryStatusDialog ref={statusDialogRef} delivery={selectedDelivery ?? undefined} />

      <Card sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "background.default" }}>
                {["Cliente", "Indirizzo", "Tracking", "Ritiro", "Consegna", "Stato", "Azioni"].map((header) => (
                  <TableCell key={header} sx={{ fontWeight: 700, color: "text.primary" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDeliveries.map((delivery) => {
                const customerName = typeof delivery.customer === "string" ? delivery.customer : delivery.customer?.name;
                const statusData = statusConfig[delivery.status];
                const isDelivered = delivery.status === "consegnata";

                return (
                  <TableRow key={delivery.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell sx={{ maxWidth: 220 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                        {customerName || "-"}
                      </Typography>
                    </TableCell>
                     <TableCell>
                    <Typography variant="body2">{`${delivery.customer?.address}, ${delivery.customer?.city} (${delivery.customer?.province})`}</Typography>
                  </TableCell>
                    <TableCell>{delivery.deliveryKey}</TableCell>
                    <TableCell>{delivery.pickupDate ? new Date(delivery.pickupDate).toLocaleDateString("it-IT") : "-"}</TableCell>
                    <TableCell>{delivery.deliveryDate ? new Date(delivery.deliveryDate).toLocaleDateString("it-IT") : "-"}</TableCell>
                    <TableCell>
                      <Chip label={statusData.label} color={statusData.color} size="small" sx={{ borderRadius: 2 }} />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Tooltip title="Dettaglio">
                          <IconButton color="primary" onClick={() => openDetail(delivery)}>
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Modifica">
                          <span>
                            <IconButton
                              color="primary"
                              disabled={isDelivered}
                              onClick={() => openEdit(delivery)}
                            >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          </span>
                        </Tooltip>
                        <Tooltip title="Aggiorna stato">
                          <IconButton color="info" onClick={() => openStatus(delivery)}>
                            <AutorenewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={isDelivered ? "Impossibile eliminare" : "Elimina"}>
                          <span>
                            <IconButton color="error" disabled={isDelivered} onClick={() => openDelete(delivery)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredDeliveries.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Nessuna consegna
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}
