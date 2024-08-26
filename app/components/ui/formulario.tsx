import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import { Info, Trash2 } from "lucide-react";

type User = {
  id: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  email: string;
  cargo: string;
  fechaIngreso: string;
};

const ErrorMessage = ({ message }: { message: string }) => (
  <p className="flex items-center text-red-600 text-sm mt-1">
    <Info className="w-4 h-4 mr-1" />
    <span>{message}</span>
  </p>
);

export default function Formulario() {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [tempFormData, setTempFormData] = useState<User | null>(null);

  const DEFAULT_CARGO = "default";

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<User>({
    defaultValues: {
      cargo: DEFAULT_CARGO,
    },
  });

  const validateUniqueEmail = (value: string) => {
    return (
      !users.some((user) => user.email === value) ||
      "Este correo ya está registrado"
    );
  };

  const validateDateOfBirth = (value: string) => {
    const dateOfBirth = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    return age >= 18 || "Debes tener al menos 18 años";
  };

  const validateDateOfEntry = (value: string) => {
    const dateOfBirth = new Date(getValues("fechaNacimiento"));
    const dateOfEntry = new Date(value);

    const minDateOfEntry = new Date(dateOfBirth);
    minDateOfEntry.setFullYear(minDateOfEntry.getFullYear() + 18);
    if (dateOfEntry < minDateOfEntry) {
      return "La fecha de ingreso debe ser al menos 18 años después de la fecha de nacimiento";
    }

    return true;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const onSubmit = (data: User) => {
    setTempFormData({ ...data, id: Date.now().toString() });
    setShowModal(true);
  };

  const confirmSubmit = () => {
    if (tempFormData) {
      setUsers([...users, tempFormData]);
      setShowModal(false);
      reset({
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        email: "",
        cargo: DEFAULT_CARGO,
        fechaIngreso: "",
      });
    }
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Card className="w-full max-w-2xl mx-auto mb-8 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardTitle className="text-2xl text-center font-bold">
            Formulario de Registro de Usuario
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                {...register("nombre", { required: "Este campo es requerido" })}
                className="mt-1"
              />
              {errors.nombre && (
                <ErrorMessage message={errors.nombre.message ?? ""} />
              )}
            </div>

            <div>
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                id="apellido"
                {...register("apellido", {
                  required: "Este campo es requerido",
                })}
                className="mt-1"
              />
              {errors.apellido && (
                <ErrorMessage message={errors.apellido.message ?? ""} />
              )}
            </div>

            <div>
              <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
              <Input
                id="fechaNacimiento"
                type="date"
                {...register("fechaNacimiento", {
                  required: "Este campo es requerido",
                  validate: validateDateOfBirth,
                })}
                className="mt-1"
              />
              {errors.fechaNacimiento && (
                <ErrorMessage message={errors.fechaNacimiento.message ?? ""} />
              )}
            </div>

            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Este campo es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Dirección de email inválida",
                  },
                  validate: validateUniqueEmail,
                })}
                className="mt-1"
              />
              {errors.email && (
                <ErrorMessage message={errors.email.message ?? ""} />
              )}
            </div>

            <div>
              <Label htmlFor="cargo">Cargo</Label>
              <Controller
                name="cargo"
                control={control}
                rules={{
                  required: "Este campo es requerido",
                  validate: (value) =>
                    value !== DEFAULT_CARGO || "Debes seleccionar un cargo válido",
                }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    autoComplete="off"
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecciona un cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={DEFAULT_CARGO} disabled>
                        Selecciona un cargo
                      </SelectItem>
                      <SelectItem value="desarrollador">
                        Desarrollador
                      </SelectItem>
                      <SelectItem value="disenador">Diseñador</SelectItem>
                      <SelectItem value="gerente">Gerente</SelectItem>
                      <SelectItem value="analista">Analista</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.cargo && (
                <ErrorMessage message={errors.cargo.message ?? ""} />
              )}
            </div>

            <div>
              <Label htmlFor="fechaIngreso">Fecha de Ingreso</Label>
              <Input
                id="fechaIngreso"
                type="date"
                {...register("fechaIngreso", {
                  required: "Este campo es requerido",
                  validate: validateDateOfEntry,
                })}
                className="mt-1"
              />
              {errors.fechaIngreso && (
                <ErrorMessage message={errors.fechaIngreso.message ?? ""} />
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              Agregar
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">
              Confirmar datos
            </DialogTitle>
          </DialogHeader>
          <div>
            {tempFormData && (
              <div className="space-y-2">
                <p>
                  <strong>Nombre:</strong> {tempFormData.nombre}{" "}
                  {tempFormData.apellido}
                </p>
                <p>
                  <strong>Fecha de Nacimiento:</strong>{" "}
                  {formatDate(tempFormData.fechaNacimiento)}
                </p>
                <p>
                  <strong>Correo electrónico:</strong> {tempFormData.email}
                </p>
                <p>
                  <strong>Cargo:</strong> {tempFormData.cargo}
                </p>
                <p>
                  <strong>Fecha de Ingreso:</strong>{" "}
                  {formatDate(tempFormData.fechaIngreso)}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button
              onClick={confirmSubmit}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {users.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Lista de Usuarios
          </h2>
          <div className="grid grid-cols-1 rounded-md sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {users.map((user) => (
              <Card
                key={user.id}
                className="shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="flex flex-col items-center justify-center space-y-2 py-4 rounded-t-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg
                      className="absolute w-12 h-12 text-gray-800 -left-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <CardTitle className="text-lg text-center font-semibold">
                    {user.nombre} {user.apellido}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-1 list-disc list-inside">
                    <li className="text-sm text-gray-600">
                      <strong>Email:</strong> {user.email}
                    </li>
                    <li className="text-sm text-gray-600">
                      <strong>Cargo:</strong> {user.cargo}
                    </li>
                    <li className="text-sm text-gray-600">
                      <strong>Ingreso:</strong> {formatDate(user.fechaIngreso)}
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteUser(user.id)}
                    className="flex items-center space-x-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Eliminar</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
