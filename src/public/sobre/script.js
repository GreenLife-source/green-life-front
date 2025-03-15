async function buscarDados(tipo) {
  try {
    const resposta = await fetch(`/dados-api/${tipo}`); // Chama a rota do backend
    const dados = await resposta.json();

    // Depois de pegar os dados, exibe eles
    // (Você não precisa exibir, pode fazer outras coisas)
    // document.getElementById("resultado").innerText = JSON.stringify(
    //   dados,
    //   null,
    //   2
    // );

    if (typeof dados[0] === "undefined") {
      // Se chegar dentro desse if, ele vai ignorar tudo e vai pro catch
      // O método de verificação não é recomendado para detectar erro
      throw new Error(dados[erro]);
    }
    limpar();

    document.getElementById("resultado").style.display = "block";
    if (tipo === "users") exibirUsuarios(dados);
    if (tipo === "products") exibirProdutos(dados);
  } catch (erro) {
    // Se entrar aqui, ou o usuário ta sem internet
    // ou o servidor do frontend ou do backend caiu
    console.error("Erro ao buscar dados:", erro.message);
  }
}

function exibirUsuarios(usuarios) {
  const usuariosDiv = document.getElementById("usuarios");
  const template = document.getElementById("usuario-template");

  usuarios.forEach((usuario) => {
    // Clonar o template
    const clone = template.content.cloneNode(true);

    const link = usuario.website.startsWith("http")
      ? usuario.website
      : `https://${usuario.website}`;

    // Preencher os dados
    clone.querySelector(".nome").textContent = usuario.name;
    clone.querySelector(".website").textContent = link;
    clone.querySelector(".website").href = link;

    // Adicionar ao DOM
    usuariosDiv.appendChild(clone);
  });
}

function exibirProdutos(produtos) {
  const produtosDiv = document.getElementById("produtos");
  const template = document.getElementById("produto-template");

  const man = document.createElement("div");
  man.classList.add("man");
  const woman = document.createElement("div");
  woman.classList.add("woman");
  const tech = document.createElement("div");
  tech.classList.add("tech");
  const jewelery = document.createElement("div");
  jewelery.classList.add("jewlery");

  const listaMan = document.createElement("div");
  listaMan.classList.add("lista-produtos");
  const listaWoman = document.createElement("div");
  listaWoman.classList.add("lista-produtos");
  const listaTech = document.createElement("div");
  listaTech.classList.add("lista-produtos");
  const listaJewelery = document.createElement("div");
  listaJewelery.classList.add("lista-produtos");

  produtos.forEach((produto) => {
    const clone = template.content.cloneNode(true);

    let preco = "R$ ".concat(produto.price.toString().replace(".", ","));
    preco = preco.includes(",") ? preco : preco.concat(",00");
    if (preco.split(",")[1].length < 2) preco = preco.concat("0");

    clone.querySelector(".nome").textContent = produto.title;
    clone.querySelector(".preco").textContent = preco;
    clone.querySelector(
      ".foto-produto"
    ).style.backgroundImage = `url("${produto.image}")`;

    switch (produto["category"]) {
      case "men's clothing":
        listaMan.appendChild(clone);
        break;
      case "women's clothing":
        listaWoman.appendChild(clone);
        break;
      case "electronics":
        listaTech.appendChild(clone);
        break;
      case "jewelery":
        listaJewelery.appendChild(clone);
        break;
    }
  });

  const manText = document.createElement("h1");
  manText.innerText = "Roupas masculinas";
  const womanText = document.createElement("h1");
  womanText.innerText = "Roupas femininas";
  const techText = document.createElement("h1");
  techText.innerText = "Eletrônicos";
  const jeweleryText = document.createElement("h1");
  jeweleryText.innerText = "Joias";

  man.appendChild(manText);
  woman.appendChild(womanText);
  tech.appendChild(techText);
  jewelery.appendChild(jeweleryText);

  man.appendChild(listaMan);
  woman.appendChild(listaWoman);
  tech.appendChild(listaTech);
  jewelery.appendChild(listaJewelery);

  produtosDiv.appendChild(man);
  produtosDiv.appendChild(woman);
  produtosDiv.appendChild(tech);
  produtosDiv.appendChild(jewelery);
}
