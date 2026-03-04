import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { busService } from "@/services/bus.service";
import { terminalService } from "@/services/terminal.service";
import { modeloService } from "@/services/modelo.service";
import type { Bus, CreateBusDto } from "@/types/bus";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/get-error-message";

export interface BusFormValues {
  idBus: number;
  idTerminal: number;
  idModelo: number;
  patenteB: string;
  marcaB: string;
  motorB: string;
  anioFabB: number | undefined;
  transmisionB: string;
  kmB: number | undefined;
  zonaB: string;
  nroNeumaticosB: number | undefined;
  nroBaterias: number | undefined;
}

export function useBuses() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingBus, setEditingBus] = useState<Bus | null>(null);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["buses"],
    queryFn: busService.getAll,
  });
  const buses = Array.isArray(data) ? data : [];

  const { data: terminalesData } = useQuery({
    queryKey: ["terminales"],
    queryFn: terminalService.getAll,
  });
  const terminales = Array.isArray(terminalesData) ? terminalesData : [];

  const { data: modelosData } = useQuery({
    queryKey: ["modelos"],
    queryFn: modeloService.getAll,
  });
  const modelos = Array.isArray(modelosData) ? modelosData : [];

  const form = useForm<BusFormValues>();

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingBus(null);
    form.reset();
  };

  const createMutation = useMutation({
    mutationFn: (data: CreateBusDto) => busService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buses"] });
      toast.success("Bus creado correctamente");
      closeDialog();
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al crear el bus")),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: BusFormValues }) =>
      busService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buses"] });
      toast.success("Bus actualizado correctamente");
      closeDialog();
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al actualizar el bus")),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => busService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buses"] });
      toast.success("Bus eliminado correctamente");
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al eliminar el bus")),
  });

  const openCreate = () => {
    setEditingBus(null);
    form.reset({
      idBus: undefined as unknown as number,
      idTerminal: undefined as unknown as number,
      idModelo: undefined as unknown as number,
      patenteB: "",
      marcaB: "",
      motorB: "",
      anioFabB: undefined,
      transmisionB: "",
      kmB: 0,
      zonaB: "",
      nroNeumaticosB: 0,
      nroBaterias: 0,
    });
    setDialogOpen(true);
  };

  const openEdit = (bus: Bus) => {
    setEditingBus(bus);
    form.reset({
      idBus: bus.idBus,
      idTerminal: bus.terminal?.idTerminal,
      idModelo: bus.modelo?.idModelo,
      patenteB: bus.patenteB ?? "",
      marcaB: bus.marcaB ?? "",
      motorB: bus.motorB ?? "",
      anioFabB: bus.anioFabB,
      transmisionB: bus.transmisionB ?? "",
      kmB: bus.kmB ?? 0,
      zonaB: bus.zonaB ?? "",
      nroNeumaticosB: bus.nroNeumaticosB ?? 0,
      nroBaterias: bus.nroBaterias ?? 0,
    });
    setDialogOpen(true);
  };

  const onSubmit = (data: BusFormValues) => {
    if (editingBus) {
      const { idBus: _id, ...updateData } = data;
      updateMutation.mutate({ id: editingBus.idBus, data: updateData as BusFormValues });
    } else {
      createMutation.mutate(data as CreateBusDto);
    }
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      deleteMutation.mutate(deleteId);
      setDeleteId(null);
    }
  };

  const filteredBuses = buses.filter(
    (bus) =>
      bus.patenteB?.toLowerCase().includes(search.toLowerCase()) ||
      bus.marcaB?.toLowerCase().includes(search.toLowerCase()) ||
      String(bus.idBus).includes(search)
  );

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return {
    filteredBuses,
    isLoading,
    search,
    setSearch,
    dialogOpen,
    setDialogOpen,
    editingBus,
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
    modelos,
  };
}
