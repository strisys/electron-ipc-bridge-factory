const { ipc } = window['apis'];

const versionElem = document.getElementById('version');
const nameElem = document.getElementById('name');
const btnElem = document.getElementById('btn');

let count = 0;

btnElem.addEventListener('click', () => {
  ipc.send('count', ++count);
});

ipc.receive('app-info', (e, version, name) => {
  console.log(`app info received`, version, name);

  const versionText = `v${version}`;
  versionElem.innerText = versionText;
  document.title = `${document.title} ${versionText}`;

  nameElem.innerText = name;
});

export {};