
const faqs = [
  { question: "Qual o prazo do projeto?", answer: "O prazo para entrega do projeto é de 3 meses." },
  { question: "Quem pode usar a ferramenta?", answer: "A ferramenta é destinada aos públicos da ONG Turma do Bem, incluindo dentistas, voluntários, beneficiados, doadores e pessoas que solicitam ajuda." },
  { question: "Como posso contribuir com o projeto?", answer: "Você pode contribuir entrando em contato com a equipe pelo formulário de contato." },
  { question: "A ferramenta é gratuita para a ONG?", answer: "Sim, como um projeto acadêmico para a Turma do Bem, a ferramenta será entregue gratuitamente para a ONG." },
  { question: "Quais são os principais benefícios da ferramenta?", answer: "Os principais benefícios incluem a centralização de atendimentos, automação de encaminhamentos, acompanhamento de status e geração de relatórios gerenciais para otimizar a gestão." },
  { question: "Em que fase de desenvolvimento o projeto se encontra?", answer: "Atualmente, o projeto está na fase de front-end design, focando na interface do usuário e na responsividade." },
  { question: "Existe documentação técnica disponível?", answer: "Sim, toda a documentação técnica do projeto estará disponível no nosso repositório GitHub." }
];

function createFAQAccordion() {
  const faqContainer = document.getElementById('faq-container');
  if (!faqContainer) return;
  faqs.forEach(({ question, answer }) => {
    const item = document.createElement('div');
    item.className = 'faq-item';

    const q = document.createElement('button');
    q.className = 'faq-question';
    q.textContent = question;
    q.setAttribute('aria-expanded', 'false');
    q.setAttribute('aria-controls', `answer-${question.replace(/\s+/g, '-')}`);

    const a = document.createElement('div');
    a.className = 'faq-answer';
    a.id = `answer-${question.replace(/\s+/g, '-')}`;
    a.textContent = answer;
    a.style.display = 'none';

    q.addEventListener('click', () => {
      const expanded = q.getAttribute('aria-expanded') === 'true';
      q.setAttribute('aria-expanded', String(!expanded));
      a.style.display = expanded ? 'none' : 'block';
    });

    item.appendChild(q);
    item.appendChild(a);
    faqContainer.appendChild(item);
  });
}


function validateForm() {
  const form = document.getElementById('contact-form');
  if (!form) return true;

  const name = form.nome;
  const email = form.email;
  const subject = form.assunto;
  const message = form.mensagem;
  let valid = true;

  form.querySelectorAll('.error-message').forEach(el => el.remove());

  if (!name.value.trim()) {
    showError(name, 'Nome é obrigatório');
    valid = false;
  }
  if (!email.value.trim()) {
    showError(email, 'Email é obrigatório');
    valid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    showError(email, 'Email inválido');
    valid = false;
  }
  if (!subject.value.trim()) {
    showError(subject, 'Assunto é obrigatório');
    valid = false;
  }
  if (!message.value.trim()) {
    showError(message, 'Mensagem é obrigatória');
    valid = false;
  }

  return valid;
}

function showError(input, message) {
  const error = document.createElement('span');
  error.className = 'error-message';
  error.textContent = message;
  input.parentNode.appendChild(error);
}

window.addEventListener('DOMContentLoaded', () => {
  createFAQAccordion();

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      if (!validateForm()) {
        e.preventDefault();
      }
    });
    
    ['input', 'change'].forEach(evt =>
      form.addEventListener(evt, (event) => {
        const target = event.target;
        const errorMsg = target.parentNode.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
      })
    );
  }
});