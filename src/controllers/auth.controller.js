export const login = (req, res) => {
  res.send("Iniciando sesión");
};

export const updateUser = (req, res) => {
  res.send("Modificando sesión");
};

export const signout = (req, res) => {
  res.send("Cerrando sesión");
};

export const signup = (req, res) => {
  res.send("Registrando nueva sesión");
};

export const profile = (req, res) => {
  res.send("Dashoard de usuario sesión");
};
