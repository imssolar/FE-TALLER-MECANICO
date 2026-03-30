import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, type UseFormReturn } from "react-hook-form";
import { ordenTrabajoProgService } from "@/services/orden-trabajo-prog.service";
import { terminalService } from "@/services/terminal.service";
import { busService } from "@/services/bus.service";
import { empleadoService } from "@/services/empleado.service";
import type {
  OrdenTrabajoProg,
  CreateOrdenTrabajoProgDto,
  UpdateOrdenTrabajoProgDto,
} from "@/types/orden-trabajo-prog";
import type { Terminal } from "@/types/terminal";
import type { Bus } from "@/types/bus";
import type { Empleado } from "@/types/empleado";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/get-error-message";

export interface OrdenTrabajoProgFormValues {
  idTerminal: number | undefined;
  nroOtManager: number | undefined;
  idBus: number | undefined;
  km: number | undefined;
  ppu: string;
  idConductor: number | undefined;
  fechaHoraIngreso: string;
  fechaHoraSalida: string;
  trabajoARealizar: string;
  idJefeTurnoPatio: number | undefined;
  horaJefeTurnoPatio: string;
  idJefeTurnoMant: number | undefined;
  horaJefeTurnoMant: string;
  idSupervCalidad: number | undefined;
  horaSupervCalidad: string;
  obsControlCalidad: string;
  repAutoriza: string;
  repRetira: string;
  repBodega: string;
  item: string;
  formato: string;
}

const defaultValues: OrdenTrabajoProgFormValues = {
  idTerminal: undefined,
  nroOtManager: undefined,
  idBus: undefined,
  km: undefined,
  ppu: "",
  idConductor: undefined,
  fechaHoraIngreso: "",
  fechaHoraSalida: "",
  trabajoARealizar: "",
  idJefeTurnoPatio: undefined,
  horaJefeTurnoPatio: "",
  idJefeTurnoMant: undefined,
  horaJefeTurnoMant: "",
  idSupervCalidad: undefined,
  horaSupervCalidad: "",
  obsControlCalidad: "",
  repAutoriza: "",
  repRetira: "",
  repBodega: "",
  item: "",
  formato: "",
};

interface UseOrdenesTrabajoProgReturn {
  filteredOrdenes: OrdenTrabajoProg[];
  isLoading: boolean;
  search: string;
  setSearch: (value: string) => void;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  editingOt: OrdenTrabajoProg | null;
  deleteId: number | null;
  setDeleteId: (id: number | null) => void;
  isSaving: boolean;
  form: UseFormReturn<OrdenTrabajoProgFormValues>;
  openCreate: () => void;
  openEdit: (ot: OrdenTrabajoProg) => void;
  closeDialog: () => void;
  onSubmit: (data: OrdenTrabajoProgFormValues) => void;
  confirmDelete: () => void;
  terminales: Terminal[];
  buses: Bus[];
  conductores: Empleado[];
  jefesTurnoPatio: Empleado[];
  jefesTurnoMant: Empleado[];
  supervisoresCalidad: Empleado[];
}

export function useOrdenesTrabajoProg(): UseOrdenesTrabajoProgReturn {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingOt, setEditingOt] = useState<OrdenTrabajoProg | null>(null);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["ordenes-trabajo-prog"],
    queryFn: ordenTrabajoProgService.findAll,
  });
  const ordenes = Array.isArray(data) ? data : [];

  const { data: terminalesData } = useQuery({
    queryKey: ["terminales"],
    queryFn: terminalService.getAll,
  });
  const terminales = Array.isArray(terminalesData) ? terminalesData : [];

  const { data: busesData } = useQuery({
    queryKey: ["buses"],
    queryFn: busService.getAll,
  });
  const buses = Array.isArray(busesData) ? busesData : [];

  const { data: conductoresData } = useQuery({
    queryKey: ["empleados", "CONDUCTOR"],
    queryFn: () => empleadoService.getByCargo("CONDUCTOR"),
  });
  const conductores = Array.isArray(conductoresData) ? conductoresData : [];

  const { data: jefesTurnoPatioData } = useQuery({
    queryKey: ["empleados", "JEFE_TURNO_PATIO"],
    queryFn: () => empleadoService.getByCargo("JEFE_TURNO_PATIO"),
  });
  const jefesTurnoPatio = Array.isArray(jefesTurnoPatioData) ? jefesTurnoPatioData : [];

  const { data: jefesTurnoMantData } = useQuery({
    queryKey: ["empleados", "JEFE_TURNO_MANT"],
    queryFn: () => empleadoService.getByCargo("JEFE_TURNO_MANT"),
  });
  const jefesTurnoMant = Array.isArray(jefesTurnoMantData) ? jefesTurnoMantData : [];

  const { data: supervisoresCalidadData } = useQuery({
    queryKey: ["empleados", "SUPERVISOR_CALIDAD"],
    queryFn: () => empleadoService.getByCargo("SUPERVISOR_CALIDAD"),
  });
  const supervisoresCalidad = Array.isArray(supervisoresCalidadData) ? supervisoresCalidadData : [];

  const form = useForm<OrdenTrabajoProgFormValues>({ defaultValues });

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingOt(null);
    form.reset(defaultValues);
  };

  const createMutation = useMutation({
    mutationFn: ordenTrabajoProgService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ordenes-trabajo-prog"] });
      toast.success("Orden de trabajo programada creada correctamente");
      closeDialog();
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Error al crear la orden de trabajo programada")),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateOrdenTrabajoProgDto }) =>
      ordenTrabajoProgService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ordenes-trabajo-prog"] });
      toast.success("Orden de trabajo programada actualizada correctamente");
      closeDialog();
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Error al actualizar la orden de trabajo programada")),
  });

  const deleteMutation = useMutation({
    mutationFn: ordenTrabajoProgService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ordenes-trabajo-prog"] });
      toast.success("Orden de trabajo programada eliminada correctamente");
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Error al eliminar la orden de trabajo programada")),
  });

  const openCreate = () => {
    setEditingOt(null);
    form.reset(defaultValues);
    setDialogOpen(true);
  };

  const openEdit = (ot: OrdenTrabajoProg) => {
    setEditingOt(ot);
    form.reset({
      idTerminal: ot.idTerminal ?? undefined,
      nroOtManager: ot.nroOtManager ?? undefined,
      idBus: ot.idBus ?? undefined,
      km: ot.km ?? undefined,
      ppu: ot.ppu ?? "",
      idConductor: ot.idConductor ?? undefined,
      fechaHoraIngreso: ot.fechaHoraIngreso ?? "",
      fechaHoraSalida: ot.fechaHoraSalida ?? "",
      trabajoARealizar: ot.trabajoARealizar ?? "",
      idJefeTurnoPatio: ot.idJefeTurnoPatio ?? undefined,
      horaJefeTurnoPatio: ot.horaJefeTurnoPatio ?? "",
      idJefeTurnoMant: ot.idJefeTurnoMant ?? undefined,
      horaJefeTurnoMant: ot.horaJefeTurnoMant ?? "",
      idSupervCalidad: ot.idSupervCalidad ?? undefined,
      horaSupervCalidad: ot.horaSupervCalidad ?? "",
      obsControlCalidad: ot.obsControlCalidad ?? "",
      repAutoriza: ot.repAutoriza ?? "",
      repRetira: ot.repRetira ?? "",
      repBodega: ot.repBodega ?? "",
      item: ot.item ?? "",
      formato: ot.formato ?? "",
    });
    setDialogOpen(true);
  };

  const onSubmit = (data: OrdenTrabajoProgFormValues) => {
    if (editingOt) {
      updateMutation.mutate({ id: editingOt.id, data: toDto(data) });
    } else {
      createMutation.mutate(toDto(data));
    }
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      deleteMutation.mutate(deleteId);
      setDeleteId(null);
    }
  };

  const filteredOrdenes = ordenes.filter(
    (ot) =>
      String(ot.id).includes(search) ||
      ot.patenteB?.toLowerCase().includes(search.toLowerCase()) ||
      ot.ppu?.toLowerCase().includes(search.toLowerCase()) ||
      ot.nombreCompletoConductor?.toLowerCase().includes(search.toLowerCase())
  );

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return {
    filteredOrdenes,
    isLoading,
    search,
    setSearch,
    dialogOpen,
    setDialogOpen,
    editingOt,
    deleteId,
    setDeleteId,
    isSaving,
    form,
    openCreate,
    openEdit,
    closeDialog,
    onSubmit,
    confirmDelete,
    terminales,
    buses,
    conductores,
    jefesTurnoPatio,
    jefesTurnoMant,
    supervisoresCalidad,
  };
}

function toDto(data: OrdenTrabajoProgFormValues): CreateOrdenTrabajoProgDto {
  return {
    idTerminal: data.idTerminal,
    nroOtManager: data.nroOtManager,
    idBus: data.idBus,
    km: data.km,
    ppu: data.ppu || undefined,
    idConductor: data.idConductor,
    fechaHoraIngreso: data.fechaHoraIngreso || undefined,
    fechaHoraSalida: data.fechaHoraSalida || undefined,
    trabajoARealizar: data.trabajoARealizar || undefined,
    idJefeTurnoPatio: data.idJefeTurnoPatio,
    horaJefeTurnoPatio: data.horaJefeTurnoPatio || undefined,
    idJefeTurnoMant: data.idJefeTurnoMant,
    horaJefeTurnoMant: data.horaJefeTurnoMant || undefined,
    idSupervCalidad: data.idSupervCalidad,
    horaSupervCalidad: data.horaSupervCalidad || undefined,
    obsControlCalidad: data.obsControlCalidad || undefined,
    repAutoriza: data.repAutoriza || undefined,
    repRetira: data.repRetira || undefined,
    repBodega: data.repBodega || undefined,
    item: data.item || undefined,
    formato: data.formato || undefined,
  };
}
