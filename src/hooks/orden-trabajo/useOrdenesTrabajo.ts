import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, type UseFormReturn } from "react-hook-form";
import { ordenTrabajoService } from "@/services/orden-trabajo.service";
import { terminalService } from "@/services/terminal.service";
import { busService } from "@/services/bus.service";
import type { OrdenTrabajo, TipoOt, CreateOrdenTrabajoDto } from "@/types/orden-trabajo";
import type { Terminal } from "@/types/terminal";
import type { Bus } from "@/types/bus";
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
  conductor: string;
  fechaHoraIngreso: string;
  fechaHoraSalida: string;
  trabajoARealizar: string;
  obsTrabMecanico: string;
  obsTrabElectrico: string;
  jefeTurnoPatio: string;
  horaJefeTurnoPatio: string;
  jefeTurnoMant: string;
  horaJefeTurnoMant: string;
  supervCalidad: string;
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
  conductor: "",
  fechaHoraIngreso: "",
  fechaHoraSalida: "",
  trabajoARealizar: "",
  obsTrabMecanico: "",
  obsTrabElectrico: "",
  jefeTurnoPatio: "",
  horaJefeTurnoPatio: "",
  jefeTurnoMant: "",
  horaJefeTurnoMant: "",
  supervCalidad: "",
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
      conductor: ot.conductor ?? "",
      fechaHoraIngreso: ot.fechaHoraIngreso ?? "",
      fechaHoraSalida: ot.fechaHoraSalida ?? "",
      trabajoARealizar: ot.trabajoARealizar ?? "",
      obsTrabMecanico: ot.obsTrabMecanico ?? "",
      obsTrabElectrico: ot.obsTrabElectrico ?? "",
      jefeTurnoPatio: ot.jefeTurnoPatio ?? "",
      horaJefeTurnoPatio: ot.horaJefeTurnoPatio ?? "",
      jefeTurnoMant: ot.jefeTurnoMant ?? "",
      horaJefeTurnoMant: ot.horaJefeTurnoMant ?? "",
      supervCalidad: ot.supervCalidad ?? "",
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
      ot.conductor?.toLowerCase().includes(search.toLowerCase()) ||
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
  };
}

function cleanFormData(data: OrdenTrabajoFormValues): CreateOrdenTrabajoDto {
  return {
    ...data,
    id: data.id!,
    idTerminal: data.idTerminal ?? undefined,
    tipoOt: data.tipoOt || undefined,
    nroOtManager: data.nroOtManager ?? undefined,
    idBus: data.idBus ?? undefined,
    km: data.km ?? undefined,
    ppu: data.ppu || undefined,
    conductor: data.conductor || undefined,
    fechaHoraIngreso: data.fechaHoraIngreso || undefined,
    fechaHoraSalida: data.fechaHoraSalida || undefined,
    trabajoARealizar: data.trabajoARealizar || undefined,
    obsTrabMecanico: data.obsTrabMecanico || undefined,
    obsTrabElectrico: data.obsTrabElectrico || undefined,
    jefeTurnoPatio: data.jefeTurnoPatio || undefined,
    horaJefeTurnoPatio: data.horaJefeTurnoPatio || undefined,
    jefeTurnoMant: data.jefeTurnoMant || undefined,
    horaJefeTurnoMant: data.horaJefeTurnoMant || undefined,
    supervCalidad: data.supervCalidad || undefined,
    horaSupervCalidad: data.horaSupervCalidad || undefined,
    obsControlCalidad: data.obsControlCalidad || undefined,
    repAutoriza: data.repAutoriza || undefined,
    repRetira: data.repRetira || undefined,
    repBodega: data.repBodega || undefined,
    itemFalla: data.itemFalla || undefined,
  };
}
