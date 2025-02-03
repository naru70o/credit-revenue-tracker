import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import UpdateRevenueForm from "./updateRevenueForm";

interface Revenue {
  amount: number;
  date: string; // Assuming date is in the format "DD/MMM/YYYY"
  _id: string;
}

export const UpdateRevenueModel = ({
  toggleDialog,
  currentRevenue,
  onHandleClose,
}: {
  toggleDialog: boolean;
  currentRevenue: Revenue;
  onHandleClose: () => void;
}) => {
  return (
    <Dialog open={toggleDialog} onOpenChange={onHandleClose}>
      <DialogContent className="sm:max-w-[425px] rounded-xl w-[90%]">
        <DialogHeader>
          <DialogTitle>Update Customer</DialogTitle>
          <DialogDescription>Please put the Amount and date.</DialogDescription>
        </DialogHeader>
        <UpdateRevenueForm
          currentRevenue={currentRevenue}
          onHandleClose={onHandleClose}
        />
      </DialogContent>
    </Dialog>
  );
};
