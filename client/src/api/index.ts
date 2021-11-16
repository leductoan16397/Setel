/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Auth, IOrder, Product, ProductOrder } from 'types';
import { AUTH_URL, ORDER_URL, PRODUCT_URL } from './path';

const authHeaders = (token: string): any => {
  return {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
};

export const signIn = async (email: string, password: string): Promise<Auth> => {
  try {
    console.log('AUTH_URL. ', AUTH_URL);
    const { data } = await axios.post<Auth>(`${AUTH_URL}/login`, { email, password });
    return data;
  } catch (error: any) {
    const { response } = error;
    throw response.data;
  }
};
export const signUp = async ({
  email,
  password,
  fullName,
}: {
  fullName: string;
  email: string;
  password: string;
}): Promise<any> => {
  try {
    const { data } = await axios.post(`${AUTH_URL}/sign-up`, { fullName, email, password });
    return data;
  } catch (error: any) {
    const { response } = error;
    throw response.data;
  }
};
export const signOut = async (accessToken: string, refreshToken: string): Promise<any> => {
  try {
    const { data } = await axios.post(
      `${AUTH_URL}/logout`,
      { refreshToken },
      authHeaders(accessToken)
    );
    return data;
  } catch (error: any) {
    const { response } = error;
    throw response.data;
  }
};
export const signOutAll = async (accessToken: string): Promise<any> => {
  try {
    const { data } = await axios.post(`${AUTH_URL}/logout-all`, {}, authHeaders(accessToken));
    return data;
  } catch (error: any) {
    const { response } = error;
    throw response.data;
  }
};
export const refreshToken = async (token: string): Promise<any> => {
  try {
    const { data } = await axios.post(`${AUTH_URL}/refresh-token`, { refreshToken: token });
    return data;
  } catch (error: any) {
    const { response } = error;
    throw response.data;
  }
};

export const createOrder = async (
  accessToken: string,
  { address, products }: { address: string; products: ProductOrder[] }
): Promise<any> => {
  try {
    const { data } = await axios.post(ORDER_URL, { address, products }, authHeaders(accessToken));
    return data;
  } catch (error: any) {
    const { response } = error;
    throw response.data;
  }
};

export const getAllOrder = async (accessToken: string): Promise<IOrder[]> => {
  try {
    const { data } = await axios.get<IOrder[]>(ORDER_URL, authHeaders(accessToken));
    return data;
  } catch (error: any) {
    const { response } = error;
    throw response.data;
  }
};

export const getOrderById = async (accessToken: string, id: string): Promise<any> => {
  try {
    const { data } = await axios.get(`${ORDER_URL}/${id}`, authHeaders(accessToken));
    return data;
  } catch (error: any) {
    const { response } = error;
    throw response.data;
  }
};
export const cancleOrder = async (accessToken: string, id: string): Promise<any> => {
  try {
    const { data } = await axios.patch(`${ORDER_URL}/${id}/cancle`, {}, authHeaders(accessToken));
    return data;
  } catch (error: any) {
    const { response } = error;
    throw response.data;
  }
};

export const getAllProduct = async (): Promise<Product[]> => {
  try {
    const { data } = await axios.get<Product[]>(PRODUCT_URL);
    return data;
  } catch (error: any) {
    const { response } = error;
    throw response.data;
  }
};

export const getProductById = async (accessToken: string, id: string): Promise<any> => {
  try {
    const { data } = await axios.get(`${PRODUCT_URL}/${id}`, authHeaders(accessToken));
    return data;
  } catch (error: any) {
    const { response } = error;
    throw response.data;
  }
};
