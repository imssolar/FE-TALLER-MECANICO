import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { torreControlService } from "@/services/torre-control.service";
import { busService } from "@/services/bus.service";
import { empleadoService } from "@/services/empleado.service";
import type { TorreControl, CreateTorreControlDto, UpdateTorreControlDto } from "@/types/torre-control";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/get-error-message";

export type FiltroEstado = "todos" | "abiertos" | "cerrados";

export interface TorreControlFormValues {
  idBus: number;
  falla: string;
  tipoFalla: string;
  idEmpleadoMecanico: number | undefined;
  idEmpleadoElectrico: number | undefined;
  status: string;
  cerrado: boolean;
}

export function useTorreControl(): {
  filteredRegistros: TorreControl[];
  isLoading: boolean;
  search: string;
  setSearch: (v: string) => void;
  filtroEstado: FiltroEstado;
  setFiltroEstado: (v: FiltroEstado) => void;
  dialogOpen: boolean;
  setDialogOpen: (v: boolean) => void;
  editingRegistro: TorreControl | null;
  deleteId: number | null;
  setDeleteId: (v: number | null) => void;
  isSaving: boolean;
  form: ReturnType<typeof useForm<TorreControlFormValues>>;
  buses: Awaited<ReturnType<typeof busService.getAll>>;
  empleados: Awaited<ReturnType<typeof empleadoService.getAll>>;
  openCreate: () => void;
  openEdit: (registro: TorreControl) => void;
  closeDialog: () => void;
  onSubmit: (data: TorreControlFormValues) => void;
  confirmDelete: () => void;
} {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingRegistro, setEditingRegistro] = useState<TorreControl | null>(null);
  const [search, setSearch] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<FiltroEstado>("todos");

  const { data, isLoading } = useQuery({
    queryKey: ["torre-control"],
    queryFn: torreControlService.getAll,
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

  const form = useForm<TorreControlFormValues>();

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingRegistro(null);
    form.reset();
  };

  const createMutation = useMutation({
    mutationFn: (data: CreateTorreControlDto) => torreControlService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["torre-control"] });
      toast.success("Registro creado correctamente");
      closeDialog();
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al crear el registro")),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTorreControlDto }) =>
      torreControlService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["torre-control"] });
      toast.success("Registro actualizado correctamente");
      closeDialog();
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al actualizar el registro")),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => torreControlService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["torre-control"] });
      toast.success("Registro eliminado correctamente");
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al eliminar el registro")),
  });

  const openCreate = () => {
    setEditingRegistro(null);
    form.reset({
      idBus: undefined as unknown as number,
      falla: "",
      tipoFalla: "",
      idEmpleadoMecanico: undefined,
      idEmpleadoElectrico: undefined,
      status: "",
      cerrado: false,
    });
    setDialogOpen(true);
  };

  const openEdit = (registro: TorreControl) => {
    setEditingRegistro(registro);
    form.reset({
      idBus: registro.idBus,
      falla: registro.falla ?? "",
      tipoFalla: registro.tipoFalla ?? "",
      idEmpleadoMecanico: registro.idEmpleadoMecanico ?? undefined,
      idEmpleadoElectrico: registro.idEmpleadoElectrico ?? undefined,
      status: registro.status ?? "",
      cerrado: registro.cerrado ?? false,
    });
    setDialogOpen(true);
  };

  const onSubmit = (data: TorreControlFormValues) => {
    if (editingRegistro) {
      const { idBus: _id, ...updateData } = data;
      updateMutation.mutate({ id: editingRegistro.id, data: updateData as UpdateTorreControlDto });
    } else {
      createMutation.mutate(data as CreateTorreControlDto);
    }
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      deleteMutation.mutate(deleteId);
      setDeleteId(null);
    }
  };

  const filteredRegistros = registros.filter((r) => {
    const matchesEstado =
      filtroEstado === "todos" ||
      (filtroEstado === "abiertos" && !r.cerrado) ||
      (filtroEstado === "cerrados" && r.cerrado);

    const matchesSearch =
      r.patenteB?.toLowerCase().includes(search.toLowerCase()) ||
      r.falla?.toLowerCase().includes(search.toLowerCase()) ||
      r.status?.toLowerCase().includes(search.toLowerCase()) ||
      r.nombreCompletoMecanico?.toLowerCase().includes(search.toLowerCase()) ||
      r.nombreCompletoElectrico?.toLowerCase().includes(search.toLowerCase()) ||
      String(r.id).includes(search);

    return matchesEstado && matchesSearch;
  });

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return {
    filteredRegistros,
    isLoading,
    search,
    setSearch,
    filtroEstado,
    setFiltroEstado,
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
