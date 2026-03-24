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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useCofpatio } from "@/hooks/cofpatio/useCofpatio";
import { TIPO_FALLA_COFPATIO_LABELS } from "@/types/cofpatio";

const TIPO_FALLA_OPTIONS = Object.entries(TIPO_FALLA_COFPATIO_LABELS).map(([, label]) => label);

export default function Cofpatio() {
  const {
    filteredRegistros,
    isLoading,
    search,
    setSearch,
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
  } = useCofpatio();

  const { register, handleSubmit, control, formState: { errors } } = form;

  return (
    <>
      <PageHeader
        title="COF Patio"
        description="Registro de colapsos en patio por bus"
        actions={
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Registro
          </Button>
        }
      />

      <div className="mb-4">
        <Input
          placeholder="Buscar por patente, falla, conductor, mecánico o ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead>Patente</TableHead>
              <TableHead>Falla</TableHead>
              <TableHead>Tipo Falla</TableHead>
              <TableHead>Conductor</TableHead>
              <TableHead>Mecánico</TableHead>
              <TableHead>Lugar Panne</TableHead>
              <TableHead>Grúa</TableHead>
              <TableHead>Operativa</TableHead>
              <TableHead className="w-24">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : filteredRegistros.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
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
                  <TableCell>{registro.nombreCompletoConductor ?? "—"}</TableCell>
                  <TableCell>{registro.nombreCompletoMecanico ?? "—"}</TableCell>
                  <TableCell>{registro.lugarPanne ?? "—"}</TableCell>
                  <TableCell>
                    {registro.grua !== null ? (
                      <Badge className={registro.grua ? "bg-amber-100 text-amber-800 hover:bg-amber-100" : "bg-gray-100 text-gray-700 hover:bg-gray-100"}>
                        {registro.grua ? "Sí" : "No"}
                      </Badge>
                    ) : "—"}
                  </TableCell>
                  <TableCell>
                    {registro.operativaTerreno !== null ? (
                      <Badge className={registro.operativaTerreno ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-red-100 text-red-800 hover:bg-red-100"}>
                        {registro.operativaTerreno ? "Sí" : "No"}
                      </Badge>
                    ) : "—"}
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingRegistro ? "Editar Registro" : "Nuevo Registro"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Tabs defaultValue="identificacion" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="identificacion">Identificación</TabsTrigger>
                <TabsTrigger value="ubicacion">Ubicación</TabsTrigger>
                <TabsTrigger value="terreno">Terreno</TabsTrigger>
                <TabsTrigger value="cierre">Cierre</TabsTrigger>
              </TabsList>

              <TabsContent value="identificacion" className="space-y-4">
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
                    <Label htmlFor="km">KM</Label>
                    <Input id="km" type="number" min={0} {...register("km", { valueAsNumber: true })} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="codigoPanne">Código Panne</Label>
                    <Input id="codigoPanne" type="number" min={0} {...register("codigoPanne", { valueAsNumber: true })} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nroCp">Nro. CP</Label>
                    <Input id="nroCp" maxLength={5} {...register("nroCp")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cofPatio">COF Patio</Label>
                    <Input id="cofPatio" maxLength={5} {...register("cofPatio")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fechaHora">Fecha/Hora</Label>
                    <Input id="fechaHora" type="datetime-local" {...register("fechaHora")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="horaReal">Hora Real</Label>
                    <Input id="horaReal" type="datetime-local" {...register("horaReal")} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ubicacion" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lugarPanne">Lugar Panne</Label>
                    <Input id="lugarPanne" maxLength={10} {...register("lugarPanne")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cabezal">Cabezal</Label>
                    <Input id="cabezal" maxLength={50} {...register("cabezal")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ubicacion">Ubicación</Label>
                    <Input id="ubicacion" maxLength={50} {...register("ubicacion")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ubicacion2">Ubicación 2</Label>
                    <Input id="ubicacion2" maxLength={15} {...register("ubicacion2")} />
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="ubicacionTerreno">Ubicación Terreno</Label>
                    <Input id="ubicacionTerreno" maxLength={50} {...register("ubicacionTerreno")} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="terreno" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Conductor</Label>
                    <Controller
                      control={control}
                      name="idEmpleadoConductor"
                      render={({ field }) => (
                        <Select
                          value={field.value ? String(field.value) : ""}
                          onValueChange={(val) => field.onChange(Number(val))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar conductor" />
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

                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="trabajoTerreno">Trabajo Terreno</Label>
                    <Input id="trabajoTerreno" maxLength={300} {...register("trabajoTerreno")} />
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="obsTerreno">Observaciones Terreno</Label>
                    <Input id="obsTerreno" maxLength={300} {...register("obsTerreno")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fechaHoraOperativa">Fecha/Hora Operativa</Label>
                    <Input id="fechaHoraOperativa" type="datetime-local" {...register("fechaHoraOperativa")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="horaLevantamiento">Hora Levantamiento</Label>
                    <Input id="horaLevantamiento" type="datetime-local" {...register("horaLevantamiento")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tiempoDetencion">Tiempo Detención</Label>
                    <Input id="tiempoDetencion" type="datetime-local" {...register("tiempoDetencion")} />
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex items-center gap-2">
                      <input id="combustible" type="checkbox" className="h-4 w-4" {...register("combustible")} />
                      <Label htmlFor="combustible">Combustible</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input id="grua" type="checkbox" className="h-4 w-4" {...register("grua")} />
                      <Label htmlFor="grua">Grúa</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input id="operativaTerreno" type="checkbox" className="h-4 w-4" {...register("operativaTerreno")} />
                      <Label htmlFor="operativaTerreno">Operativa Terreno</Label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 col-span-2">
                    <div className="space-y-2">
                      <Label htmlFor="aceiteMotor">Aceite Motor</Label>
                      <Input id="aceiteMotor" type="number" min={0} {...register("aceiteMotor", { valueAsNumber: true })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aceiteTrans">Aceite Trans.</Label>
                      <Input id="aceiteTrans" type="number" min={0} {...register("aceiteTrans", { valueAsNumber: true })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aceiteDir">Aceite Dir.</Label>
                      <Input id="aceiteDir" type="number" min={0} {...register("aceiteDir", { valueAsNumber: true })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="refrigerante">Refrigerante</Label>
                      <Input id="refrigerante" type="number" min={0} {...register("refrigerante", { valueAsNumber: true })} />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="cierre" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Responsable</Label>
                    <Controller
                      control={control}
                      name="idEmpleadoResponsable"
                      render={({ field }) => (
                        <Select
                          value={field.value ? String(field.value) : ""}
                          onValueChange={(val) => field.onChange(Number(val))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar responsable" />
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
                    <Label>Responsable Cierre</Label>
                    <Controller
                      control={control}
                      name="idEmpleadoResponsableCierre"
                      render={({ field }) => (
                        <Select
                          value={field.value ? String(field.value) : ""}
                          onValueChange={(val) => field.onChange(Number(val))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar responsable cierre" />
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
                    <Label htmlFor="idIntranet">ID Intranet</Label>
                    <Input id="idIntranet" type="number" min={0} {...register("idIntranet", { valueAsNumber: true })} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-6">
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
