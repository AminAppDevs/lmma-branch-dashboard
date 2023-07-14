import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";

const EditStoreDialog = (props: any) => {
  return (
    <Dialog>
      <DialogTrigger className="text-green-color underline text-[15px]">
        تعديل
      </DialogTrigger>
      <DialogContent className="shadow-none">
        <DialogHeader>
          <DialogTitle className="text-center">{props.text}</DialogTitle>
        </DialogHeader>
        {props.children}
      </DialogContent>
    </Dialog>
  );
};

export default EditStoreDialog;
