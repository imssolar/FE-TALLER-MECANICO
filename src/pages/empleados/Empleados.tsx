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
import { useEmpleados } from "@/hooks/empleado/useEmpleados";
import {
  CARGO_LABELS,
  LICENCIA_CONDUCIR_LABELS,
  TALLA_OPTIONS,
  ESTADO_CIVIL_LABELS,
  ESCOLARIDAD_LABELS,
  PARENTESCO_LABELS,
} from "@/types/empleado";
import type {
  CargoEmpleado,
  LicenciaConducir,
  Talla,
  EstadoCivil,
  Escolaridad,
  Parentesco,
} from "@/types/empleado";

export default function Empleados() {
  const {
    filteredEmpleados,
    isLoading,
    search,
    setSearch,
    dialogOpen,
    setDialogOpen,
    editingEmpleado,
    deleteId,
    setDeleteId,
    isSaving,
    form,
    openCreate,
    openEdit,
    closeDialog,
    onSubmit,
    confirmDelete,
  } = useEmpleados();

  const { register, handleSubmit, control, formState: { errors } } = form;

  return (
    <>
      <PageHeader
        title="Empleados"
        description="Gestión de empleados del taller"
        actions={
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Empleado
          </Button>
        }
      />

      <div className="mb-4">
        <Input
          placeholder="Buscar por nombre, RUT o cargo..."
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
              <TableHead>RUT</TableHead>
              <TableHead>Nombre Completo</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Fecha Ingreso</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-24">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : filteredEmpleados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No se encontraron empleados
                </TableCell>
              </TableRow>
            ) : (
              filteredEmpleados.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell className="font-medium">{emp.id}</TableCell>
                  <TableCell>{emp.rut}</TableCell>
                  <TableCell>{emp.nombreCompleto}</TableCell>
                  <TableCell>{CARGO_LABELS[emp.cargo] ?? emp.cargo}</TableCell>
                  <TableCell>{emp.telefono}</TableCell>
                  <TableCell>{emp.fechaIngreso}</TableCell>
                  <TableCell>
                    {emp.activo ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Activo
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Inactivo</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(emp)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(emp.id)}>
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingEmpleado ? "Editar Empleado" : "Nuevo Empleado"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Datos Personales */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Datos Personales</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rut">RUT *</Label>
                  <Input
                    id="rut"
                    placeholder="12345678-9"
                    {...register("rut", { required: "RUT requerido" })}
                    maxLength={12}
                  />
                  {errors.rut && <p className="text-sm text-destructive">{errors.rut.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nombres">Nombres *</Label>
                  <Input
                    id="nombres"
                    {...register("nombres", { required: "Nombres requeridos" })}
                    maxLength={30}
                  />
                  {errors.nombres && <p className="text-sm text-destructive">{errors.nombres.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellidoPaterno">Apellido Paterno *</Label>
                  <Input
                    id="apellidoPaterno"
                    {...register("apellidoPaterno", { required: "Apellido paterno requerido" })}
                    maxLength={20}
                  />
                  {errors.apellidoPaterno && <p className="text-sm text-destructive">{errors.apellidoPaterno.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellidoMaterno">Apellido Materno *</Label>
                  <Input
                    id="apellidoMaterno"
                    {...register("apellidoMaterno", { required: "Apellido materno requerido" })}
                    maxLength={20}
                  />
                  {errors.apellidoMaterno && <p className="text-sm text-destructive">{errors.apellidoMaterno.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaNacimiento">Fecha Nacimiento</Label>
                  <Input id="fechaNacimiento" type="date" {...register("fechaNacimiento")} />
                </div>
                <div className="space-y-2">
                  <Label>Estado Civil</Label>
                  <Controller
                    control={control}
                    name="estadoCivil"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(ESTADO_CIVIL_LABELS) as EstadoCivil[]).map((key) => (
                            <SelectItem key={key} value={key}>
                              {ESTADO_CIVIL_LABELS[key]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hijos">N° Hijos</Label>
                  <Input id="hijos" type="number" min={0} {...register("hijos", { valueAsNumber: true })} />
                </div>
                <div className="space-y-2">
                  <Label>Escolaridad</Label>
                  <Controller
                    control={control}
                    name="escolaridad"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(ESCOLARIDAD_LABELS) as Escolaridad[]).map((key) => (
                            <SelectItem key={key} value={key}>
                              {ESCOLARIDAD_LABELS[key]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Datos Laborales */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Datos Laborales</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cargo *</Label>
                  <Controller
                    control={control}
                    name="cargo"
                    rules={{ required: "Cargo requerido" }}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar cargo" />
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(CARGO_LABELS) as CargoEmpleado[]).map((key) => (
                            <SelectItem key={key} value={key}>
                              {CARGO_LABELS[key]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.cargo && <p className="text-sm text-destructive">{errors.cargo.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaIngreso">Fecha Ingreso *</Label>
                  <Input
                    id="fechaIngreso"
                    type="date"
                    {...register("fechaIngreso", { required: "Fecha de ingreso requerida" })}
                  />
                  {errors.fechaIngreso && <p className="text-sm text-destructive">{errors.fechaIngreso.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Licencia de Conducir</Label>
                  <Controller
                    control={control}
                    name="licenciaConducir"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar licencia" />
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(LICENCIA_CONDUCIR_LABELS) as LicenciaConducir[]).map((key) => (
                            <SelectItem key={key} value={key}>
                              {LICENCIA_CONDUCIR_LABELS[key]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaVencimientoLicencia">Venc. Licencia</Label>
                  <Input id="fechaVencimientoLicencia" type="date" {...register("fechaVencimientoLicencia")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="costo">Costo</Label>
                  <Input id="costo" type="number" min={0} step="0.01" {...register("costo", { valueAsNumber: true })} />
                </div>
              </div>
            </div>

            {/* Contacto */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Contacto</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" {...register("telefono")} maxLength={15} placeholder="+56912345678" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono2">Teléfono 2</Label>
                  <Input id="telefono2" {...register("telefono2")} maxLength={15} />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input id="direccion" {...register("direccion")} maxLength={50} />
                </div>
              </div>
            </div>

            {/* Vestuario */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Vestuario</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Talla</Label>
                  <Controller
                    control={control}
                    name="talla"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          {TALLA_OPTIONS.map((t: Talla) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calzado">Calzado</Label>
                  <Input id="calzado" type="number" min={0} {...register("calzado", { valueAsNumber: true })} />
                </div>
              </div>
            </div>

            {/* Contacto de Emergencia */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Contacto de Emergencia</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactoEmergencia">Nombre Contacto</Label>
                  <Input id="contactoEmergencia" {...register("contactoEmergencia")} maxLength={30} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fonoContactoEmergencia">Teléfono Contacto</Label>
                  <Input id="fonoContactoEmergencia" {...register("fonoContactoEmergencia")} maxLength={15} />
                </div>
                <div className="space-y-2">
                  <Label>Parentesco</Label>
                  <Controller
                    control={control}
                    name="parentesco"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(PARENTESCO_LABELS) as Parentesco[]).map((key) => (
                            <SelectItem key={key} value={key}>
                              {PARENTESCO_LABELS[key]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Observaciones */}
            <div className="space-y-2">
              <Label htmlFor="observaciones">Observaciones</Label>
              <Input id="observaciones" {...register("observaciones")} maxLength={500} />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Guardando..." : editingEmpleado ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Eliminar Empleado"
        description="¿Estás seguro de que deseas eliminar este empleado? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        onConfirm={confirmDelete}
      />
    </>
  );
}
