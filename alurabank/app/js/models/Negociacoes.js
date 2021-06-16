System.register(["./Imprimivel"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Imprimivel_1, Negociacoes;
    return {
        setters: [
            function (Imprimivel_1_1) {
                Imprimivel_1 = Imprimivel_1_1;
            }
        ],
        execute: function () {
            Negociacoes = class Negociacoes extends Imprimivel_1.Imprimivel {
                constructor() {
                    super(...arguments);
                    this._negociacoes = [];
                }
                adiciona(negociacao) {
                    this._negociacoes.push(negociacao);
                }
                paraArray() {
                    return [].concat(this._negociacoes);
                }
                paraTexto() {
                    console.log(':: Impressão ::');
                    console.log(JSON.stringify(this._negociacoes));
                }
            };
            exports_1("Negociacoes", Negociacoes);
        }
    };
});
