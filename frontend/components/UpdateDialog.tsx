import useUser from '@/pages/hooks/useUser';
import { Button, Dialog, DialogActions, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
interface TUpdateDialog {
  open: boolean;
  handleClose: () => void;
  selectedUser: { name: string; description: string };
}
const UpdateDialog = ({ open, handleClose, selectedUser }: TUpdateDialog) => {
  const { updateUser } = useUser();
  const formik = useFormik({
    initialValues: {
      ...selectedUser,
    },
    onSubmit: (values) => {
      updateUser(values);
      handleClose();
      formik.resetForm();
    },
  });

  useEffect(() => {
    formik.setValues({
      ...selectedUser,
    });
  }, [selectedUser]);

  return (
    <Dialog open={open} onClose={handleClose} sx={{ p: 2 }}>
      <TextField
        type="text"
        label="Name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      <TextField
        type="text"
        label="Description"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
      />
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" onClick={formik.handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateDialog;
