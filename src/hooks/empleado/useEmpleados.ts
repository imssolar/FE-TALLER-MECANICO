import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { empleadoService } from "@/services/empleado.service";
import type { Empleado, CargoEmpleado, LicenciaConducir, Talla, EstadoCivil, Escolaridad, Parentesco } from "@/types/empleado";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/get-error-message";

export interface EmpleadoFormValues {
  rut: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  cargo: CargoEmpleado;
  telefono: string;
  fechaIngreso: string;
  activo: boolean;
  licenciaConducir: LicenciaConducir | "";
  fechaVencimientoLicencia: string;
  talla: Talla | "";
  calzado: number | undefined;
  fechaNacimiento: string;
  estadoCivil: EstadoCivil | "";
  hijos: number | undefined;
  direccion: string;
  telefono2: string;
  escolaridad: Escolaridad | "";
  contactoEmergencia: string;
  fonoContactoEmergencia: string;
  parentesco: Parentesco | "";
  exTrabajador: boolean;
  observaciones: string;
  costo: number | undefined;
}

const defaultValues: EmpleadoFormValues = {
  rut: "",
  nombres: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  cargo: "" as CargoEmpleado,
  telefono: "",
  fechaIngreso: "",
  activo: true,
  licenciaConducir: "",
  fechaVencimientoLicencia: "",
  talla: "",
  calzado: undefined,
  fechaNacimiento: "",
  estadoCivil: "",
  hijos: undefined,
  direccion: "",
  telefono2: "",
  escolaridad: "",
  contactoEmergencia: "",
  fonoContactoEmergencia: "",
  parentesco: "",
  exTrabajador: false,
  observaciones: "",
  costo: undefined,
};

export function useEmpleados() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingEmpleado, setEditingEmpleado] = useState<Empleado | null>(null);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["empleados"],
    queryFn: empleadoService.getAll,
  });
  const empleados = Array.isArray(data) ? data : [];

  const form = useForm<EmpleadoFormValues>();

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingEmpleado(null);
    form.reset();
  };

  const createMutation = useMutation({
    mutationFn: empleadoService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empleados"] });
      toast.success("Empleado creado correctamente");
      closeDialog();
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al crear el empleado")),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: EmpleadoFormValues }) =>
      empleadoService.update(id, cleanFormData(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empleados"] });
      toast.success("Empleado actualizado correctamente");
      closeDialog();
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al actualizar el empleado")),
  });

  const deleteMutation = useMutation({
    mutationFn: empleadoService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empleados"] });
      toast.success("Empleado eliminado correctamente");
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al eliminar el empleado")),
  });

  const openCreate = () => {
    setEditingEmpleado(null);
    form.reset(defaultValues);
    setDialogOpen(true);
  };

  const openEdit = (empleado: Empleado) => {
    setEditingEmpleado(empleado);
    form.reset({
      rut: empleado.rut ?? "",
      nombres: empleado.nombres ?? "",
      apellidoPaterno: empleado.apellidoPaterno ?? "",
      apellidoMaterno: empleado.apellidoMaterno ?? "",
      cargo: empleado.cargo,
      telefono: empleado.telefono ?? "",
      fechaIngreso: empleado.fechaIngreso ?? "",
      activo: empleado.activo,
      licenciaConducir: empleado.licenciaConducir ?? "",
      fechaVencimientoLicencia: empleado.fechaVencimientoLicencia ?? "",
      talla: empleado.talla ?? "",
      calzado: empleado.calzado ?? undefined,
      fechaNacimiento: empleado.fechaNacimiento ?? "",
      estadoCivil: empleado.estadoCivil ?? "",
      hijos: empleado.hijos ?? undefined,
      direccion: empleado.direccion ?? "",
      telefono2: empleado.telefono2 ?? "",
      escolaridad: empleado.escolaridad ?? "",
      contactoEmergencia: empleado.contactoEmergencia ?? "",
      fonoContactoEmergencia: empleado.fonoContactoEmergencia ?? "",
      parentesco: empleado.parentesco ?? "",
      exTrabajador: empleado.exTrabajador,
      observaciones: empleado.observaciones ?? "",
      costo: empleado.costo ?? undefined,
    });
    setDialogOpen(true);
  };

  const onSubmit = (data: EmpleadoFormValues) => {
    if (editingEmpleado) {
      updateMutation.mutate({ id: editingEmpleado.id, data });
    } else {
      createMutation.mutate(cleanFormData(data));
    }
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      deleteMutation.mutate(deleteId);
      setDeleteId(null);
    }
  };

  const filteredEmpleados = empleados.filter(
    (emp) =>
      emp.nombreCompleto?.toLowerCase().includes(search.toLowerCase()) ||
      emp.rut?.toLowerCase().includes(search.toLowerCase()) ||
      emp.cargo?.toLowerCase().includes(search.toLowerCase())
  );

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return {
    filteredEmpleados,
    isLoading,
    search,
    setSearch,
    dialogOpen,
    setDialogOpen,
    editingEmpleado,
    deleteId,
    setDeleteId,
    isSaving,
    form,
    openCreate,
    openEdit,
    closeDialog,
    onSubmit,
    confirmDelete,
  };
}

function cleanFormData(data: EmpleadoFormValues) {
  return {
    ...data,
    talla: data.talla || undefined,
    estadoCivil: data.estadoCivil || undefined,
    escolaridad: data.escolaridad || undefined,
    parentesco: data.parentesco || undefined,
    telefono: data.telefono || undefined,
    telefono2: data.telefono2 || undefined,
    licenciaConducir: data.licenciaConducir || undefined,
    fechaVencimientoLicencia: data.fechaVencimientoLicencia || undefined,
    fechaNacimiento: data.fechaNacimiento || undefined,
    direccion: data.direccion || undefined,
    contactoEmergencia: data.contactoEmergencia || undefined,
    fonoContactoEmergencia: data.fonoContactoEmergencia || undefined,
    observaciones: data.observaciones || undefined,
    calzado: data.calzado ?? undefined,
    hijos: data.hijos ?? undefined,
    costo: data.costo ?? undefined,
  };
}
