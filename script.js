class Calculatrice{

    constructor(precedent_text,maintenant_text){
        this.precedent_text=precedent_text;
        this.maintenant_text=maintenant_text;
        this.allclear();
    }

    allclear(){
        this.precedent="";
        this.maintenant="";
        this.operation=undefined;
    }

    choix_operation(operation){
        if(this.maintenant==""){  
            return;
            //pour empecher de mettre des signe d'opérations sans nombre avant
        }
        if(this.precedent!=""){   
            this.calcule();
            //pour enchainer les caluculations.
        }
        this.operation=operation;
        this.precedent=this.maintenant;  //liberer la place pour le deuxieme nombre
        this.maintenant="";  //liberer la place pour le deuxieme nombre
    }

    delete(){
        this.maintenant=this.maintenant.toString().slice(0,-1);

    }

    append_Number(nombre){
        if(nombre=="."&&this.maintenant.includes(".")){
            return "";
        }
        this.maintenant=this.maintenant.toString()+nombre.toString();//mettre chaque click de button dans un string

    }

    calcule(){
        let caculer;
        const nombre_precedent=parseFloat(this.precedent);//pour mettre le string en nombre

        const nombre_maintenant=parseFloat(this.maintenant);//pour mettre le string en nombre

        switch(this.operation){
            case "+":{caculer=nombre_precedent+nombre_maintenant;break;}

            case "-":{caculer=nombre_precedent-nombre_maintenant;break}

            case "x":{caculer=nombre_precedent*nombre_maintenant;break}

            case "÷":{caculer=nombre_precedent/nombre_maintenant;break}
            default:{return;}
        }
        this.maintenant=caculer;
        this.operation=undefined;
        this.precedent="";
    }

    modifier_nombre(nombre){
        const modif_nombre=parseFloat(nombre);
        if(isNaN(modif_nombre)){
            return "";
        }
        return modif_nombre.toLocaleString("fr");
    }

    update_display(){

        this.maintenant_text.innerText=this.modifier_nombre(this.maintenant);
        if(this.operation!=null){
            this.precedent_text.innerText=this.modifier_nombre(this.precedent)+this.operation;
        }else{
            this.precedent_text.innerText="";
        }
    }

}


const container=document.querySelector(".clavier");
container.style.setProperty('--numero-colone', 4);
container.style.setProperty('--numero-row', 5);
const clear_button=document.querySelector("[data-clear]")
const button_chiffre=document.querySelectorAll("[data-number]");
const button_operation=document.querySelectorAll("[data-operation]");
const precedent_text=document.querySelector("[data-previous]");
const maintenant_text=document.querySelector("[data-maintenant]");
const egal_button=document.querySelector("[data-egal]");
const supprimer_button=document.querySelector("[data-supprimer]");

const calculatrice= new Calculatrice(precedent_text,maintenant_text);

button_chiffre.forEach(button=>{
    button.addEventListener("click",()=>{
        calculatrice.append_Number(button.innerText);
        calculatrice.update_display();
    });
});

button_operation.forEach(button=>{
    button.addEventListener("click",()=>{
        calculatrice.choix_operation(button.innerText);
        calculatrice.update_display();
    });
});

egal_button.addEventListener("click",()=>{
    calculatrice.calcule();
    calculatrice.update_display();
});

clear_button.addEventListener("click",()=>{
    calculatrice.allclear();
    calculatrice.update_display();
});
supprimer_button.addEventListener("click",()=>{
    calculatrice.delete();
    calculatrice.update_display();
});

