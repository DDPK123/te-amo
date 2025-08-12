// Função para efeito de confete
function efeitoConfete() {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.left = 0;
    canvas.style.top = 0;
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = 100000;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const confetes = [];
    const cores = ['#e573b7','#b983ff','#a259c6','#ffe066','#ff5e62','#7c3aed','#fff'];
    for(let i=0;i<320;i++){
        confetes.push({
            x: Math.random()*canvas.width,
            y: Math.random()*-canvas.height,
            r: Math.random()*10+8,
            c: cores[Math.floor(Math.random()*cores.length)],
            vy: Math.random()*3.5+2.5,
            vx: (Math.random()-0.5)*2.2,
            rot: Math.random()*Math.PI*2,
            vr: (Math.random()-0.5)*0.22
        });
    }
    let frames = 0;
    const maxFrames = 260; // duração maior
    function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(const conf of confetes){
            ctx.save();
            ctx.translate(conf.x,conf.y);
            ctx.rotate(conf.rot);
            ctx.fillStyle = conf.c;
            ctx.fillRect(-conf.r/2,-conf.r/2,conf.r,conf.r*0.4);
            ctx.restore();
            conf.x += conf.vx;
            conf.y += conf.vy;
            conf.rot += conf.vr;
        }
        frames++;
        if(frames<maxFrames){
            requestAnimationFrame(draw);
        }else{
            canvas.remove();
        }
    }
    draw();
}
document.addEventListener('DOMContentLoaded', function() {

    // Troca o cursor para coração aberto ao clicar e volta ao soltar
    document.body.addEventListener('mousedown', function() {
        document.body.classList.add('coracao-aberto');
    });
    document.body.addEventListener('mouseup', function() {
        document.body.classList.remove('coracao-aberto');
    });
    document.body.addEventListener('mouseleave', function() {
        document.body.classList.remove('coracao-aberto');
    });

    const simBtn = document.getElementById('sim');
    const naoBtn = document.getElementById('nao');
    const botoesDiv = document.getElementById('botoes');
    const respostaDiv = document.getElementById('resposta');
    let naoClicks = 0;
    let fugindo = false;
    let fakeNaoBtn = null;

    function efeitoExplosaoCentro() {
        const painel = document.getElementById('card');
        const explosao = document.createElement('div');
        explosao.className = 'efeito-explosao';
        explosao.innerHTML = `
            <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="30" fill="#e573b7" opacity="0.7"/>
                <circle cx="60" cy="60" r="50" fill="#b983ff" opacity="0.3"/>
                <circle cx="60" cy="60" r="70" fill="#a259c6" opacity="0.15"/>
                <g>
                  <circle cx="60" cy="20" r="8" fill="#e573b7"/>
                  <circle cx="100" cy="60" r="8" fill="#e573b7"/>
                  <circle cx="60" cy="100" r="8" fill="#e573b7"/>
                  <circle cx="20" cy="60" r="8" fill="#e573b7"/>
                </g>
            </svg>
        `;
        painel.appendChild(explosao);
        setTimeout(() => explosao.remove(), 900);
    }


    function aceitar() {
            // Esconde textos principais e botões
            const textoPedido = document.querySelector('.texto-pedido');
            if (textoPedido) textoPedido.style.display = 'none';
            if (naoBtn) naoBtn.style.display = 'none';
            if (simBtn) simBtn.style.display = 'none';
            if (fakeNaoBtn && fakeNaoBtn.parentNode) fakeNaoBtn.parentNode.removeChild(fakeNaoBtn);
            // Esconde outros textos (h1, p) se existirem
            const h1 = document.querySelector('.container h1');
            const p = document.querySelector('.container p');
            if (h1) h1.style.display = 'none';
            if (p) p.style.display = 'none';
            respostaDiv.innerHTML = `
                <div style="
                    position:fixed;
                    top:50%;
                    left:50%;
                    transform:translate(-50%,-50%);
                    z-index:99999;
                    width:96vw;
                    max-width:520px;
                    padding:36px 18px 32px 18px;
                    background:rgba(30,16,60,0.98);
                    border-radius:22px;
                    border:4px solid #fff;
                    box-shadow:0 8px 32px #000a,0 0 0 8px #a259c655;
                    margin:0 auto;
                    display:block;
                    text-align:center;">
                    <span style="font-size:2.2em;font-weight:900;color:#fff;text-shadow:0 4px 24px #000,0 1px 2px #a259c6;display:block;margin-bottom:18px;">VOCÊ É MALUCA KKKK</span>
                    <span style="font-size:1.3em;font-weight:600;color:#fff;text-shadow:0 2px 12px #000,0 1px 2px #a259c6;display:block;margin-bottom:14px;">Sério, você me faz muito feliz! Obrigado por aceitar dividir esse momento comigo ❤️</span>
                    <span style="font-size:1.18em;font-weight:700;color:#fff;text-shadow:0 2px 12px #000,0 1px 2px #a259c6;display:block;margin-top:10px;">Quero te agradecer de coração por ter aceitado meu pedido de namoro. Você não faz ideia do quanto isso significa pra mim. Estou muito feliz por ter você ao meu lado e por poder começar essa nova fase juntos. Prometo cuidar de você, te respeitar e fazer de tudo para que a gente viva momentos incríveis. ❤️</span>
                </div>
            `;
            efeitoConfete();
    }


    function moveButtonRandom(btn) {
        // Botão NÃO foge apenas dentro do painel central e sempre acima dos textos
        const card = document.getElementById('card');
        const cardRect = card.getBoundingClientRect();
        const padding = 10;
        const maxX = cardRect.width - btn.offsetWidth - padding;
        const maxY = cardRect.height - btn.offsetHeight - padding;
        let newX = Math.random() * maxX + padding/2;
        let newY = Math.random() * maxY + padding/2;
        btn.style.position = 'absolute';
        btn.style.left = newX + 'px';
        btn.style.top = newY + 'px';
        btn.style.margin = 0;
        btn.style.zIndex = 2000;
        card.appendChild(btn);
    }
    

    naoBtn.addEventListener('click', function(e) {
        naoClicks++;
        if (naoClicks < 3) {
            naoBtn.textContent = 'Não';
            moveButtonRandom(naoBtn);
        } else if (naoClicks === 3) {
            naoBtn.style.display = 'none';
            fakeNaoBtn = document.createElement('button');
            fakeNaoBtn.className = naoBtn.className;
            fakeNaoBtn.innerHTML = 'Não';
            fakeNaoBtn.style.position = 'absolute';
            fakeNaoBtn.style.zIndex = 2000;
            document.getElementById('card').appendChild(fakeNaoBtn);
            moveButtonRandom(fakeNaoBtn);
            fakeNaoBtn.addEventListener('mouseenter', function() {
                moveButtonRandom(fakeNaoBtn);
            });
            window.addEventListener('resize', function() {
                moveButtonRandom(fakeNaoBtn);
            });
        }
    });

    simBtn.addEventListener('click', aceitar);
});
