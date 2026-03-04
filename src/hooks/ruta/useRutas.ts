import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { rutaService } from "@/services/ruta.service";
import type { Ruta } from "@/types/ruta";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/get-error-message";

export interface RutaFormValues {
  ruta: string;
}

export function useRutas() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingRuta, setEditingRuta] = useState<Ruta | null>(null);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["rutas"],
    queryFn: rutaService.getAll,
  });
  const rutas = Array.isArray(data) ? data : [];

  const form = useForm<RutaFormValues>();

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingRuta(null);
    form.reset();
  };

  const createMutation = useMutation({
    mutationFn: rutaService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rutas"] });
      toast.success("Ruta creada correctamente");
      closeDialog();
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al crear la ruta")),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: RutaFormValues }) =>
      rutaService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rutas"] });
      toast.success("Ruta actualizada correctamente");
      closeDialog();
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al actualizar la ruta")),
  });

  const deleteMutation = useMutation({
    mutationFn: rutaService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rutas"] });
      toast.success("Ruta eliminada correctamente");
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al eliminar la ruta")),
  });

  const openCreate = () => {
    setEditingRuta(null);
    form.reset({ ruta: "" });
    setDialogOpen(true);
  };

  const openEdit = (ruta: Ruta) => {
    setEditingRuta(ruta);
    form.reset({ ruta: ruta.ruta ?? "" });
    setDialogOpen(true);
  };

  const onSubmit = (data: RutaFormValues) => {
    if (editingRuta) {
      updateMutation.mutate({ id: editingRuta.idRuta, data });
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

  const filteredRutas = rutas.filter(
    (ruta) =>
      ruta.ruta?.toLowerCase().includes(search.toLowerCase()) ||
      String(ruta.idRuta).includes(search)
  );

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return {
    filteredRutas,
    isLoading,
    search,
    setSearch,
    dialogOpen,
    setDialogOpen,
    editingRuta,
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
