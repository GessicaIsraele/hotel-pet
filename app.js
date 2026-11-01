// Navegação do Hotel Pet (SPA com hash, sem bibliotecas).
// Cada rota aponta para um <template> do index.html e define o breadcrumb.
const rotas = {
  '/login':                       { tpl: 'tela-login',                       auth: true },
  '/criar-conta':                 { tpl: 'tela-criar-conta',                 auth: true },
  '/reservas':                    { tpl: 'tela-reservas',                    crumb: ['Reservas'] },
  '/reservas/nova':               { tpl: 'tela-reservas-nova',               crumb: ['Reservas', 'Nova reserva'] },
  '/reservas/ver':                { tpl: 'tela-reservas-ver',                crumb: ['Reservas', 'Ver reserva'] },
  '/reservas/editar':             { tpl: 'tela-reservas-editar',             crumb: ['Reservas', 'Editar reserva'] },
  '/reservas/editar-finalizada':  { tpl: 'tela-reservas-editar-finalizada',  crumb: ['Reservas', 'Editar reserva'] },
  '/pets':                        { tpl: 'tela-pets',                        crumb: ['Pets'] },
  '/pets/novo':                   { tpl: 'tela-pets-novo',                   crumb: ['Pets', 'Novo Pet'] },
  '/pets/ver':                    { tpl: 'tela-pets-ver',                    crumb: ['Pets', 'Ver pet'] },
  '/pets/editar':                 { tpl: 'tela-pets-editar',                 crumb: ['Pets', 'Editar Pet'] },
  '/usuarios':                    { tpl: 'tela-usuarios',                    crumb: ['Usuários'] },
  '/usuarios/novo':               { tpl: 'tela-usuarios-novo',               crumb: ['Usuários', 'Novo usuário'] },
  '/usuarios/editar':             { tpl: 'tela-usuarios-editar',             crumb: ['Usuários', 'Editar perfil'] },
  '/configuracoes':               { tpl: 'tela-configuracoes',               crumb: ['Configurações'] },
  '/perfil':                      { tpl: 'tela-perfil',                      crumb: ['Editar perfil'] },
};
const reservas = [
  {
    id: 1,
    pet: 'Max',
    proprietario: 'Ana Souza',
    status: 'Reservada',
    total: 40
  },
  {
    id: 2,
    pet: 'Ginger',
    proprietario: 'Bruno Lima',
    status: 'Em andamento',
    total: 40
  },
  {
    id: 3,
    pet: 'Max',
    proprietario: 'Carla Santos',
    status: 'Finalizada',
    total: 40
  }
];

const usuarios = [
  {
    id: 1,
    email: 'gessicaisraele@pet.com',
    nome: 'Géssica',
    sobrenome: 'Israele',
    funcao: 'Gerente'
  },
  {
    id: 2,
    email: 'maria@pet.com',
    nome: 'Maria',
    sobrenome: 'da Silva',
    funcao: 'Funcionário'
  }
];

let usuarioSelecionado = null;

let reservaSelecionada = null;

const app = document.getElementById('app');
const breadcrumb = document.getElementById('breadcrumb');

function navegar() {
  const caminho = location.hash.slice(1) || '/login';
  const rota = rotas[caminho] || { tpl: 'tela-404', crumb: ['Erro'] };

  app.replaceChildren(document.getElementById(rota.tpl).content.cloneNode(true));

  // Renderiza a lista de reservas
  if (caminho === '/reservas') {
    renderizarReservas();
  }

  if (caminho === '/usuarios') {
  renderizarUsuarios();
}

  // Carrega os dados da reserva selecionada
  if (
    caminho === '/reservas/editar' ||
    caminho === '/reservas/editar-finalizada'
  ) {
    const campoProprietario = document.getElementById('reserva-proprietario');
    const campoPet = document.getElementById('reserva-pet');
    const campoStatus = document.getElementById('reserva-status');

    if (reservaSelecionada) {
      campoProprietario.value = reservaSelecionada.proprietario;
      campoPet.value = reservaSelecionada.pet;
      campoStatus.value = reservaSelecionada.status;
    }
  }

  // Carrega os dados do usuário selecionado
  if (caminho === '/usuarios/editar') {
    const campoEmail = document.getElementById('usuario-email');
    const campoNome = document.getElementById('usuario-nome');
    const campoSobrenome = document.getElementById('usuario-sobrenome');
    const campoFuncao = document.getElementById('usuario-funcao');

    if (usuarioSelecionado) {
      campoEmail.value = usuarioSelecionado.email;
      campoNome.value = usuarioSelecionado.nome;
      campoSobrenome.value = usuarioSelecionado.sobrenome;
      campoFuncao.value = usuarioSelecionado.funcao;
    }
  }

  document.body.classList.toggle('sem-menu', !!rota.auth);
  breadcrumb.textContent = ['Home', ...(rota.crumb || [])].join(' / ');
  marcarMenuAtivo(caminho);
  window.scrollTo(0, 0);
}

function marcarMenuAtivo(caminho) {
  const secao = caminho.split('/')[1];
  document.querySelectorAll('[data-menu]').forEach(link => {
    link.classList.toggle('ativo', link.dataset.menu === secao);
  });
}

// Elementos com data-ir="#/rota" navegam ao clicar (simula "Salvar" sem backend)
// Evento de clique
document.addEventListener('click', (e) => {

  // Verifica o clique no botão Pesquisar
  if (e.target.id === 'pesquisar-reservas') {
    console.log('Botão Pesquisar reservas clicado!');
  }


 // Seleciona a reserva ou o usuário que será editado
if (e.target.matches('[data-id]')) {
  const idSelecionado = Number(e.target.dataset.id);

  if (e.target.getAttribute('href') === '#/usuarios/editar') {
    usuarioSelecionado = usuarios.find(
      (usuario) => usuario.id === idSelecionado
    );

    console.log('Usuário selecionado:', usuarioSelecionado);

    e.preventDefault();
    location.hash = '#/usuarios/editar';
    navegar();

  } else {
    reservaSelecionada = reservas.find(
      (reserva) => reserva.id === idSelecionado
    );

    console.log('Reserva selecionada:', reservaSelecionada);
  }
}

 // Salva as alterações da reserva
if (e.target.id === 'salvar-reserva') {

  if (!reservaSelecionada) {
    console.log('Nenhuma reserva foi selecionada.');
    return;
  }

  reservaSelecionada.proprietario =
    document.getElementById('reserva-proprietario').value;

  reservaSelecionada.pet =
    document.getElementById('reserva-pet').value;

  reservaSelecionada.status =
    document.getElementById('reserva-status').value;

  console.log('Reserva atualizada:', reservaSelecionada);

location.hash = '#/reservas';
}

// Salva as alterações do usuário
if (e.target.id === 'salvar-usuario') {
  if (!usuarioSelecionado) {
    console.log('Nenhum usuário foi selecionado.');
    return;
  }

  usuarioSelecionado.funcao =
    document.getElementById('usuario-funcao').value;

  console.log('Usuário atualizado:', usuarioSelecionado);

  location.hash = '#/usuarios';
}

});

function renderizarReservas() {
  console.log('FUNÇÃO RENDERIZAR RESERVAS EXECUTADA');
  const lista = app.querySelector('#lista-reservas');

  if (!lista) return;

  lista.innerHTML = '';

  console.log('Renderizando reservas:', reservas);

  console.log('Elemento encontrado:', lista);

  reservas.forEach((reserva) => {
    const linha = document.createElement('tr');

    linha.innerHTML = `
      <td><input type="checkbox" aria-label="Selecionar"></td>
      <td>${reserva.id}</td>
      <td>${reserva.pet}</td>
      <td>${reserva.proprietario}</td>
      <td>02/05/2021</td>
      <td>07/05/2021</td>
      <td>${reserva.status}</td>
      <td>R$ ${reserva.total.toFixed(2).replace('.', ',')}</td>
      <td>
        <a href="#/reservas/editar" data-id="${reserva.id}">Editar</a>
        <a href="#/reservas/ver">Visualizar</a>
      </td>
    `;

    lista.appendChild(linha);

    console.log('Linha adicionada:', linha.innerHTML);

   
  });

  console.log('CONTEÚDO FINAL DA TABELA:', lista.innerText);
}

function renderizarUsuarios() {
  const lista = app.querySelector('#lista-usuarios');

  if (!lista) return;

  lista.innerHTML = '';

  usuarios.forEach((usuario) => {
    const linha = document.createElement('tr');

    linha.innerHTML = `
      <td><input type="checkbox" aria-label="Selecionar"></td>
      <td><span class="avatar"></span></td>
      <td>${usuario.email}</td>
      <td>${usuario.nome} ${usuario.sobrenome}</td>
      <td>${usuario.funcao}</td>
      <td><span class="tag verde">Ativo</span></td>
      <td>19/02/2020</td>
      <td><a href="#/usuarios/editar" data-id="${usuario.id}">Editar</a></td>
    `;

    lista.appendChild(linha);
  });
}

// Evento de reset
document.addEventListener('reset', (e) => {
  const linhas = document.querySelectorAll('tbody tr');

  linhas.forEach((linha) => {
    linha.style.display = '';
  });
});

// Evento para acompanhar mudanças na rota
window.addEventListener('hashchange', navegar);

// Carrega a primeira tela ao abrir a aplicação
document.addEventListener('DOMContentLoaded', navegar);
