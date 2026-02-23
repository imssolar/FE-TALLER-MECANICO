import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { busService } from "@/services/bus.service";
import type { Bus, CreateBusDto, UpdateBusDto } from "@/types/bus";
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
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface BusFormValues {
  idBus: number;
  idTerminal: number;
  idModelo: number;
  patenteB: string;
  marcaB: string;
  motorB: string;
  anioFabB: number | undefined;
  transmisionB: string;
  kmB: number | undefined;
  zonaB: string;
  nroNeumaticosB: number | undefined;
  nroBaterias: number | undefined;
}

export default function Buses() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingBus, setEditingBus] = useState<Bus | null>(null);
  const [search, setSearch] = useState("");

  const { data: buses = [], isLoading } = useQuery({
    queryKey: ["buses"],
    queryFn: busService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateBusDto) => busService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buses"] });
      toast.success("Bus creado correctamente");
      closeDialog();
    },
    onError: () => toast.error("Error al crear el bus"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBusDto }) =>
      busService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buses"] });
      toast.success("Bus actualizado correctamente");
      closeDialog();
    },
    onError: () => toast.error("Error al actualizar el bus"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => busService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buses"] });
      toast.success("Bus eliminado correctamente");
    },
    onError: () => toast.error("Error al eliminar el bus"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BusFormValues>();

  const openCreate = () => {
    setEditingBus(null);
    reset({
      idBus: undefined as unknown as number,
      idTerminal: undefined as unknown as number,
      idModelo: undefined as unknown as number,
      patenteB: "",
      marcaB: "",
      motorB: "",
      anioFabB: undefined,
      transmisionB: "",
      kmB: 0,
      zonaB: "",
      nroNeumaticosB: 0,
      nroBaterias: 0,
    });
    setDialogOpen(true);
  };

  const openEdit = (bus: Bus) => {
    setEditingBus(bus);
    reset({
      idBus: bus.idBus,
      idTerminal: bus.terminal?.idTerminal,
      idModelo: bus.modelo?.idModelo,
      patenteB: bus.patenteB ?? "",
      marcaB: bus.marcaB ?? "",
      motorB: bus.motorB ?? "",
      anioFabB: bus.anioFabB,
      transmisionB: bus.transmisionB ?? "",
      kmB: bus.kmB ?? 0,
      zonaB: bus.zonaB ?? "",
      nroNeumaticosB: bus.nroNeumaticosB ?? 0,
      nroBaterias: bus.nroBaterias ?? 0,
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingBus(null);
    reset();
  };

  const onSubmit = (data: BusFormValues) => {
    if (editingBus) {
      const { idBus: _id, ...updateData } = data;
      updateMutation.mutate({ id: editingBus.idBus, data: updateData });
    } else {
      createMutation.mutate(data as CreateBusDto);
    }
  };

  const filteredBuses = buses.filter(
    (bus) =>
      bus.patenteB?.toLowerCase().includes(search.toLowerCase()) ||
      bus.marcaB?.toLowerCase().includes(search.toLowerCase()) ||
      String(bus.idBus).includes(search)
  );

  const isSaving = createMutation.isPending || updateMutation.isPending;

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

      <div className="rounded-md border">
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
                  <TableCell>{bus.terminal?.nombreT}</TableCell>
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

      {/* Create/Edit Dialog */}
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
                <Label htmlFor="idTerminal">ID Terminal *</Label>
                <Input
                  id="idTerminal"
                  type="number"
                  {...register("idTerminal", { required: "Terminal requerido", valueAsNumber: true })}
                />
                {errors.idTerminal && (
                  <p className="text-sm text-destructive">{errors.idTerminal.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="idModelo">ID Modelo *</Label>
                <Input
                  id="idModelo"
                  type="number"
                  {...register("idModelo", { required: "Modelo requerido", valueAsNumber: true })}
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

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Eliminar Bus"
        description="¿Estás seguro de que deseas eliminar este bus? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        onConfirm={() => {
          if (deleteId !== null) {
            deleteMutation.mutate(deleteId);
            setDeleteId(null);
          }
        }}
      />
    </>
  );
}
