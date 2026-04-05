import { type ReactElement } from "react";
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
import { useOrdenesTrabajoMovil } from "@/hooks/orden-trabajo-movil/useOrdenesTrabajoMovil";

export default function OrdenesTrabajoMovil(): ReactElement {
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
    moviles,
    conductores,
    responsables,
    tecnicosList,
    recepcionistas,
  } = useOrdenesTrabajoMovil();

  const { register, handleSubmit, control } = form;

  return (
    <>
      <PageHeader
        title="Órdenes de Trabajo Móviles"
        description="Gestión de órdenes de trabajo móviles"
        actions={
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva OTM
          </Button>
        }
      />

      <div className="mb-4">
        <Input
          placeholder="Buscar por ID, PPU, patente móvil o conductor..."
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
              <TableHead>Nro OT Manager</TableHead>
              <TableHead>Móvil</TableHead>
              <TableHead>PPU</TableHead>
              <TableHead>Conductor</TableHead>
              <TableHead>Ingreso</TableHead>
              <TableHead>Salida</TableHead>
              <TableHead>Tipo</TableHead>
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
                  No se encontraron órdenes de trabajo móviles
                </TableCell>
              </TableRow>
            ) : (
              filteredOrdenes.map((ot) => (
                <TableRow key={ot.id}>
                  <TableCell className="font-medium">{ot.id}</TableCell>
                  <TableCell>{ot.nroOtManager ?? "—"}</TableCell>
                  <TableCell>{ot.patenteMovil ?? "—"}</TableCell>
                  <TableCell>{ot.ppu ?? "—"}</TableCell>
                  <TableCell>{ot.nombreCompletoConductor ?? "—"}</TableCell>
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
                  <TableCell>{ot.tipoOtm ?? "—"}</TableCell>
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
              {editingOt ? "Editar OT Móvil" : "Nueva OT Móvil"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Datos Generales
              </legend>
              <div className="grid grid-cols-3 gap-4">
                {!editingOt && (
                  <div className="space-y-2">
                    <Label htmlFor="id">ID OTM</Label>
                    <Input
                      id="id"
                      type="number"
                      {...register("id", { valueAsNumber: true })}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="nroOtManager">Nro OT Manager</Label>
                  <Input
                    id="nroOtManager"
                    type="number"
                    {...register("nroOtManager", { valueAsNumber: true })}
                  />
                </div>
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
                  <Label htmlFor="tipoOtm">Tipo OTM</Label>
                  <Input id="tipoOtm" {...register("tipoOtm")} maxLength={15} />
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Datos del Móvil
              </legend>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Móvil</Label>
                  <Controller
                    control={control}
                    name="idMovil"
                    render={({ field }) => (
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(val) => field.onChange(Number(val))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar móvil" />
                        </SelectTrigger>
                        <SelectContent>
                          {moviles.map((m) => (
                            <SelectItem key={m.id} value={String(m.id)}>
                              {m.patente}{m.marca ? ` — ${m.marca}` : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ppu">PPU</Label>
                  <Input id="ppu" {...register("ppu")} maxLength={8} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="km">Kilometraje</Label>
                  <Input id="km" type="number" {...register("km", { valueAsNumber: true })} />
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Conductor y Fechas
              </legend>
              <div className="grid grid-cols-3 gap-4">
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
                          {conductores.map((e) => (
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
                  <Label htmlFor="fechaHoraIngreso">Fecha/Hora Ingreso</Label>
                  <Input id="fechaHoraIngreso" type="datetime-local" {...register("fechaHoraIngreso")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaHoraSalida">Fecha/Hora Salida</Label>
                  <Input id="fechaHoraSalida" type="datetime-local" {...register("fechaHoraSalida")} />
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Trabajo
              </legend>
              <div className="space-y-2">
                <Label htmlFor="trabajoARealizar">Trabajo a Realizar</Label>
                <Textarea id="trabajoARealizar" {...register("trabajoARealizar")} maxLength={150} rows={2} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="obsRecepcion">Obs. Recepción</Label>
                <Textarea id="obsRecepcion" {...register("obsRecepcion")} maxLength={150} rows={2} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="obsTecnicas">Obs. Técnicas</Label>
                <Textarea id="obsTecnicas" {...register("obsTecnicas")} maxLength={150} rows={2} />
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Firmas y Control
              </legend>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Responsable</Label>
                  <Controller
                    control={control}
                    name="idResponsable"
                    render={({ field }) => (
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(val) => field.onChange(Number(val))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar responsable" />
                        </SelectTrigger>
                        <SelectContent>
                          {responsables.map((e) => (
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
                  <Label htmlFor="horaResponsable">Hora Responsable</Label>
                  <Input id="horaResponsable" type="datetime-local" {...register("horaResponsable")} />
                </div>
                <div className="space-y-2">
                  <Label>Resp. Técnico</Label>
                  <Controller
                    control={control}
                    name="idRespTecnico"
                    render={({ field }) => (
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(val) => field.onChange(Number(val))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar resp. técnico" />
                        </SelectTrigger>
                        <SelectContent>
                          {tecnicosList.map((e) => (
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
                  <Label htmlFor="horaTecnico">Hora Resp. Técnico</Label>
                  <Input id="horaTecnico" type="datetime-local" {...register("horaTecnico")} />
                </div>
                <div className="space-y-2">
                  <Label>Resp. Recepciona</Label>
                  <Controller
                    control={control}
                    name="idRespRecepciona"
                    render={({ field }) => (
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(val) => field.onChange(Number(val))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar resp. recepciona" />
                        </SelectTrigger>
                        <SelectContent>
                          {recepcionistas.map((e) => (
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
                  <Label htmlFor="horaRecepcion">Hora Recepción</Label>
                  <Input id="horaRecepcion" type="datetime-local" {...register("horaRecepcion")} />
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Entrega
              </legend>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="autoriza">Autoriza</Label>
                  <Input id="autoriza" {...register("autoriza")} maxLength={50} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retira">Retira</Label>
                  <Input id="retira" {...register("retira")} maxLength={50} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bodega">Bodega</Label>
                  <Input id="bodega" {...register("bodega")} maxLength={50} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="formato">Formato</Label>
                  <Input id="formato" {...register("formato")} maxLength={2} />
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
        title="Eliminar OT Móvil"
        description="¿Estás seguro de que deseas eliminar esta orden de trabajo móvil? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        onConfirm={confirmDelete}
      />
    </>
  );
}
