import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SessionModalProps {
  isOpen: boolean;
  remainingSeconds: number;
  onRefreshToken: () => void;
  onLogout: () => void;
}

export function SessionModal({
  isOpen,
  remainingSeconds,
  onRefreshToken,
  onLogout,
}: SessionModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Sesión por expirar</DialogTitle>
          <DialogDescription>
            Tu sesión expirará en{" "}
            <span className="font-bold text-destructive">
              {Math.max(0, remainingSeconds)}s
            </span>
            . ¿Deseas extenderla?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onLogout}>
            Cerrar sesión
          </Button>
          <Button onClick={onRefreshToken}>Extender sesión</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
