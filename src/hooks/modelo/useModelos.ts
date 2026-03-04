import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { modeloService } from "@/services/modelo.service";
import type { Modelo } from "@/types/modelo";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/get-error-message";

export interface ModeloFormValues {
  modelo: string;
  kmDiario: number | undefined;
  observaciones: string;
}

export function useModelos() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingModelo, setEditingModelo] = useState<Modelo | null>(null);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["modelos"],
    queryFn: modeloService.getAll,
  });
  const modelos = Array.isArray(data) ? data : [];

  const form = useForm<ModeloFormValues>();

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingModelo(null);
    form.reset();
  };

  const createMutation = useMutation({
    mutationFn: modeloService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modelos"] });
      toast.success("Modelo creado correctamente");
      closeDialog();
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al crear el modelo")),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ModeloFormValues }) =>
      modeloService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modelos"] });
      toast.success("Modelo actualizado correctamente");
      closeDialog();
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al actualizar el modelo")),
  });

  const deleteMutation = useMutation({
    mutationFn: modeloService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modelos"] });
      toast.success("Modelo eliminado correctamente");
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al eliminar el modelo")),
  });

  const openCreate = () => {
    setEditingModelo(null);
    form.reset({ modelo: "", kmDiario: undefined, observaciones: "" });
    setDialogOpen(true);
  };

  const openEdit = (modelo: Modelo) => {
    setEditingModelo(modelo);
    form.reset({
      modelo: modelo.modelo ?? "",
      kmDiario: modelo.kmDiario,
      observaciones: modelo.observaciones ?? "",
    });
    setDialogOpen(true);
  };

  const onSubmit = (data: ModeloFormValues) => {
    if (editingModelo) {
      updateMutation.mutate({ id: editingModelo.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      deleteMutation.mutate(deleteId);
      setDeleteId(null);
    }
  };

  const filteredModelos = modelos.filter(
    (modelo) =>
      modelo.modelo?.toLowerCase().includes(search.toLowerCase()) ||
      String(modelo.id).includes(search)
  );

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return {
    filteredModelos,
    isLoading,
    search,
    setSearch,
    dialogOpen,
    setDialogOpen,
    editingModelo,
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
