export function throttle (miliSegundos: 500){

    return function(targert: any, propertyKey:string, descriptor: PropertyDescriptor){

        const metodoOriginal = descriptor.value;
        let timer = 0;
        descriptor.value = function(...args: any[]){
            if (event) event.preventDefault();
            clearInterval(timer);
            timer = setTimeout(() => metodoOriginal.apply(this, args), miliSegundos);
            
        }

        return descriptor;
    }

}