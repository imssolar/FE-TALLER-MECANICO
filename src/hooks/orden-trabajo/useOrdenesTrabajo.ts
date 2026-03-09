import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, type UseFormReturn } from "react-hook-form";
import { ordenTrabajoService } from "@/services/orden-trabajo.service";
import { terminalService } from "@/services/terminal.service";
import { busService } from "@/services/bus.service";
import { empleadoService } from "@/services/empleado.service";
import type { OrdenTrabajo, TipoOt, CreateOrdenTrabajoDto } from "@/types/orden-trabajo";
import type { Terminal } from "@/types/terminal";
import type { Bus } from "@/types/bus";
import type { Empleado } from "@/types/empleado";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/get-error-message";

export interface OrdenTrabajoFormValues {
  id: number | undefined;
  idTerminal: number | undefined;
  tipoOt: TipoOt | "";
  nroOtManager: number | undefined;
  idBus: number | undefined;
  km: number | undefined;
  ppu: string;
  idConductor: number | undefined;
  fechaHoraIngreso: string;
  fechaHoraSalida: string;
  trabajoARealizar: string;
  obsTrabMecanico: string;
  obsTrabElectrico: string;
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
  itemFalla: string;
}

const defaultValues: OrdenTrabajoFormValues = {
  id: undefined,
  idTerminal: undefined,
  tipoOt: "",
  nroOtManager: undefined,
  idBus: undefined,
  km: undefined,
  ppu: "",
  idConductor: undefined,
  fechaHoraIngreso: "",
  fechaHoraSalida: "",
  trabajoARealizar: "",
  obsTrabMecanico: "",
  obsTrabElectrico: "",
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
  itemFalla: "",
};

interface UseOrdenesTrabajoReturn {
  filteredOrdenes: OrdenTrabajo[];
  isLoading: boolean;
  search: string;
  setSearch: (value: string) => void;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  editingOt: OrdenTrabajo | null;
  deleteId: number | null;
  setDeleteId: (id: number | null) => void;
  isSaving: boolean;
  form: UseFormReturn<OrdenTrabajoFormValues>;
  openCreate: () => void;
  openEdit: (ot: OrdenTrabajo) => void;
  closeDialog: () => void;
  onSubmit: (data: OrdenTrabajoFormValues) => void;
  confirmDelete: () => void;
  terminales: Terminal[];
  buses: Bus[];
  empleados: Empleado[];
}

export function useOrdenesTrabajo(): UseOrdenesTrabajoReturn {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingOt, setEditingOt] = useState<OrdenTrabajo | null>(null);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["ordenes-trabajo"],
    queryFn: ordenTrabajoService.getAll,
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

  const { data: empleadosData } = useQuery({
    queryKey: ["empleados"],
    queryFn: empleadoService.getAll,
  });
  const empleados = Array.isArray(empleadosData) ? empleadosData : [];

  const form = useForm<OrdenTrabajoFormValues>();

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingOt(null);
    form.reset(defaultValues);
  };

  const createMutation = useMutation({
    mutationFn: ordenTrabajoService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ordenes-trabajo"] });
      toast.success("Orden de trabajo creada correctamente");
      closeDialog();
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al crear la orden de trabajo")),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateOrdenTrabajoDto }) =>
      ordenTrabajoService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ordenes-trabajo"] });
      toast.success("Orden de trabajo actualizada correctamente");
      closeDialog();
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al actualizar la orden de trabajo")),
  });

  const deleteMutation = useMutation({
    mutationFn: ordenTrabajoService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ordenes-trabajo"] });
      toast.success("Orden de trabajo eliminada correctamente");
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al eliminar la orden de trabajo")),
  });

  const openCreate = () => {
    setEditingOt(null);
    form.reset(defaultValues);
    setDialogOpen(true);
  };

  const openEdit = (ot: OrdenTrabajo) => {
    setEditingOt(ot);
    form.reset({
      id: ot.id,
      idTerminal: ot.terminal?.idTerminal ?? undefined,
      tipoOt: ot.tipoOt ?? "",
      nroOtManager: ot.nroOtManager ?? undefined,
      idBus: ot.bus?.idBus ?? undefined,
      km: ot.km ?? undefined,
      ppu: ot.ppu ?? "",
      idConductor: ot.conductor?.id ?? undefined,
      fechaHoraIngreso: ot.fechaHoraIngreso ?? "",
      fechaHoraSalida: ot.fechaHoraSalida ?? "",
      trabajoARealizar: ot.trabajoARealizar ?? "",
      obsTrabMecanico: ot.obsTrabMecanico ?? "",
      obsTrabElectrico: ot.obsTrabElectrico ?? "",
      idJefeTurnoPatio: ot.jefeTurnoPatio?.id ?? undefined,
      horaJefeTurnoPatio: ot.horaJefeTurnoPatio ?? "",
      idJefeTurnoMant: ot.jefeTurnoMant?.id ?? undefined,
      horaJefeTurnoMant: ot.horaJefeTurnoMant ?? "",
      idSupervCalidad: ot.supervCalidad?.id ?? undefined,
      horaSupervCalidad: ot.horaSupervCalidad ?? "",
      obsControlCalidad: ot.obsControlCalidad ?? "",
      repAutoriza: ot.repAutoriza ?? "",
      repRetira: ot.repRetira ?? "",
      repBodega: ot.repBodega ?? "",
      itemFalla: ot.itemFalla ?? "",
    });
    setDialogOpen(true);
  };

  const onSubmit = (data: OrdenTrabajoFormValues) => {
    if (editingOt) {
      updateMutation.mutate({ id: editingOt.id, data: cleanFormData(data) });
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

  const filteredOrdenes = ordenes.filter(
    (ot) =>
      String(ot.id).includes(search) ||
      ot.tipoOt?.toLowerCase().includes(search.toLowerCase()) ||
      ot.ppu?.toLowerCase().includes(search.toLowerCase()) ||
      ot.conductor?.nombreCompleto?.toLowerCase().includes(search.toLowerCase()) ||
      ot.terminal?.terminal?.toLowerCase().includes(search.toLowerCase())
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
    empleados,
  };
}

function cleanFormData(data: OrdenTrabajoFormValues): CreateOrdenTrabajoDto {
  return {
    id: data.id!,
    idTerminal: data.idTerminal ?? undefined,
    tipoOt: data.tipoOt || undefined,
    nroOtManager: data.nroOtManager ?? undefined,
    idBus: data.idBus ?? undefined,
    km: data.km ?? undefined,
    ppu: data.ppu || undefined,
    idConductor: data.idConductor ?? undefined,
    fechaHoraIngreso: data.fechaHoraIngreso || undefined,
    fechaHoraSalida: data.fechaHoraSalida || undefined,
    trabajoARealizar: data.trabajoARealizar || undefined,
    obsTrabMecanico: data.obsTrabMecanico || undefined,
    obsTrabElectrico: data.obsTrabElectrico || undefined,
    idJefeTurnoPatio: data.idJefeTurnoPatio ?? undefined,
    horaJefeTurnoPatio: data.horaJefeTurnoPatio || undefined,
    idJefeTurnoMant: data.idJefeTurnoMant ?? undefined,
    horaJefeTurnoMant: data.horaJefeTurnoMant || undefined,
    idSupervCalidad: data.idSupervCalidad ?? undefined,
    horaSupervCalidad: data.horaSupervCalidad || undefined,
    obsControlCalidad: data.obsControlCalidad || undefined,
    repAutoriza: data.repAutoriza || undefined,
    repRetira: data.repRetira || undefined,
    repBodega: data.repBodega || undefined,
    itemFalla: data.itemFalla || undefined,
  };
}
