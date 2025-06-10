"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";

import { Plus, X } from "phosphor-react";
import {
  ComponentPropsWithoutRef,
  ComponentRef,
  DetailedHTMLProps,
  forwardRef,
} from "react";
import { Button } from "../button";
import styles from "./dialog.module.css";

const DialogRoot = DialogPrimitive.Root;

const DialogPortal = DialogPrimitive.Portal;

const DialogTrigger = forwardRef<
  ComponentRef<typeof DialogPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>
>(({ className, ...rest }, forwardedRef) => (
  <DialogPrimitive.Trigger
    ref={forwardedRef}
    className={`${!rest.asChild && styles.trigger} ${className}`}
    {...rest}
  >
    {rest.children || <Plus size={16} />}
  </DialogPrimitive.Trigger>
));
DialogTrigger.displayName = "DialogTrigger";

const DialogOverlay = forwardRef<
  ComponentRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...rest }, forwardedRef) => (
  <DialogPrimitive.Overlay
    ref={forwardedRef}
    className={`${styles.overlay} ${className}`}
    {...rest}
  />
));
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    width?: string | number;
  }
>(({ className, onClick, width, ...rest }, forwardedRef) => (
  <Dialog.Portal>
    <Dialog.Overlay />
    <DialogPrimitive.Content
      ref={forwardedRef}
      onClick={(e: any) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      className={`${styles.content} ${className}`}
      style={width ? { width } : {}}
      {...rest}
    />
  </Dialog.Portal>
));
DialogContent.displayName = "DialogContent";

const DialogTitle = forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...rest }, forwardedRef) => (
  <DialogPrimitive.Title
    ref={forwardedRef}
    className={`${styles.title} ${className}`}
    {...rest}
  />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = forwardRef<
  ComponentRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...rest }, forwardedRef) => (
  <DialogPrimitive.Description
    ref={forwardedRef}
    className={`${styles.description} ${className}`}
    {...rest}
  />
));
DialogDescription.displayName = "DialogDescription";

const DialogActions = forwardRef<
  HTMLDivElement,
  DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>(({ className, ...rest }, forwardedRef) => (
  <div
    ref={forwardedRef}
    className={`${styles.actions} ${className}`}
    {...rest}
  />
));
DialogActions.displayName = "DialogActions";

const DialogClose = forwardRef<
  ComponentRef<typeof DialogPrimitive.Close>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ className, ...rest }, forwardedRef) =>
  rest.children ? (
    rest.asChild ? (
      <DialogPrimitive.Close
        ref={forwardedRef}
        className={className}
        {...rest}
      />
    ) : (
      <DialogPrimitive.Close
        ref={forwardedRef}
        className={`${styles.close} ${styles.close_button} ${className}`}
        {...rest}
      />
    )
  ) : (
    <DialogPrimitive.Close
      ref={forwardedRef}
      className={`${styles.close} ${styles.close_x} ${className}`}
      {...rest}
    >
      <X size={16} />
    </DialogPrimitive.Close>
  )
);
DialogClose.displayName = "DialogClose";

export const ExampleDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Open Modal</Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Close />
        <Dialog.Title>Novo</Dialog.Title>
        <Dialog.Description>Testes</Dialog.Description>
        <Dialog.Actions>
          <Dialog.Close asChild>
            <Button variant="tertiary">Cancelar</Button>
          </Dialog.Close>
          <Button>Adicionar</Button>
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export const Dialog = {
  Root: DialogRoot,
  Portal: DialogPortal,
  Trigger: DialogTrigger,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Actions: DialogActions,
  Close: DialogClose,
};
