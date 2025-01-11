import { queryClient } from '@/utils/queryCilent';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
const API = 'http://localhost:3001/users';
const useUser = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: () => axios.get(API),
  });

  const { mutate: createUser } = useMutation({
    mutationKey: ['matution user'],
    mutationFn: (data) => axios.post(API, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const { mutate: updateUser } = useMutation({
    mutationKey: ['update user'],
    mutationFn: (data) => axios.put(`${API}/${data._id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const { mutate: deleteUser } = useMutation({
    mutationKey: ['delete user'],
    mutationFn: (id) => {
      return axios.delete(`${API}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return {
    userData: data?.data,
    isLoading,
    isError,
    createUser,
    updateUser,
    deleteUser,
  };
};

export default useUser;
