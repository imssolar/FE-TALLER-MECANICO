import { Controller } from "react-hook-form";
import { PageHeader } from "@/components/shared/PageHeader";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useBuses } from "@/hooks/bus/useBuses";

export default function Buses() {
  const {
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
  } = useBuses();

  const { register, handleSubmit, control, formState: { errors } } = form;

  return (
    <>
      <PageHeader
        title="Buses"
        description="Gestión de la flota de buses"
        actions={
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Bus
          </Button>
        }
      />

      <div className="mb-4">
        <Input
          placeholder="Buscar por patente, marca o ID..."
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
              <TableHead>Patente</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Motor</TableHead>
              <TableHead>Año</TableHead>
              <TableHead>Km</TableHead>
              <TableHead>Terminal</TableHead>
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
            ) : filteredBuses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  No se encontraron buses
                </TableCell>
              </TableRow>
            ) : (
              filteredBuses.map((bus) => (
                <TableRow key={bus.idBus}>
                  <TableCell className="font-medium">{bus.idBus}</TableCell>
                  <TableCell>{bus.patenteB}</TableCell>
                  <TableCell>{bus.marcaB}</TableCell>
                  <TableCell>{bus.motorB}</TableCell>
                  <TableCell>{bus.anioFabB}</TableCell>
                  <TableCell>{bus.kmB?.toLocaleString()}</TableCell>
                  <TableCell>{bus.terminal?.terminal}</TableCell>
                  <TableCell>
                    {bus.operativaB ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Operativo
                      </Badge>
                    ) : bus.mantencionB ? (
                      <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                        Mantención
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Inactivo</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(bus)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(bus.idBus)}
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingBus ? "Editar Bus" : "Nuevo Bus"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="idBus">ID Bus *</Label>
                <Input
                  id="idBus"
                  type="number"
                  {...register("idBus", { required: "ID requerido", valueAsNumber: true })}
                  disabled={!!editingBus}
                />
                {errors.idBus && (
                  <p className="text-sm text-destructive">{errors.idBus.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="patenteB">Patente</Label>
                <Input id="patenteB" {...register("patenteB")} maxLength={8} />
                {errors.patenteB && (
                  <p className="text-sm text-destructive">{errors.patenteB.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="marcaB">Marca</Label>
                <Input id="marcaB" {...register("marcaB")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motorB">Motor</Label>
                <Input id="motorB" {...register("motorB")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="anioFabB">Año Fabricación</Label>
                <Input id="anioFabB" type="number" {...register("anioFabB", { valueAsNumber: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transmisionB">Transmisión</Label>
                <Input id="transmisionB" {...register("transmisionB")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kmB">Kilometraje</Label>
                <Input id="kmB" type="number" {...register("kmB", { valueAsNumber: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zonaB">Zona</Label>
                <Input id="zonaB" {...register("zonaB")} maxLength={2} />
              </div>
              <div className="space-y-2">
                <Label>Terminal *</Label>
                <Controller
                  control={control}
                  name="idTerminal"
                  rules={{ required: "Terminal requerido" }}
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
                {errors.idTerminal && (
                  <p className="text-sm text-destructive">{errors.idTerminal.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Modelo *</Label>
                <Controller
                  control={control}
                  name="idModelo"
                  rules={{ required: "Modelo requerido" }}
                  render={({ field }) => (
                    <Select
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar modelo" />
                      </SelectTrigger>
                      <SelectContent>
                        {modelos.map((m) => (
                          <SelectItem key={m.id} value={String(m.id)}>
                            {m.modelo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.idModelo && (
                  <p className="text-sm text-destructive">{errors.idModelo.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="nroNeumaticosB">N° Neumáticos</Label>
                <Input id="nroNeumaticosB" type="number" {...register("nroNeumaticosB", { valueAsNumber: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nroBaterias">N° Baterías</Label>
                <Input id="nroBaterias" type="number" {...register("nroBaterias", { valueAsNumber: true })} />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Guardando..." : editingBus ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Eliminar Bus"
        description="¿Estás seguro de que deseas eliminar este bus? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        onConfirm={confirmDelete}
      />
    </>
  );
}
