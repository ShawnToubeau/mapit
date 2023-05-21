import { type EventMap } from "@prisma/client";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  DialogContent,
  DialogOverlay,
  DialogTitle,
  IconButton,
} from "@src/components/simple/Dialog";
import { CreateForm, DeleteForm, UpdateForm } from "./MapForms";

export enum MapModalMode {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

type NewMap = {
  modalMode: MapModalMode.CREATE;
};

type ExistingMap = {
  modalMode: MapModalMode.UPDATE | MapModalMode.DELETE;
  map: EventMap;
};

export type ModalData = NewMap | ExistingMap | null;

function MapModalModeToString(modalMode: MapModalMode) {
  switch (modalMode) {
    case MapModalMode.CREATE:
      return "Create";
    case MapModalMode.UPDATE:
      return "Update";
    case MapModalMode.DELETE:
      return "Delete";
  }
}

interface CreateModalProps {
  data: ModalData;
  onClose: () => void;
}

export default function CreateModal(props: CreateModalProps) {
  function renderMapForm() {
    if (!props.data) {
      return null;
    }

    switch (props.data.modalMode) {
      case MapModalMode.CREATE:
        return <CreateForm onClose={props.onClose} />;
      case MapModalMode.UPDATE:
        return <UpdateForm map={props.data.map} onClose={props.onClose} />;
      case MapModalMode.DELETE:
        return <DeleteForm map={props.data.map} onClose={props.onClose} />;
    }
  }

  return (
    <div>
      <Dialog.Root open={!!props.data} onOpenChange={() => props.onClose()}>
        <Dialog.Portal>
          <DialogOverlay />
          <DialogContent>
            {props.data && (
              <DialogTitle>
                {MapModalModeToString(props.data.modalMode)} Map
              </DialogTitle>
            )}

            {renderMapForm()}

            <Dialog.Close asChild>
              <IconButton aria-label="Close">
                <Cross2Icon />
              </IconButton>
            </Dialog.Close>
          </DialogContent>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
