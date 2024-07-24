# 🌐 Cliente Websocket
Esse projeto foi desenvolvido com objetivo de testar um servidor WebSocket e as mensagens interceptadas no canal de conexão. Como eu não entendia bem o funcionamento dos WS, 
decidi desenvolver um cliente do zero para testar o funcionamento do servidor e compreender melhor a lógica de operação dessa tecnologia.

O cliente foi configurado para enviar eventos e mensagens para um server WS. A URL do servidor é definida estaticamente no código, uma mudança futura seria permitir que isso
fosse definido diretamente na interface.

Para **Emitir um evento** deve ser digitado o nome do evento no campo "evento a enviar ou sala para entrar", em seguida, na caixa maior do canto inferior esquerdo, onde lê-se 
"mensagem a ser enviada", é inserida a mensagem que será enviada junto ao evento. Daí, basta apertar o botão "Enviar Evento"

Para **Ouvir um evento** deve ser digitado o evento que se pretende ouvir na caixa onde lê-se "ouvir evento". Depois, basta clicar o botão "Ouvir Evento".

Os botões "Conectar" e etc são casos especificos que nem vale a pena explicar mais.

<h2><Strong>Interface do cliente WS: </Strong></Strong></h2>
<p align="center">
  <img src="https://github.com/user-attachments/assets/2ed23fee-be89-4698-a537-930f979e40d1" width="800" alt="analise_algoritmos_ordenacao">
</p>
