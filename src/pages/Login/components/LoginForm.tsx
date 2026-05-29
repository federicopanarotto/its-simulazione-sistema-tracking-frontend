import {
  Collapse,
  Button,
  Card,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import type { ILogin } from "../interfaces/ILogin";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import FormWrapper from "../../../shared/ui/form/FormWrapper";
import KeyIcon from "@mui/icons-material/Key";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import useLogin from "../../../shared/api/auth/useLogin";
import { useSnackbar } from "../../../context/SnackbarContext";

interface LoginFormProps {
  successLogin?: () => void;
}

function LoginForm({ successLogin }: LoginFormProps) {
  const auth = useAuth();
  const { showSnackbar } = useSnackbar();
  const { mutateAsync: login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    values: { username: "", password: "" },
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      const user = await login(data);
      auth?.login(user);
      successLogin?.();
    } catch (error) {
      showSnackbar("Credenziali non valide", "error");
    }
  };

  return (
    <Card
      sx={{
        p: 2,
        py: 4,
        minWidth: 300,
        maxWidth: 800,
        width: "50%",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        background: (theme) => theme.palette.background.default,
      }}
    >
      <FormWrapper handleSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{ width: 300 }}>
          <Typography variant="h2" textAlign={"center"} sx={{ mb: 2 }}>
            Accedi
          </Typography>
          {/* Email */}
          <Controller
            control={control}
            name="username"
            rules={{
              required: "L'email è richiesta",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Inserisci un'email valida",
              },
            }}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  variant="outlined"
                  placeholder="email"
                  type="text"
                  error={!!errors.username}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <AlternateEmailIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <Collapse
                  in={!!errors.username}
                  timeout={300}
                  sx={{ m: 0, mb: 2 }}
                >
                  <Typography variant="caption" color="error" sx={{ mt: 0 }}>
                    {errors.username?.message}
                  </Typography>
                </Collapse>
              </>
            )}
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            rules={{
              required: "La password è richiesta",
            }}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  variant="outlined"
                  placeholder="password"
                  type={showPassword ? "text" : "password"}
                  error={!!errors.password}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          onClick={() => setShowPassword(!showPassword)}
                          sx={{ cursor: "pointer" }}
                        >
                          {showPassword ? <KeyOffIcon /> : <KeyIcon />}
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <Collapse
                  in={!!errors.password}
                  timeout={300}
                  sx={{
                    m: 0,
                    mb: 2,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="caption" color="error" sx={{ mt: 0 }}>
                    {errors.password?.message}
                  </Typography>
                </Collapse>
              </>
            )}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ minHeight: 55, maxHeight: 55 }}
          >
            {isPending ? (
              <CircularProgress color="inherit" size={24} />
            ) : (
              <>Login</>
            )}
          </Button>
        </Stack>
      </FormWrapper>
    </Card>
  );
}

export default LoginForm;
