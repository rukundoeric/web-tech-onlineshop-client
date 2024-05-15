export default {
  login_api: '/signin',
  signup_api: '/signup',
  logout_api: '/logout',
  get_products_api: '/public/products',
  create_products_api: '/public/products',
  apply_psw_reset_api: session => `/user/apply-password-reset/${session}`,
  verify_user_api: session => `/user/activateuser/${session}`,
  cart_api: id => `/cart/${id}`,
  my_profile_api: '/user/myprofile',
};
