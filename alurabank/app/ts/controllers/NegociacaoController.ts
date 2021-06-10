import { MensagemView, NegociacoesView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';


export class NegociacaoController {

    private _inputData: JQuery;
    private _inputQuantidade: JQuery;
    private _inputaValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');


    constructor(){

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputaValor = $('#valor');    
        this._negociacoesView.update(this._negociacoes);  
    }

    adiciona(event: Event){
        
        event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ','))

        if (!this._ehDiaUtil(data)) {
            this._mensagemView.update('Faça Somente negocioações em dia úteis por favor!');
            return
        }

        const negociacao = new Negociacao(

            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputaValor.val()),
        );

        this._negociacoes.adiciona(negociacao);
        
        this._negociacoesView.update(this._negociacoes);  
        this._mensagemView.update('Negociação adicionada com sucesso!')
    }

    private _ehDiaUtil(data: Date){

        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;

    }
}

enum DiaDaSemana {
    
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}