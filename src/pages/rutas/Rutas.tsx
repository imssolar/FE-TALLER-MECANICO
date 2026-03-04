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
import { useRutas } from "@/hooks/ruta/useRutas";

export default function Rutas() {
  const {
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
  } = useRutas();

  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <>
      <PageHeader
        title="Rutas"
        description="Gestión de rutas de buses"
        actions={
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Ruta
          </Button>
        }
      />

      <div className="mb-4">
        <Input
          placeholder="Buscar por nombre o ID..."
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
              <TableHead>Ruta</TableHead>
              <TableHead className="w-24">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : filteredRutas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                  No se encontraron rutas
                </TableCell>
              </TableRow>
            ) : (
              filteredRutas.map((ruta) => (
                <TableRow key={ruta.idRuta}>
                  <TableCell className="font-medium">{ruta.idRuta}</TableCell>
                  <TableCell>{ruta.ruta}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(ruta)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(ruta.idRuta)}
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
              {editingRuta ? "Editar Ruta" : "Nueva Ruta"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ruta">Ruta *</Label>
              <Input
                id="ruta"
                {...register("ruta", {
                  required: "Nombre de ruta requerido",
                  minLength: { value: 3, message: "Mínimo 3 caracteres" },
                  maxLength: { value: 50, message: "Máximo 50 caracteres" },
                })}
              />
              {errors.ruta && (
                <p className="text-sm text-destructive">{errors.ruta.message}</p>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Guardando..." : editingRuta ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Eliminar Ruta"
        description="¿Estás seguro de que deseas eliminar esta ruta? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        onConfirm={confirmDelete}
      />
    </>
  );
}
