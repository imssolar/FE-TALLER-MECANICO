import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, type UseFormReturn } from "react-hook-form";
import { ordenTrabajoMovilService } from "@/services/orden-trabajo-movil.service";
import { terminalService } from "@/services/terminal.service";
import { movilService } from "@/services/movil.service";
import { empleadoService } from "@/services/empleado.service";
import type {
  OrdenTrabajoMovil,
  CreateOrdenTrabajoMovilDto,
  UpdateOrdenTrabajoMovilDto,
} from "@/types/orden-trabajo-movil";
import type { Terminal } from "@/types/terminal";
import type { Movil } from "@/types/movil";
import type { Empleado } from "@/types/empleado";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/get-error-message";

export interface OrdenTrabajoMovilFormValues {
  id: number | undefined;
  tipoOtm: string;
  idTerminal: number | undefined;
  nroOtManager: number | undefined;
  idMovil: number | undefined;
  km: number | undefined;
  ppu: string;
  idConductor: number | undefined;
  fechaHoraIngreso: string;
  fechaHoraSalida: string;
  trabajoARealizar: string;
  obsRecepcion: string;
  idResponsable: number | undefined;
  horaResponsable: string;
  idRespTecnico: number | undefined;
  horaTecnico: string;
  idRespRecepciona: number | undefined;
  horaRecepcion: string;
  obsTecnicas: string;
  autoriza: string;
  retira: string;
  bodega: string;
  formato: string;
}

const defaultValues: OrdenTrabajoMovilFormValues = {
  id: undefined,
  tipoOtm: "",
  idTerminal: undefined,
  nroOtManager: undefined,
  idMovil: undefined,
  km: undefined,
  ppu: "",
  idConductor: undefined,
  fechaHoraIngreso: "",
  fechaHoraSalida: "",
  trabajoARealizar: "",
  obsRecepcion: "",
  idResponsable: undefined,
  horaResponsable: "",
  idRespTecnico: undefined,
  horaTecnico: "",
  idRespRecepciona: undefined,
  horaRecepcion: "",
  obsTecnicas: "",
  autoriza: "",
  retira: "",
  bodega: "",
  formato: "",
};

interface UseOrdenesTrabajoMovilReturn {
  filteredOrdenes: OrdenTrabajoMovil[];
  isLoading: boolean;
  search: string;
  setSearch: (value: string) => void;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  editingOt: OrdenTrabajoMovil | null;
  deleteId: number | null;
  setDeleteId: (id: number | null) => void;
  isSaving: boolean;
  form: UseFormReturn<OrdenTrabajoMovilFormValues>;
  openCreate: () => void;
  openEdit: (ot: OrdenTrabajoMovil) => void;
  closeDialog: () => void;
  onSubmit: (data: OrdenTrabajoMovilFormValues) => void;
  confirmDelete: () => void;
  terminales: Terminal[];
  moviles: Movil[];
  conductores: Empleado[];
  responsables: Empleado[];
  tecnicosList: Empleado[];
  recepcionistas: Empleado[];
}

export function useOrdenesTrabajoMovil(): UseOrdenesTrabajoMovilReturn {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingOt, setEditingOt] = useState<OrdenTrabajoMovil | null>(null);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["ordenes-trabajo-movil"],
    queryFn: ordenTrabajoMovilService.findAll,
  });
  const ordenes = Array.isArray(data) ? data : [];

  const { data: terminalesData } = useQuery({
    queryKey: ["terminales"],
    queryFn: terminalService.getAll,
  });
  const terminales = Array.isArray(terminalesData) ? terminalesData : [];

  const { data: movilesData } = useQuery({
    queryKey: ["moviles"],
    queryFn: movilService.getAll,
  });
  const moviles = Array.isArray(movilesData) ? movilesData : [];

  const { data: conductoresData } = useQuery({
    queryKey: ["empleados", "CONDUCTOR"],
    queryFn: () => empleadoService.getByCargo("CONDUCTOR"),
  });
  const conductores = Array.isArray(conductoresData) ? conductoresData : [];

  const { data: responsablesData } = useQuery({
    queryKey: ["empleados", "JEFE_TURNO_MANT"],
    queryFn: () => empleadoService.getByCargo("JEFE_TURNO_MANT"),
  });
  const responsables = Array.isArray(responsablesData) ? responsablesData : [];

  const { data: tecnicosData } = useQuery({
    queryKey: ["empleados", "MECANICO"],
    queryFn: () => empleadoService.getByCargo("MECANICO"),
  });
  const tecnicosList = Array.isArray(tecnicosData) ? tecnicosData : [];

  const { data: recepcionistasData } = useQuery({
    queryKey: ["empleados", "JEFE_TURNO_PATIO"],
    queryFn: () => empleadoService.getByCargo("JEFE_TURNO_PATIO"),
  });
  const recepcionistas = Array.isArray(recepcionistasData) ? recepcionistasData : [];

  const form = useForm<OrdenTrabajoMovilFormValues>({ defaultValues });

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingOt(null);
    form.reset(defaultValues);
  };

  const createMutation = useMutation({
    mutationFn: ordenTrabajoMovilService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ordenes-trabajo-movil"] });
      toast.success("Orden de trabajo móvil creada correctamente");
      closeDialog();
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Error al crear la orden de trabajo móvil")),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateOrdenTrabajoMovilDto }) =>
      ordenTrabajoMovilService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ordenes-trabajo-movil"] });
      toast.success("Orden de trabajo móvil actualizada correctamente");
      closeDialog();
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Error al actualizar la orden de trabajo móvil")),
  });

  const deleteMutation = useMutation({
    mutationFn: ordenTrabajoMovilService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ordenes-trabajo-movil"] });
      toast.success("Orden de trabajo móvil eliminada correctamente");
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Error al eliminar la orden de trabajo móvil")),
  });

  const openCreate = () => {
    setEditingOt(null);
    form.reset(defaultValues);
    setDialogOpen(true);
  };

  const openEdit = (ot: OrdenTrabajoMovil) => {
    setEditingOt(ot);
    form.reset({
      id: ot.id,
      tipoOtm: ot.tipoOtm ?? "",
      idTerminal: ot.idTerminal ?? undefined,
      nroOtManager: ot.nroOtManager ?? undefined,
      idMovil: ot.idMovil ?? undefined,
      km: ot.km ?? undefined,
      ppu: ot.ppu ?? "",
      idConductor: ot.idConductor ?? undefined,
      fechaHoraIngreso: ot.fechaHoraIngreso ?? "",
      fechaHoraSalida: ot.fechaHoraSalida ?? "",
      trabajoARealizar: ot.trabajoARealizar ?? "",
      obsRecepcion: ot.obsRecepcion ?? "",
      idResponsable: ot.idResponsable ?? undefined,
      horaResponsable: ot.horaResponsable ?? "",
      idRespTecnico: ot.idRespTecnico ?? undefined,
      horaTecnico: ot.horaTecnico ?? "",
      idRespRecepciona: ot.idRespRecepciona ?? undefined,
      horaRecepcion: ot.horaRecepcion ?? "",
      obsTecnicas: ot.obsTecnicas ?? "",
      autoriza: ot.autoriza ?? "",
      retira: ot.retira ?? "",
      bodega: ot.bodega ?? "",
      formato: ot.formato ?? "",
    });
    setDialogOpen(true);
  };

  const onSubmit = (data: OrdenTrabajoMovilFormValues) => {
    if (editingOt) {
      updateMutation.mutate({ id: editingOt.id, data: cleanFormData(data) });
    } else {
      if (data.id === undefined) return;
      createMutation.mutate({ id: data.id, ...cleanFormData(data) });
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
      ot.patenteMovil?.toLowerCase().includes(search.toLowerCase()) ||
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
    moviles,
    conductores,
    responsables,
    tecnicosList,
    recepcionistas,
  };
}

function cleanFormData(data: OrdenTrabajoMovilFormValues): UpdateOrdenTrabajoMovilDto {
  return {
    tipoOtm: data.tipoOtm || undefined,
    idTerminal: data.idTerminal,
    nroOtManager: data.nroOtManager,
    idMovil: data.idMovil,
    km: data.km,
    ppu: data.ppu || undefined,
    idConductor: data.idConductor,
    fechaHoraIngreso: data.fechaHoraIngreso || undefined,
    fechaHoraSalida: data.fechaHoraSalida || undefined,
    trabajoARealizar: data.trabajoARealizar || undefined,
    obsRecepcion: data.obsRecepcion || undefined,
    idResponsable: data.idResponsable,
    horaResponsable: data.horaResponsable || undefined,
    idRespTecnico: data.idRespTecnico,
    horaTecnico: data.horaTecnico || undefined,
    idRespRecepciona: data.idRespRecepciona,
    horaRecepcion: data.horaRecepcion || undefined,
    obsTecnicas: data.obsTecnicas || undefined,
    autoriza: data.autoriza || undefined,
    retira: data.retira || undefined,
    bodega: data.bodega || undefined,
    formato: data.formato || undefined,
  };
}
