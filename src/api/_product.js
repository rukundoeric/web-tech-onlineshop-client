import axios from './_axios';
import { Constants } from '../helpers';

const {
  get_products_api,
  create_products_api
} = Constants;

export const getProducts = async (callback) => {
  try {
    const { data } = await axios.get(get_products_api);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};


export const createProducts = async (product, callback) => {
  try {
    const { data } = await axios.post(create_products_api, product);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};
