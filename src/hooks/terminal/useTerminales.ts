import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { terminalService } from "@/services/terminal.service";
import type { Terminal } from "@/types/terminal";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/get-error-message";

export interface TerminalFormValues {
  terminal: string;
  prefijo: string;
}

export function useTerminales() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingTerminal, setEditingTerminal] = useState<Terminal | null>(null);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["terminales"],
    queryFn: terminalService.getAll,
  });
  const terminales = Array.isArray(data) ? data : [];

  const form = useForm<TerminalFormValues>();

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingTerminal(null);
    form.reset();
  };

  const createMutation = useMutation({
    mutationFn: terminalService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["terminales"] });
      toast.success("Terminal creado correctamente");
      closeDialog();
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al crear el terminal")),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TerminalFormValues }) =>
      terminalService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["terminales"] });
      toast.success("Terminal actualizado correctamente");
      closeDialog();
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al actualizar el terminal")),
  });

  const deleteMutation = useMutation({
    mutationFn: terminalService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["terminales"] });
      toast.success("Terminal eliminado correctamente");
    },
    onError: (error) => toast.error(getErrorMessage(error, "Error al eliminar el terminal")),
  });

  const openCreate = () => {
    setEditingTerminal(null);
    form.reset({ terminal: "", prefijo: "" });
    setDialogOpen(true);
  };

  const openEdit = (terminal: Terminal) => {
    setEditingTerminal(terminal);
    form.reset({
      terminal: terminal.terminal ?? "",
      prefijo: terminal.prefijo ?? "",
    });
    setDialogOpen(true);
  };

  const onSubmit = (data: TerminalFormValues) => {
    if (editingTerminal) {
      updateMutation.mutate({ id: editingTerminal.idTerminal, data });
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

  const filteredTerminales = terminales.filter(
    (t) =>
      t.terminal?.toLowerCase().includes(search.toLowerCase()) ||
      t.prefijo?.toLowerCase().includes(search.toLowerCase()) ||
      String(t.idTerminal).includes(search)
  );

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return {
    filteredTerminales,
    isLoading,
    search,
    setSearch,
    dialogOpen,
    setDialogOpen,
    editingTerminal,
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
