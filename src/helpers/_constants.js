export default {
  login_api: '/signin',
  signup_api: '/signup',
  logout_api: '/signout',
  get_products_api: '/public/products',
  create_products_api: '/public/products',
  apply_psw_reset_api: session => `/user/apply-password-reset/${session}`,
  create_order_api: '/users/orders',
  get_user_order_api: id => `/user/orders/${id}`,
  get_all_order_api: '/admin/orders',
  cart_api: id => `/cart/${id}`,
  my_profile_api: '/user/myprofile',
};
