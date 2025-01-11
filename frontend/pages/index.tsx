import Head from 'next/head';
import useUser from './hooks/useUser';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import UpdateDialog from '@/components/UpdateDialog';

export default function Home() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { userData, isLoading, isError, createUser, deleteUser } = useUser();
  const formik = useFormik({
    initialValues: { name: '', description: '' },
    onSubmit: (values) => {
      createUser(values);
      formik.resetForm();
    },
  });

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <ul>
          {userData?.map((user) => (
            <li key={user.id}>
              {user.name}
              {user.description}
              <Button
                onClick={() => {
                  handleOpenDialog();
                  setSelectedUser(user);
                }}
              >
                Update
              </Button>
              <Button onClick={() => deleteUser(user._id)}>Delete</Button>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={formik.handleSubmit}>
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
        <Button type="submit">Submit</Button>
      </form>
      <UpdateDialog
        open={isOpenDialog}
        handleClose={handleCloseDialog}
        selectedUser={selectedUser}
      />
    </>
  );
}
