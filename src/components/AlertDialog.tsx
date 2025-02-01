import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function AlertDialogModel({
  actionName,
  isDeleteOpen,
  onDeleteHandler,
  onHandleDeleteClose,
}: {
  actionName: string;
  isDeleteOpen: boolean;
  onDeleteHandler?: () => void;
  onHandleDeleteClose?: () => void;
}) {
  return (
    <AlertDialog open={isDeleteOpen} onOpenChange={onHandleDeleteClose}>
      <AlertDialogContent className="w-[96%] rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to {actionName}
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onHandleDeleteClose}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onDeleteHandler}>
            {actionName}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
