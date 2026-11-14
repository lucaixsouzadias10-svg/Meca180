GARAGE C180 PRO — PRONTO PARA NETLIFY
=====================================

FORMA MAIS FÁCIL
1. Acesse https://app.netlify.com/drop
2. Arraste a pasta garage_c180_netlify OU o arquivo garage_c180_netlify_ready.zip.
3. Aguarde o deploy.
4. O Netlify vai gerar uma URL pública automaticamente.

ESTRUTURA
index.html          -> página principal, obrigatoriamente na raiz
assets/             -> imagens do carro, motor, escape e capô
css/styles.css      -> estilos visuais
js/app.js           -> interação do aplicativo
netlify.toml        -> configuração do Netlify
_headers            -> cache dos arquivos estáticos

BUILD
Não há build. É um site estático.
Publish directory: .
Build command: nenhum

IMPORTANTE
Os registros ficam salvos no navegador via localStorage.
Se abrir o site em outro computador/navegador, os registros não aparecem automaticamente.
Para sincronização entre dispositivos será necessário backend/banco de dados em uma próxima versão.
