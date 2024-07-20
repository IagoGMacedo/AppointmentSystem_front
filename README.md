# Sistema de agendamentos

O projeto AppointmentSystem é um sistema de agendamentos com perfil de paciente e profissional. 

O paciente pode solicitar um agendamento em um determinado dia e hora, caso esteja disponível, ele será marcado e aparecerá em sua listagem de agendamentos. Caso seja necessário, o paciente pode editar as informações de sua consulta  **agendada**, podendo alterar a data e hora  ou até mesmo cancela-la.

Quanto ao profissional, ele pode visualizar todos os agendamentos criados no sistema e edita-los conforme necessário, podendo tanto alterar as informações de data, horário e paciente, quanto também **concluir** ou **cancelar** aquele agendamento. Se desejar, o profissional também pode criar um agendamento para um usuário com perfil de paciente.

Quando um agendamento é solicitado, o sistema consulta a disponibilidade daquela hora e dia. Os horários disponíveis são das 07 às 17, para cada hora há duas vagas de atendimento, dessa forma, em um dia podem ocorrer no máximo 20 atendimentos. Caso o horário solicitado não esteja disponível, uma mensagem aparecerá informando a indisponibilidade.

A avaliação de disponibilidade é feita de forma dinâmica, de modo que ao se mudar o dia de um agendamento ou até mesmo cancelando-o, a vaga consumida daquele dia é liberada.

## Executando
O projeto divide-se em um front-end feito com angular (este repositório), e um back-end feito com c#, disponível no repositório https://github.com/IagoGMacedo/AppointmentSystem_back. Também é utilizando banco de dado SQL server.

Para inicializar o back-end:
- crie um novo banco e execute os scripts que estão no readme repositório do back-end
- clone o repositório 
- abra o projeto no visual studio e execute a aplicação, o programa executará por padrão na porta http://localhost:5206/.

Para inicializar o front-end:
- clone o repositório
- abra o projeto no visual studio e execute primeiro o comando "npm install" para baixar as dependências da aplicação
- execute "ng serve" no terminal, o programa executará por padrão na porta http://localhost:4200/.
