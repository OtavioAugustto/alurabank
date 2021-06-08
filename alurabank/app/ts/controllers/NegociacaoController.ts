class NegociacaoController {

    private _inputData: HTMLInputElement;
    private _inputQuantidade: HTMLInputElement;
    private _inputaValor: HTMLInputElement;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');

    constructor(){

        let $ = document.querySelector.bind(document);

        this._inputData = <HTMLInputElement>$('#data');
        this._inputQuantidade = <HTMLInputElement>$('#quantidade');
        this._inputaValor = <HTMLInputElement>$('#valor');    
        this._negociacoesView.update(this._negociacoes);  
    }

    adiciona(event: Event){
        
        event.preventDefault();

        const negociacao = new Negociacao(

            new Date(this._inputData.value.replace(/-/g, ',')),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputaValor.value),
        );

        this._negociacoes.adiciona(negociacao);
        
        this._negociacoesView.update(this._negociacoes);  
    }
}