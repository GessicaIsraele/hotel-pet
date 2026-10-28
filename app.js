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

const app = document.getElementById('app');
const breadcrumb = document.getElementById('breadcrumb');

function navegar() {
  const caminho = location.hash.slice(1) || '/login';
  const rota = rotas[caminho] || { tpl: 'tela-404', crumb: ['Erro'] };

  app.replaceChildren(document.getElementById(rota.tpl).content.cloneNode(true));
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
document.addEventListener('click', (e) => {
  if (e.target.id === 'pesquisar-reservas') {
    const linhas = app.querySelectorAll('tbody tr');
    const idPesquisado = app.querySelector('#filtro-reserva-id').value.trim();
    const statusPesquisado = app.querySelector('#filtro-reserva-status').value;
    const petPesquisado = app
  .querySelector('#filtro-reserva-pet')
  .value.trim()
  .toLowerCase();
  const proprietarioPesquisado = app
  .querySelector('#filtro-reserva-proprietario')
  .value.trim()
  .toLowerCase();

    linhas.forEach((linha) => {
      const id = linha.cells[1].textContent.trim();
const status = linha.cells[5].textContent.trim();
const pet = linha.cells[2].textContent.trim().toLowerCase();
const proprietario = linha.cells[3].textContent.trim().toLowerCase();

 linha.hidden =
        (idPesquisado !== '' && id !== idPesquisado) ||
        (statusPesquisado !== '' && status !== statusPesquisado) ||
        (petPesquisado !== '' && !pet.includes(petPesquisado)) ||
        (proprietarioPesquisado !== '' && !proprietario.includes(proprietarioPesquisado));
    });
  }
});
  

window.addEventListener('hashchange', navegar);
window.addEventListener('DOMContentLoaded', navegar);
document.addEventListener('click', (e) => {
  if (e.target.id === 'pesquisar-reservas') {
    console.log('Botão Pesquisar reservas clicado!');
  }
});
document.addEventListener('reset', (e) => {
  if (e.target.matches('.filtro')) {
    const linhas = app.querySelectorAll('tbody tr');

    linhas.forEach((linha) => {
      linha.hidden = false;
    });
  }
});
