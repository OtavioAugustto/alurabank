import { MensagemView, NegociacoesView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService } from '../services/index';
import { imprime } from '../helpers/index';


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
    private _service = new NegociacaoService();



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
        imprime(negociacao, this._negociacoes);
        this._negociacoesView.update(this._negociacoes);  
        this._mensagemView.update('Negociação adicionada com sucesso!');
    }

    private _ehDiaUtil(data: Date){

        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;

    }

    @throttle(500)
    importaDados(){
        
        this._service
            .obterNegociacoes(res => {
                if (res.ok) {
                    return res;
                }else{
                    throw new Error(res.statusText);
                }
            })
            .then(negociacoesParaImportar => {

                const negociacoesJaImportadas = this._negociacoes.paraArray();

                negociacoesParaImportar
                    .filter(negociacao => 
                        !negociacoesJaImportadas.some(jaImportada => 
                            negociacao.ehIgual(jaImportada)))
                    .forEach(negociacao => 
                    this._negociacoes.adiciona(negociacao));

                this._negociacoesView.update(this._negociacoes);
                this._mensagemView.update('Negociacoes importadas com sucesso!');
        })
        .catch(err =>{
            this._mensagemView.update(err.message);
        });
      
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