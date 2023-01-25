const passValuesCheck = (pass) => {
  //Regex para validar el password
  const regexPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  return regexPass.test(pass);
};

const emailValuesCheck = (email) => {
  //Regex para validar el Email sea YAHOO o GMAIL
  const regexPass = /.@gmail\.com$|.@yahoo\.com$/gm
  return regexPass.test(email);
};

export { passValuesCheck, emailValuesCheck };
