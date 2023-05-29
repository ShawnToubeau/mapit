import { type EventMap } from "@prisma/client";
import * as Form from "@radix-ui/react-form";
import { DialogDescription } from "@src/components/simple/Dialog";
import {
  Button,
  FormField,
  FormLabel,
  FormMessage,
  FormRoot,
  Input,
} from "@src/components/simple/Form";
import { api } from "@src/utils/api";
import { z } from "zod";

interface MapFormProps {
  userId: string;
  onClose: () => void;
}

export function CreateForm(props: MapFormProps) {
  const ctx = api.useContext();
  const createMutation = api.mapRouter.create.useMutation();

  return (
    <div>
      <FormRoot
        className="flex w-full flex-col"
        onSubmit={(event) => {
          event.preventDefault();
          const schema = z.object({
            name: z.string(),
          });
          const res = schema.safeParse(
            Object.fromEntries(new FormData(event.currentTarget))
          );

          if (res.success) {
            createMutation
              .mutateAsync({
                ownerId: props.userId,
                name: res.data.name,
              })
              .then(async () => {
                // re-fetch maps
                await ctx.mapRouter.getByOwnerId.invalidate({
                  id: props.userId,
                });
                props.onClose();
              })
              .catch((error) => {
                console.error("error creating map", error);
              });
          } else {
            console.error("cannot parse form values", res.error);
          }
        }}
      >
        <FormField name="name">
          <div className="flex items-center justify-between">
            <FormLabel variant="required">Name</FormLabel>
            <FormMessage match="valueMissing">
              Please enter a map name
            </FormMessage>
          </div>
          <Form.Control asChild>
            <Input required className="w-3/4" />
          </Form.Control>
        </FormField>

        <Form.Submit asChild>
          <Button className="mx-auto mt-1 w-60">Create</Button>
        </Form.Submit>
      </FormRoot>
    </div>
  );
}

export function UpdateForm(props: MapFormProps & { map: EventMap }) {
  const ctx = api.useContext();
  const updateMutation = api.mapRouter.updateById.useMutation();

  return (
    <div>
      <FormRoot
        className="flex w-full flex-col"
        onSubmit={(event) => {
          event.preventDefault();
          const schema = z.object({
            name: z.string(),
          });
          const res = schema.safeParse(
            Object.fromEntries(new FormData(event.currentTarget))
          );

          if (res.success) {
            updateMutation
              .mutateAsync({
                id: props.map.id,
                name: res.data.name,
              })
              .then(async () => {
                // re-fetch maps
                await ctx.mapRouter.getByOwnerId.invalidate({
                  id: props.userId,
                });
                props.onClose();
              })
              .catch((error) => {
                console.error("error updating map", error);
              });
          } else {
            console.error("cannot parse form values", res.error);
          }
        }}
      >
        <FormField name="name">
          <div className="flex items-center justify-between">
            <FormLabel variant="required">Name</FormLabel>
            <FormMessage match="valueMissing">
              Please enter a map name
            </FormMessage>
          </div>
          <Form.Control asChild>
            <Input required className="w-3/4" defaultValue={props.map.name} />
          </Form.Control>
        </FormField>

        <Form.Submit asChild>
          <Button className="mx-auto mt-1 w-60">Update</Button>
        </Form.Submit>
      </FormRoot>
    </div>
  );
}

export function DeleteForm(props: MapFormProps & { map: EventMap }) {
  const ctx = api.useContext();
  const deleteMutation = api.mapRouter.deleteById.useMutation();

  return (
    <div>
      <DialogDescription>
        <div>Are you sure you wish to delete this map?</div>
        <span className="font-bold text-black">({props.map.name})</span>
      </DialogDescription>

      <FormRoot
        className="flex w-full"
        onSubmit={(event) => {
          event.preventDefault();
          deleteMutation
            .mutateAsync({
              id: props.map.id,
            })
            .then(async () => {
              // re-fetch maps
              await ctx.mapRouter.getByOwnerId.invalidate({
                id: props.userId,
              });
              props.onClose();
            })
            .catch((error) => {
              console.error("error deleting map", error);
            });
        }}
      >
        <Form.Submit asChild>
          <Button className="mx-auto mt-1 w-60">Delete</Button>
        </Form.Submit>
      </FormRoot>
    </div>
  );
}
