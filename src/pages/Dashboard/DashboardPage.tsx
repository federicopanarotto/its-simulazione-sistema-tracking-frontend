import { Typography, useTheme } from "@mui/material";
import BasePageWrapper from "../../shared/ui/page/BasePageWrapper";
import { useMe } from "../../shared/api/user/useMe";

function DashboardPage() {
  const theme = useTheme();

  const { data: me, isLoading, isFetching } = useMe();
  const loading = isLoading || isFetching;

  return (
    <BasePageWrapper isLoading={loading}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Benvenuto{" "}
        <span style={{ color: theme.palette.primary.main }}>
          {me?.fullName}
        </span>
      </Typography>
    </BasePageWrapper>
  );
}

export default DashboardPage;
