
function direita(elemento){
  $(elemento).animate(
    {
      left: "+=750"
    }, 500, function(){
      esquerda(elemento)
    }
  )
}

function esquerda(elemento){
  $(elemento).animate(
    {
      left: "-=750"
    }, 500, function(){
      direita(elemento)
    }
  )
}

function emcima(elemento){
  $(elemento).animate(
    {
      top: "-=400"
    }, 500, function(){
      baixo(elemento)
    }
  )
}

function baixo(elemento){
  $(elemento).animate(
    {
      top: "+=400"
    }, 500, function(){
      emcima(elemento)
    }
  )
}


$(function(){
  var vezesPressionada=0;
  var posHorizontal;
  var posVertical;
  $(document).on("keypress",function(e){

    if (e.which==32) {
      e.preventDefault();
      vezesPressionada++;
      if (vezesPressionada==1) {
        direita($("#fHorizontal"));
      }else if (vezesPressionada==2) {
        $("#fHorizontal").stop();
        emcima($("#fVertical"));
      }else if (vezesPressionada==3) {
        $("#fVertical").stop();
        posHorizontal = $("#fHorizontal").css("left");
        posVertical = $("#fVertical").css("top");
      }
    }
  })

  $("#bola").on("click", function(){
    $(this)
    .animate(
      {
        top: posVertical,
        left: posHorizontal
      },600)
      .animate(
          {
            width: "-=70"
          },
          {
            step: function(now){
              $(this).css("transform","rotate("+now*10+"deg)")
            },
            queue: false,
            duration: 1200
          }
        )
      .delay(1000)
      .animate(
        {
          top: "400px"
        }, 1000
      )

  });




});


// Variável que determina a dificuldade do jogo, quanto menor for o resultado mais difícil é.
var Dificuldade = 500; (milisegundos)
/*certo, o segundo parametro dele é a velocidade da animação

então ele definiu essa variavel chamada dificuldade para que o goleiro se mova mais rapido

então quanto maior é a dificuldade, maior é a velocidade de ação do goleiro, e mais dificil vai ser fazer um gol*/
//----------------------ANIMAÇÃO FLECHAS----------------------//

//Animação que move unmelemento para a direita
function direita(elemento, movimento, velocidade){
  $(elemento).animate(
    {
      left: "+="+movimento             // += indica que vai somar a posição esquerda um valor o movimento é uma variavel numerica que indica um acelerador ,tipo um carro//                              então vamos somar a esquerda o valor que o acelerador colocou de velocidade
                                  
    }, velocidade, function(){
      esquerda(elemento, movimento, velocidade)
    }
  )
}
/*quando vc coloca um "+="
ele indica que vai somar a posição esquerda o um valor
então quando vc colocar "+=" + moviemnto
Ricardo Zorzal 18:32
o movimento é uma variavel numerica que indica um acelerador
então vamos somar a esquerda o valor que o acelerador colocou de velocidade
tipo um carro
quando vc pisa no acelerador vc aumenta a velocidade aos poucos
neste caso aqui vc aumenta a velocidade usando o "+="
entendeu ? */




//Animação que move um elemento para a esquerda
function esquerda(elemento, movimento, velocidade){
  $(elemento).animate(
    {
      left: "-="+movimento
    }, velocidade, function(){
      direita(elemento, movimento, velocidade)
    }
  )
}
/*( velocidade esuerdqqe direita pq no documento a posição top:0 e left: 0 é o primeiro pixel do monitor
então segue a mesma lógica
se eu incremento a minha esquerda, é o mesmo que eu estiver antando da esquerda para a direita
se eu decremento meu o meu left eu to andando da direita para a esquerda */



//Animação que move um elemento para cima


function emcima(elemento){
  $(elemento).animate(
    {
      top: "-=400"
    }, Dificuldade, function(){
      baixo(elemento)
    }
  )
}

//Animação que move um elemento para baixo
function baixo(elemento){
  $(elemento).animate(
    {
      top: "+=400"
    }, Dificuldade, function(){
      emcima(elemento)
    }
  )
}

//-----------------------------------------------------------------//


//Animação que move a bola de futebol
function shoot(elemento, posV, posH){
  $(elemento)
  .animate(
    {
      top: posV,
      left: posH
    },{
      queue: false
    },800)
  .animate(
    {
      width: "-=70"
    },
    {
      step: function(now, fx){
        $(elemento).css("transform","rotate("+now*10+"deg)");
      },
      queue: false,
      duration: 800,
      complete: function(){

        var x= parseFloat(posH);/*o parseFloat é para transformar uma string em um número decimal*/
        var y= parseFloat(posV);/*para que neste caso ele quer transformar uma string em decimal?
                                 Ricardo Zorzal 18:14
                                 para garantir que elas serão do tipo numerico
                                  pode ser que ela venha uma string e vc quer fazer algum calculo, então fazer esse parse antes é bem visto
                                 não necessariamente vc precisa fazer
                                 mas é bom fazer, entende ?*/
        var centro = parseFloat($("#goleiro").css("left"))+235;/*é o numero de pixels que ele se distancionou do elemento de id goleiro
                                                               basicamente seria para saber se a bola bateu no goleiro (dentro do if la em baixo, ele verifica)
                                                               */
        //Validações caso a bola bata nas traves
          if ((x>=979&&x<=1009)&&(y>=88)) {
            rebote(elemento,"direita");
          }else if ((y<=88&&y>=50)&&(x>=450)) {
            rebote(elemento, "emcima");
          }else if ((x>=454&&x<=486)&&(y>=88)) {
            rebote(elemento, "esquerda");
          }else if ((x<454||x>1009)||(y<55||y>409)) { //Validação caso a bola for para fora
            rebote(elemento, "longe");
          }else if(((x>(centro-55))&&(x<(centro+23)))&&(y>154&&y<236)){ //Validaciones si pega en el arquero
            rebote(elemento, "emcima");
          }else if(((x>(centro-128))&&(x<(centro+95)))&&(y>280&&y<362)){
            rebote(elemento, "emcima");
          }else if(((x>(centro-185))&&(x<(centro+143)))&&(y>226&&y<280)){
            rebote(elemento, "emcima");
          }else if(((x>(centro-122))&&(x<(centro-88)))&&(y>362&&y<432)){
            rebote(elemento, "esquerda");
          }else if (((x>(centro+63))&&(x<(centro+97)))&&(y>362&&y<432)) {
            rebote(elemento, "direita");
          }else{
            $(elemento).css("zIndex","3"); //Se não acontecer nada dito anteriormente é indicado que o gol foi marcado
            $("#goleiro").css("zIndex","4");
            golScored(elemento);
          }

      }
    }
  )

}

//Animação para quando o gol é marcado
function golScored(elemento){
  $(elemento)
    .animate(
      {
        top: "400px",
      },{
        step: function(now, fx){
          $(this).css("transform","rotate("+now*2+"deg)")
        },
        duration: 1000,
        complete: function() {
          $("h1").fadeIn(1000, function(){
            $(this)
              .css("color","green")
          })
        }
      }
    )

}

//Animação para quando houver falha na hora de cobrar o gol
function rebote(elemento, direcao){
  if (direcao=="esquerda") {
    $(elemento)
      .css("zIndex","4")
      .animate(
        {
          top: "380px",
          left: "-50px"
        },{
          step: function(now, fx){
            $(elemento).css("transform","rotate("+now*2+"deg)");
          },
          duration: 500
        }
      )
  }else if (direcao=="emcima") {
    $(elemento)
      .css("zIndex","4")
      .animate(
        {
          top: "-50px"
        },{
          step: function(now, fx){
            $(elemento).css("transform","rotate("+now*2+"deg)");
          },
          duration: 500
        }
      )
  }else if (direcao=="direita") {
    $(elemento)
      .css("zIndex","4")/*é o valor do eixo z
em matematica nós não temos dimensões ?
x,y,z
x largura, y altura e z profundidade
então vc pode colocar um ponto nas coordenadas (2,3,4)2 na largura, 3 na altura e 4 na profundidade */
      .animate(
        {
          top: "380px",
          left: "1600px"
        },{
          step: function(now, fx){
            $(elemento).css("transform","rotate("+now*2+"deg)");
          },
          duration: 500
        }
      )
  }else if (direcao=="lejos"){
    $(elemento)
      .css("zIndex","1")
      .animate(
        {
          top: "380px",
          width: "-=50"
        },{
          step: function(now, fx){
            $(elemento).css("transform","rotate("+now*2+"deg)");
          },
          duration: 1000
        }
      )
  }


}


var vezesPressionada;
//Função que reinicia o jogo
function reiniciar(){
  if (vezesPressionada!=0) {
    vezesPressionada=0;
    $("#bola").css({
      left: "700px",
      top: "600px",
      width: "100px",
      transform: "rotate(0deg)",
      zIndex: "4"
    });
    $("#trave").css("zIndex","2");
    $("#fHorizontal")
      .css({
        left: "350px",
        top: "10px"
      })
      .stop()/*o stop posiciona o goleiro no centro da tela, em 400px para a direita
e para a aniamção*/
    $("#fVertical")
      .css({
        left: "305px",
        top: "400px"
      })
      .stop()
    $("#goleiro").stop();
    $("#goleiro").css({
      left: "400px",
      zIndex: "3"
    });
    $("h1").hide();
  }


}



//Document.Ready
$(function(){
  vezesPressionada=0;
  var posHorizontal;
  var posVertical;


//Evento ao pressionar tecla
  $(document).on("keypress",function(e){

//Validação tecla barra espaçamento
    if (e.which==32) {
      e.preventDefault();
      vezesPressionada++;
      if (vezesPressionada==1) {
        direita($("#fHorizontal"),750,Dificuldade);
        direita($("#goleiro"),230,1500);
      }else if (vezesPressionada==2) {
        $("#fHorizontal").stop();
        emcima($("#fVertical"));
      }else if (vezesPressionada==3) {
        $("#fVertical").stop();
        posHorizontal = $("#fHorizontal").css("left");
        posVertical = $("#fVertical").css("top");
        shoot($("#bola"), posVertical, posHorizontal);
      }
    }
  });

//Evento reiniciar o jogo ao pressionar o botão
  $(".iniciar").on("click", function(){
    reiniciar();
  })











});
