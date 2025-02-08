import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import UpdateCustomerForm from "./updateCustomer";

interface Customer {
  _id: string;
  name: string;
  phoneNumber: string;
}

export const UpdateCustomerModel = ({
  toggleDialog,
  currentCustomer,
  onhandleClose,
}: {
  toggleDialog: boolean;
  currentCustomer: Customer | null;
  onhandleClose: () => void;
}) => {
  return (
    <Dialog open={toggleDialog} onOpenChange={onhandleClose}>
      <DialogContent className="sm:max-w-[425px] rounded-xl w-[90%]">
        <DialogHeader>
          <DialogTitle>Update Customer</DialogTitle>
          <DialogDescription>
            Please put the users name and number.
          </DialogDescription>
        </DialogHeader>
        <UpdateCustomerForm
          currentCustomer={currentCustomer}
          handleCloseDialog={onhandleClose}
        />
      </DialogContent>
    </Dialog>
  );
};
