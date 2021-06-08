const controller = new NegociacaoController();

let $ = document.querySelector.bind(document);
$('.form').addEventListener('submit', controller.adiciona.bind(controller));