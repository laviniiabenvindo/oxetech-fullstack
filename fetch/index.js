const cep = document.getElementById('cep-info');
const cepError = document.getElementById('cep-error');

const title = document.getElementById('title');
const body = document.getElementById('post-body');
async function BuscaCep() {
  try {
    await fetch('https://viacep.com.br/ws/01001000/json/') //API de consulta de CEP
      .then((response) => response.json()) // Transforma a resposta em um objeto JSON
      // Acessa os dados do CEP e exibe as informações
      .then((data) => {
        cep.innerHTML = `
      <p>CEP: ${data.cep}</p>
      <p>Logradouro: ${data.logradouro}</p>
      <p>Complemento: ${data.complemento}</p>
      <p>Bairro: ${data.bairro}</p>
      <p>Cidade: ${data.localidade}</p>
      <p>UF: ${data.uf}</p>`;
      })
      .catch((error) => {
        throw true;
      });
  } catch (error) {
    if (error == true) {
      cepError.innerHTML = `<p>CEP não encontrado</p>`;
    }
    console.error('Erro ao buscar o CEP:', error);
  }
}

async function GetPost() {
  // Faz uma requisição para a API de posts e exibe os títulos e corpos dos primeiros 5 posts
  await fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => {
      for (let i = 1; i <= 5; i++) {
        console.log(data[i].title);
        console.log(data[i].body);
        console.log(`https://jsonplaceholder.typicode.com/posts/${i}`);
        title.innerHTML += `
        <div class="flex flex-col m-10 text-center  items-center border-2 border-gray-300 rounded-lg p-4 gap-7">
          <h1 class="text-2xl id="title">${data[i].title}</h1>
          <p class=" text-sm text-justify id="post-body">${data[i].body}</p>
        </div>
        `;
      }
    });
}

BuscaCep();
GetPost();
