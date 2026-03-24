import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { cofpatioService } from "@/services/cofpatio.service";
import { busService } from "@/services/bus.service";
import { empleadoService } from "@/services/empleado.service";
import type { Cofpatio, CreateCofpatioDto, UpdateCofpatioDto } from "@/types/cofpatio";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/get-error-message";

export interface CofpatioFormValues {
  idBus: number | undefined;
  km: number | undefined;
  fechaHora: string;
  fechaHoraOperativa: string;
  lugarPanne: string;
  cofPatio: string;
  nroCp: string;
  combustible: boolean;
  idEmpleadoConductor: number | undefined;
  falla: string;
  tipoFalla: string;
  ubicacion: string;
  ubicacion2: string;
  ubicacionTerreno: string;
  cabezal: string;
  horaReal: string;
  trabajoTerreno: string;
  obsTerreno: string;
  operativaTerreno: boolean;
  idEmpleadoMecanico: number | undefined;
  grua: boolean;
  horaLevantamiento: string;
  tiempoDetencion: string;
  idEmpleadoResponsable: number | undefined;
  aceiteMotor: number | undefined;
  aceiteTrans: number | undefined;
  aceiteDir: number | undefined;
  refrigerante: number | undefined;
  codigoPanne: number | undefined;
  idEmpleadoResponsableCierre: number | undefined;
  idIntranet: number | undefined;
}

const defaultValues: CofpatioFormValues = {
  idBus: undefined,
  km: undefined,
  fechaHora: "",
  fechaHoraOperativa: "",
  lugarPanne: "",
  cofPatio: "",
  nroCp: "",
  combustible: false,
  idEmpleadoConductor: undefined,
  falla: "",
  tipoFalla: "",
  ubicacion: "",
  ubicacion2: "",
  ubicacionTerreno: "",
  cabezal: "",
  horaReal: "",
  trabajoTerreno: "",
  obsTerreno: "",
  operativaTerreno: false,
  idEmpleadoMecanico: undefined,
  grua: false,
  horaLevantamiento: "",
  tiempoDetencion: "",
  idEmpleadoResponsable: undefined,
  aceiteMotor: undefined,
  aceiteTrans: undefined,
  aceiteDir: undefined,
  refrigerante: undefined,
  codigoPanne: undefined,
  idEmpleadoResponsableCierre: undefined,
  idIntranet: undefined,
};

export function useCofpatio(): {
  filteredRegistros: Cofpatio[];
  isLoading: boolean;
  search: string;
  setSearch: (v: string) => void;
  dialogOpen: boolean;
  setDialogOpen: (v: boolean) => void;
  editingRegistro: Cofpatio | null;
  deleteId: number | null;
  setDeleteId: (v: number | null) => void;
  isSaving: boolean;
  form: ReturnType<typeof useForm<CofpatioFormValues>>;
  buses: Awaited<ReturnType<typeof busService.getAll>>;
  empleados: Awaited<ReturnType<typeof empleadoService.getAll>>;
  openCreate: () => void;
  openEdit: (registro: Cofpatio) => void;
  closeDialog: () => void;
  onSubmit: (data: CofpatioFormValues) => void;
  confirmDelete: () => void;
} {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingRegistro, setEditingRegistro] = useState<Cofpatio | null>(null);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["cofpatio"],
    queryFn: cofpatioService.getAll,
  });
  const registros = Array.isArray(data) ? data : [];

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

  const form = useForm<CofpatioFormValues>({ defaultValues });

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingRegistro(null);
    form.reset(defaultValues);
  };

  const createMutation = useMutation({
    mutationFn: (data: CreateCofpatioDto) => cofpatioService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cofpatio"] });
      toast.success("Registro creado correctamente");
      closeDialog();
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al crear el registro")),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCofpatioDto }) =>
      cofpatioService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cofpatio"] });
      toast.success("Registro actualizado correctamente");
      closeDialog();
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al actualizar el registro")),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => cofpatioService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cofpatio"] });
      toast.success("Registro eliminado correctamente");
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al eliminar el registro")),
  });

  const openCreate = () => {
    setEditingRegistro(null);
    form.reset(defaultValues);
    setDialogOpen(true);
  };

  const openEdit = (registro: Cofpatio) => {
    setEditingRegistro(registro);
    form.reset({
      idBus: registro.idBus ?? undefined,
      km: registro.km ?? undefined,
      fechaHora: registro.fechaHora ?? "",
      fechaHoraOperativa: registro.fechaHoraOperativa ?? "",
      lugarPanne: registro.lugarPanne ?? "",
      cofPatio: registro.cofPatio ?? "",
      nroCp: registro.nroCp ?? "",
      combustible: registro.combustible ?? false,
      idEmpleadoConductor: registro.idEmpleadoConductor ?? undefined,
      falla: registro.falla ?? "",
      tipoFalla: registro.tipoFalla ?? "",
      ubicacion: registro.ubicacion ?? "",
      ubicacion2: registro.ubicacion2 ?? "",
      ubicacionTerreno: registro.ubicacionTerreno ?? "",
      cabezal: registro.cabezal ?? "",
      horaReal: registro.horaReal ?? "",
      trabajoTerreno: registro.trabajoTerreno ?? "",
      obsTerreno: registro.obsTerreno ?? "",
      operativaTerreno: registro.operativaTerreno ?? false,
      idEmpleadoMecanico: registro.idEmpleadoMecanico ?? undefined,
      grua: registro.grua ?? false,
      horaLevantamiento: registro.horaLevantamiento ?? "",
      tiempoDetencion: registro.tiempoDetencion ?? "",
      idEmpleadoResponsable: registro.idEmpleadoResponsable ?? undefined,
      aceiteMotor: registro.aceiteMotor ?? undefined,
      aceiteTrans: registro.aceiteTrans ?? undefined,
      aceiteDir: registro.aceiteDir ?? undefined,
      refrigerante: registro.refrigerante ?? undefined,
      codigoPanne: registro.codigoPanne ?? undefined,
      idEmpleadoResponsableCierre: registro.idEmpleadoResponsableCierre ?? undefined,
      idIntranet: registro.idIntranet ?? undefined,
    });
    setDialogOpen(true);
  };

  const onSubmit = (data: CofpatioFormValues) => {
    const payload: CreateCofpatioDto = {
      ...data,
      km: data.km || undefined,
      aceiteMotor: data.aceiteMotor || undefined,
      aceiteTrans: data.aceiteTrans || undefined,
      aceiteDir: data.aceiteDir || undefined,
      refrigerante: data.refrigerante || undefined,
      codigoPanne: data.codigoPanne || undefined,
      idIntranet: data.idIntranet || undefined,
      fechaHora: data.fechaHora || undefined,
      fechaHoraOperativa: data.fechaHoraOperativa || undefined,
      horaReal: data.horaReal || undefined,
      horaLevantamiento: data.horaLevantamiento || undefined,
      tiempoDetencion: data.tiempoDetencion || undefined,
    };

    if (editingRegistro) {
      updateMutation.mutate({ id: editingRegistro.id, data: payload as UpdateCofpatioDto });
    } else {
      createMutation.mutate(payload);
    }
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      deleteMutation.mutate(deleteId);
      setDeleteId(null);
    }
  };

  const filteredRegistros = registros.filter((r) => {
    return (
      r.patenteB?.toLowerCase().includes(search.toLowerCase()) ||
      r.falla?.toLowerCase().includes(search.toLowerCase()) ||
      r.tipoFalla?.toLowerCase().includes(search.toLowerCase()) ||
      r.nombreCompletoConductor?.toLowerCase().includes(search.toLowerCase()) ||
      r.nombreCompletoMecanico?.toLowerCase().includes(search.toLowerCase()) ||
      r.lugarPanne?.toLowerCase().includes(search.toLowerCase()) ||
      String(r.id).includes(search)
    );
  });

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return {
    filteredRegistros,
    isLoading,
    search,
    setSearch,
    dialogOpen,
    setDialogOpen,
    editingRegistro,
    deleteId,
    setDeleteId,
    isSaving,
    form,
    buses,
    empleados,
    openCreate,
    openEdit,
    closeDialog,
    onSubmit,
    confirmDelete,
  };
}
