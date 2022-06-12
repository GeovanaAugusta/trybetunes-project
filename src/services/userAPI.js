const USER_KEY = 'user';
const TIMEOUT = 1500;
const SUCCESS_STATUS = 'OK';

const readUser = () => JSON.parse(localStorage.getItem(USER_KEY));
// Recupera o valor de user, acessando assim todos os dados armazenados no objeto do navegador
const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));
// Cria um novo par de key: value, armazena os valores após converter para strings, antes das informações do usuário serem gravadas, porque precisa para armazenar objetos (ou arrays)

// --------------------------------------------------------------------
// A função simulateRequest simula uma requisição para uma API externa
// Esse tipo de função que "chama outra função" é chamada de
// "currying function" https://javascript.info/currying-partials
// não se preocupe, estudaremos isso mais futuramente
// --------------------------------------------------------------------

const simulateRequest = (response) => (callback) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getUser = () => new Promise((resolve) => {
  let user = readUser();
  // console.log(user); // OK, um objeto com nome, email, imagem e descrição
  if (user === null) {
    user = {};
  }
  simulateRequest(user)(resolve);
});

export const createUser = (user) => new Promise((resolve) => {
  const emptyUser = {
    name: '',
    email: '',
    image: '',
    description: '',
  };
  // Agrega ao user {} essas propriedades que são transformadas em string e armazenadas pela saveUser e posteriormente resgatadas na readUser
  saveUser({ ...emptyUser, ...user });
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const updateUser = (updatedUser) => new Promise((resolve) => {
  saveUser({ ...updatedUser });
  simulateRequest(SUCCESS_STATUS)(resolve);
});
