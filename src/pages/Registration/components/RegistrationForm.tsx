import { useState } from "react";
import {
  Collapse,
  Button,
  Card,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  MenuItem,
  CardContent,
} from "@mui/material";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { type IRegister } from "../interfaces/IRegister";
import { useSnackbar } from "../../../context/SnackbarContext";
import FormWrapper from "../../../shared/ui/form/FormWrapper";
import KeyIcon from "@mui/icons-material/Key";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PersonIcon from "@mui/icons-material/Person";
import useRegistration from "../../../shared/api/auth/useRegistration";
import BadgeIcon from "@mui/icons-material/Badge";

interface RegistrationFormProps {
  successRegistration?: () => void;
}

function RegistrationForm({ successRegistration }: RegistrationFormProps) {
  const { showSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutateAsync: register, isPending } = useRegistration();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegister & { confirmPassword: string }>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
      role: "employee",
    },
    mode: "onSubmit",
  });

  const password = watch("password");

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    try {
      await register({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: data.password,
        role: data.role,
      });
      successRegistration?.();
    } catch (error) {
      showSnackbar("Errore di registrazione", "error");
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
        overflowY: "auto",
      }}
    >
      <CardContent>
        <FormWrapper handleSubmit={handleSubmit(onSubmit)}>
          <Stack sx={{ width: 300, gap: 1 }}>
            <Typography variant="h2" textAlign={"center"} sx={{ mb: 2 }}>
              Registrati
            </Typography>
            {/* First Name */}
            <Controller
              control={control}
              name="firstName"
              rules={{ required: "Il nome è richiesto" }}
              render={({ field }) => (
                <>
                  <TextField
                    {...field}
                    variant="outlined"
                    placeholder="Nome"
                    error={!!errors.firstName}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  <Collapse
                    in={!!errors.firstName}
                    timeout={300}
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="caption" color="error">
                      {errors.firstName?.message}
                    </Typography>
                  </Collapse>
                </>
              )}
            />

            {/* Last Name */}
            <Controller
              control={control}
              name="lastName"
              rules={{ required: "Il cognome è richiesto" }}
              render={({ field }) => (
                <>
                  <TextField
                    {...field}
                    variant="outlined"
                    placeholder="Cognome"
                    error={!!errors.lastName}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  <Collapse in={!!errors.lastName} timeout={300} sx={{ mb: 1 }}>
                    <Typography variant="caption" color="error">
                      {errors.lastName?.message}
                    </Typography>
                  </Collapse>
                </>
              )}
            />

            {/* Email/Username */}
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
                    placeholder="Email"
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
                  <Collapse in={!!errors.username} timeout={300} sx={{ mb: 1 }}>
                    <Typography variant="caption" color="error">
                      {errors.username?.message}
                    </Typography>
                  </Collapse>
                </>
              )}
            />

            {/* Role Select */}
            <Controller
              control={control}
              name="role"
              rules={{ required: "Seleziona un ruolo" }}
              render={({ field }) => (
                <>
                  <TextField
                    {...field}
                    select
                    variant="outlined"
                    label="Tipo di account"
                    error={!!errors.role}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <BadgeIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  >
                    <MenuItem value="employee">Dipendente</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                  </TextField>
                  <Collapse in={!!errors.role} timeout={300} sx={{ mb: 1 }}>
                    <Typography variant="caption" color="error">
                      {errors.role?.message}
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
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
                  message:
                    "Minimo 8 caratteri, 1 maiuscola, 1 minuscola, 1 numero e 1 carattere speciale",
                },
              }}
              render={({ field }) => (
                <>
                  <TextField
                    {...field}
                    variant="outlined"
                    placeholder="Password"
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
                  <Collapse in={!!errors.password} timeout={300} sx={{ mb: 1 }}>
                    <Typography variant="caption" color="error">
                      {errors.password?.message}
                    </Typography>
                  </Collapse>
                </>
              )}
            />

            {/* Confirm Password */}
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: "Conferma la tua password",
                validate: (value) =>
                  value === password || "Le password non coincidono",
              }}
              render={({ field }) => (
                <>
                  <TextField
                    {...field}
                    variant="outlined"
                    placeholder="Conferma Password"
                    type={showPassword ? "text" : "password"}
                    error={!!errors.confirmPassword}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <KeyIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  <Collapse
                    in={!!errors.confirmPassword}
                    timeout={300}
                    sx={{ mb: 2 }}
                  >
                    <Typography variant="caption" color="error">
                      {errors.confirmPassword?.message}
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
                "Registrati"
              )}
            </Button>
          </Stack>
        </FormWrapper>
      </CardContent>
    </Card>
  );
}

export default RegistrationForm;
