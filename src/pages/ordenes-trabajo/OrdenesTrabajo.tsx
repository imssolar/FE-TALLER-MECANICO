import { Controller } from "react-hook-form";
import { PageHeader } from "@/components/shared/PageHeader";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { useOrdenesTrabajo } from "@/hooks/orden-trabajo/useOrdenesTrabajo";
import { TIPO_OT_LABELS, type TipoOt } from "@/types/orden-trabajo";

export default function OrdenesTrabajo() {
  const {
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
    buses,
    empleados,
  } = useOrdenesTrabajo();

  const { register, handleSubmit, control, formState: { errors } } = form;

  return (
    <>
      <PageHeader
        title="Órdenes de Trabajo"
        description="Gestión de órdenes de trabajo"
        actions={
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva OT
          </Button>
        }
      />

      <div className="mb-4">
        <Input
          placeholder="Buscar por ID, tipo, PPU, conductor o terminal..."
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
              <TableHead>Tipo</TableHead>
              <TableHead>Terminal</TableHead>
              <TableHead>Bus</TableHead>
              <TableHead>PPU</TableHead>
              <TableHead>Conductor</TableHead>
              <TableHead>Ingreso</TableHead>
              <TableHead>Salida</TableHead>
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
            ) : filteredOrdenes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  No se encontraron órdenes de trabajo
                </TableCell>
              </TableRow>
            ) : (
              filteredOrdenes.map((ot) => (
                <TableRow key={ot.id}>
                  <TableCell className="font-medium">{ot.id}</TableCell>
                  <TableCell>
                    {ot.tipoOt ? TIPO_OT_LABELS[ot.tipoOt as TipoOt] ?? ot.tipoOt : "—"}
                  </TableCell>
                  <TableCell>{ot.terminal?.terminal ?? "—"}</TableCell>
                  <TableCell>{ot.bus?.idBus ?? "—"}</TableCell>
                  <TableCell>{ot.ppu ?? "—"}</TableCell>
                  <TableCell>{ot.conductor?.nombreCompleto ?? "—"}</TableCell>
                  <TableCell>
                    {ot.fechaHoraIngreso
                      ? new Date(ot.fechaHoraIngreso).toLocaleString("es-CL")
                      : "—"}
                  </TableCell>
                  <TableCell>
                    {ot.fechaHoraSalida
                      ? new Date(ot.fechaHoraSalida).toLocaleString("es-CL")
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(ot)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(ot.id)}>
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingOt ? "Editar Orden de Trabajo" : "Nueva Orden de Trabajo"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Datos Generales */}
            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Datos Generales
              </legend>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="id">ID OT *</Label>
                  <Input
                    id="id"
                    type="number"
                    {...register("id", { required: "ID requerido", valueAsNumber: true })}
                    disabled={!!editingOt}
                  />
                  {errors.id && (
                    <p className="text-sm text-destructive">{errors.id.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Tipo OT</Label>
                  <Controller
                    control={control}
                    name="tipoOt"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(TIPO_OT_LABELS) as TipoOt[]).map((key) => (
                            <SelectItem key={key} value={key}>
                              {TIPO_OT_LABELS[key]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nroOtManager">Nro OT Manager</Label>
                  <Input
                    id="nroOtManager"
                    type="number"
                    {...register("nroOtManager", { valueAsNumber: true })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Terminal</Label>
                  <Controller
                    control={control}
                    name="idTerminal"
                    render={({ field }) => (
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(val) => field.onChange(Number(val))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar terminal" />
                        </SelectTrigger>
                        <SelectContent>
                          {terminales.map((t) => (
                            <SelectItem key={t.idTerminal} value={String(t.idTerminal)}>
                              {t.terminal}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bus</Label>
                  <Controller
                    control={control}
                    name="idBus"
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
                              {b.idBus} — {b.patenteB}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemFalla">Item Falla</Label>
                  <Input id="itemFalla" {...register("itemFalla")} maxLength={25} />
                </div>
              </div>
            </fieldset>

            {/* Datos del Vehículo */}
            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Datos del Vehículo
              </legend>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ppu">PPU (Patente)</Label>
                  <Input id="ppu" {...register("ppu")} maxLength={8} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="km">Kilometraje</Label>
                  <Input id="km" type="number" {...register("km", { valueAsNumber: true })} />
                </div>
                <div className="space-y-2">
                  <Label>Conductor</Label>
                  <Controller
                    control={control}
                    name="idConductor"
                    render={({ field }) => (
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(val) => field.onChange(Number(val))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar conductor" />
                        </SelectTrigger>
                        <SelectContent>
                          {empleados
                            .filter((e) => e.cargo === "CONDUCTOR" && e.activo)
                            .map((e) => (
                              <SelectItem key={e.id} value={String(e.id)}>
                                {e.nombreCompleto}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </fieldset>

            {/* Fechas */}
            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Fechas
              </legend>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fechaHoraIngreso">Fecha/Hora Ingreso</Label>
                  <Input
                    id="fechaHoraIngreso"
                    type="datetime-local"
                    {...register("fechaHoraIngreso")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaHoraSalida">Fecha/Hora Salida</Label>
                  <Input
                    id="fechaHoraSalida"
                    type="datetime-local"
                    {...register("fechaHoraSalida")}
                  />
                </div>
              </div>
            </fieldset>

            {/* Trabajo */}
            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Trabajo
              </legend>
              <div className="space-y-2">
                <Label htmlFor="trabajoARealizar">Trabajo a Realizar</Label>
                <Textarea
                  id="trabajoARealizar"
                  {...register("trabajoARealizar")}
                  maxLength={120}
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="obsTrabMecanico">Obs. Trabajo Mecánico</Label>
                  <Textarea
                    id="obsTrabMecanico"
                    {...register("obsTrabMecanico")}
                    maxLength={300}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="obsTrabElectrico">Obs. Trabajo Eléctrico</Label>
                  <Textarea
                    id="obsTrabElectrico"
                    {...register("obsTrabElectrico")}
                    maxLength={500}
                    rows={3}
                  />
                </div>
              </div>
            </fieldset>

            {/* Firmas y Control */}
            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Firmas y Control
              </legend>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Jefe Turno Patio</Label>
                  <Controller
                    control={control}
                    name="idJefeTurnoPatio"
                    render={({ field }) => (
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(val) => field.onChange(Number(val))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar jefe turno patio" />
                        </SelectTrigger>
                        <SelectContent>
                          {empleados
                            .filter((e) => e.activo)
                            .map((e) => (
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
                  <Label htmlFor="horaJefeTurnoPatio">Hora Jefe Turno Patio</Label>
                  <Input
                    id="horaJefeTurnoPatio"
                    type="datetime-local"
                    {...register("horaJefeTurnoPatio")}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Jefe Turno Mantención</Label>
                  <Controller
                    control={control}
                    name="idJefeTurnoMant"
                    render={({ field }) => (
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(val) => field.onChange(Number(val))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar jefe turno mantención" />
                        </SelectTrigger>
                        <SelectContent>
                          {empleados
                            .filter((e) => e.activo)
                            .map((e) => (
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
                  <Label htmlFor="horaJefeTurnoMant">Hora Jefe Turno Mantención</Label>
                  <Input
                    id="horaJefeTurnoMant"
                    type="datetime-local"
                    {...register("horaJefeTurnoMant")}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Supervisor Calidad</Label>
                  <Controller
                    control={control}
                    name="idSupervCalidad"
                    render={({ field }) => (
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(val) => field.onChange(Number(val))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar supervisor calidad" />
                        </SelectTrigger>
                        <SelectContent>
                          {empleados
                            .filter((e) => e.activo)
                            .map((e) => (
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
                  <Label htmlFor="horaSupervCalidad">Hora Supervisor Calidad</Label>
                  <Input
                    id="horaSupervCalidad"
                    type="datetime-local"
                    {...register("horaSupervCalidad")}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="obsControlCalidad">Obs. Control de Calidad</Label>
                <Textarea
                  id="obsControlCalidad"
                  {...register("obsControlCalidad")}
                  maxLength={100}
                  rows={2}
                />
              </div>
            </fieldset>

            {/* Entrega */}
            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Entrega
              </legend>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="repAutoriza">Rep. Autoriza</Label>
                  <Input id="repAutoriza" {...register("repAutoriza")} maxLength={50} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="repRetira">Rep. Retira</Label>
                  <Input id="repRetira" {...register("repRetira")} maxLength={50} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="repBodega">Rep. Bodega</Label>
                  <Input id="repBodega" {...register("repBodega")} maxLength={50} />
                </div>
              </div>
            </fieldset>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Guardando..." : editingOt ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Eliminar Orden de Trabajo"
        description="¿Estás seguro de que deseas eliminar esta orden de trabajo? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        onConfirm={confirmDelete}
      />
    </>
  );
}
