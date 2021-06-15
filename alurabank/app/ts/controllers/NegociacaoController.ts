import { MensagemView, NegociacoesView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoParcial } from '../models/NegociacaoParcial';


export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputaValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');


    constructor(){
        this._negociacoesView.update(this._negociacoes);  
    }

    @throttle(500)
    adiciona(){
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
        this._mensagemView.update('Negociação adicionada com sucesso!');
    }

    private _ehDiaUtil(data: Date){

        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;

    }

    @throttle(500)
    importaDados(){
        function isOK(res: Response) {

            if (res.ok) {
                return res;
            }else{
                throw new Error(res.statusText);
            }
            
        }

        fetch('http://localhost:8080/dados')
            .then(res => isOK(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) => {
                dados
                    .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
                    .forEach(negociacao => this._negociacoes.adiciona(negociacao))
                    this._negociacoesView.update(this._negociacoes);
            })
            .catch(err => console.log(err.message))
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