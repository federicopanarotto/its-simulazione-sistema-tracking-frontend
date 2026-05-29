import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BasePageWrapper from "../../shared/ui/page/BasePageWrapper";
import { useMe } from "../../shared/api/user/useMe";

function ProfilePage() {
  const { data: me, isLoading, isFetching } = useMe();
  const loading = isLoading || isFetching;

  return (
    <BasePageWrapper isLoading={loading}>
      <Card elevation={3}>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            mb={3}
          >
            <Avatar sx={{ width: 80, height: 80, background: (theme) => theme.palette.primary.main }}>
              <PersonIcon fontSize="large" />
            </Avatar>

            <Box sx={{display: 'flex', flexDirection: "column", alignItems: 'center'}}>
              <Typography fontSize={13}>{me?.id}</Typography>
              <Typography variant="h5" fontWeight={600}>
                {me?.fullName}
              </Typography>
            </Box>

            <Chip
              label={me?.role?.toUpperCase()}
              color={me?.role === "admin" ? "error" : "primary"}
              variant="outlined"
            />
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="subtitle2" color="text.secondary">
                First Name
              </Typography>
              <Typography variant="body1">{me?.firstName}</Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Last Name
              </Typography>
              <Typography variant="body1">{me?.lastName}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </BasePageWrapper>
  );
}

export default ProfilePage;
