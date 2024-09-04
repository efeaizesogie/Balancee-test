import React from "react";
import { Copy } from "lucide-react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toaster } from "./ui/toaster";

const DialogButton = ({
  action,
  dialogBtnClass,
  description,
  submitAction,
  disabled,
  onClick,
  children,
}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className={dialogBtnClass}>{action}</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{action}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}

          <DialogFooter className="sm:justify-between gap-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                className="hover:bg-sky-700"
                disabled={disabled}
                onClick={onClick}
              >
                {submitAction}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>

        <Toaster />
      </Dialog>
    </div>
  );
};

export default DialogButton;
