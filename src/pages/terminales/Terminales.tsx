import { PageHeader } from "@/components/shared/PageHeader";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useTerminales } from "@/hooks/terminal/useTerminales";

export default function Terminales() {
  const {
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
  } = useTerminales();

  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <>
      <PageHeader
        title="Terminales"
        description="Gestión de terminales"
        actions={
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Terminal
          </Button>
        }
      />

      <div className="mb-4">
        <Input
          placeholder="Buscar por nombre, prefijo o ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">ID</TableHead>
              <TableHead>Terminal</TableHead>
              <TableHead>Prefijo</TableHead>
              <TableHead className="w-24">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : filteredTerminales.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No se encontraron terminales
                </TableCell>
              </TableRow>
            ) : (
              filteredTerminales.map((terminal) => (
                <TableRow key={terminal.idTerminal}>
                  <TableCell className="font-medium">{terminal.idTerminal}</TableCell>
                  <TableCell>{terminal.terminal}</TableCell>
                  <TableCell>{terminal.prefijo}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(terminal)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(terminal.idTerminal)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingTerminal ? "Editar Terminal" : "Nuevo Terminal"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="terminal">Terminal *</Label>
              <Input
                id="terminal"
                maxLength={15}
                {...register("terminal", { required: "Terminal requerido" })}
              />
              {errors.terminal && (
                <p className="text-sm text-destructive">{errors.terminal.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="prefijo">Prefijo *</Label>
              <Input
                id="prefijo"
                maxLength={3}
                className="uppercase"
                {...register("prefijo", { required: "Prefijo requerido" })}
              />
              {errors.prefijo && (
                <p className="text-sm text-destructive">{errors.prefijo.message}</p>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Guardando..." : editingTerminal ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Eliminar Terminal"
        description="¿Estás seguro de que deseas eliminar este terminal? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        onConfirm={confirmDelete}
      />
    </>
  );
}
