import { Controller } from "react-hook-form";
import { PageHeader } from "@/components/shared/PageHeader";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useTorreControl } from "@/hooks/torre-control/useTorreControl";

const STATUS_BADGE: Record<string, string> = {
  "En proceso": "bg-amber-100 text-amber-800 hover:bg-amber-100",
  "Completado": "bg-green-100 text-green-800 hover:bg-green-100",
  "Pendiente": "bg-red-100 text-red-800 hover:bg-red-100",
};

const STATUS_OPTIONS = ["Pendiente", "En proceso", "Completado"];

const TIPO_FALLA_OPTIONS = ["Mecánica", "Eléctrica", "Carrocería", "Neumáticos", "Otro"];

export default function TorreControl() {
  const {
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
  } = useTorreControl();

  const { register, handleSubmit, control, formState: { errors } } = form;

  return (
    <>
      <PageHeader
        title="Torre de Control"
        description="Seguimiento de ingresos y fallas de buses"
        actions={
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Registro
          </Button>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="Buscar por patente, falla, mecánico o ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          {(["todos", "abiertos", "cerrados"] as const).map((f) => (
            <Button
              key={f}
              variant={filtroEstado === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFiltroEstado(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead>Patente</TableHead>
              <TableHead>Falla</TableHead>
              <TableHead>Tipo Falla</TableHead>
              <TableHead>Mecánico</TableHead>
              <TableHead>Eléctrico</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-24">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : filteredRegistros.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  No se encontraron registros
                </TableCell>
              </TableRow>
            ) : (
              filteredRegistros.map((registro) => (
                <TableRow key={registro.id}>
                  <TableCell className="font-medium">{registro.id}</TableCell>
                  <TableCell>{registro.patenteB ?? "—"}</TableCell>
                  <TableCell>{registro.falla ?? "—"}</TableCell>
                  <TableCell>{registro.tipoFalla ?? "—"}</TableCell>
                  <TableCell>{registro.nombreCompletoMecanico ?? "—"}</TableCell>
                  <TableCell>{registro.nombreCompletoElectrico ?? "—"}</TableCell>
                  <TableCell>
                    {registro.status ? (
                      <Badge className={STATUS_BADGE[registro.status] ?? "bg-gray-100 text-gray-800 hover:bg-gray-100"}>
                        {registro.status}
                      </Badge>
                    ) : "—"}
                  </TableCell>
                  <TableCell>
                    {registro.cerrado ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Cerrado
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                        Abierto
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(registro)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(registro.id)}
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
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingRegistro ? "Editar Registro" : "Nuevo Registro"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">

              <div className="col-span-2 space-y-2">
                <Label>Bus *</Label>
                <Controller
                  control={control}
                  name="idBus"
                  rules={{ required: "Bus requerido" }}
                  render={({ field }) => (
                    <Select
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar bus" />
                      </SelectTrigger>
                      <SelectContent>
                        {buses.map((b) => (
                          <SelectItem key={b.idBus} value={String(b.idBus)}>
                            {b.patenteB} — {b.marcaB}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.idBus && (
                  <p className="text-sm text-destructive">{errors.idBus.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="falla">Falla</Label>
                <Input id="falla" maxLength={50} {...register("falla")} />
              </div>

              <div className="space-y-2">
                <Label>Tipo Falla</Label>
                <Controller
                  control={control}
                  name="tipoFalla"
                  render={({ field }) => (
                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIPO_FALLA_OPTIONS.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label>Mecánico</Label>
                <Controller
                  control={control}
                  name="idEmpleadoMecanico"
                  render={({ field }) => (
                    <Select
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar mecánico" />
                      </SelectTrigger>
                      <SelectContent>
                        {empleados.map((e) => (
                          <SelectItem key={e.id} value={String(e.id)}>
                            {e.nombreCompleto}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label>Eléctrico</Label>
                <Controller
                  control={control}
                  name="idEmpleadoElectrico"
                  render={({ field }) => (
                    <Select
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar eléctrico" />
                      </SelectTrigger>
                      <SelectContent>
                        {empleados.map((e) => (
                          <SelectItem key={e.id} value={String(e.id)}>
                            {e.nombreCompleto}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar status" />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  id="cerrado"
                  type="checkbox"
                  className="h-4 w-4"
                  {...register("cerrado")}
                />
                <Label htmlFor="cerrado">Registro cerrado</Label>
              </div>

            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Guardando..." : editingRegistro ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Eliminar Registro"
        description="¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        onConfirm={confirmDelete}
      />
    </>
  );
}
