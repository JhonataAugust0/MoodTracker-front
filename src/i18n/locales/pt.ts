export default {
  header: {
    title: 'MoodTracker',
    getStarted: 'Começar'
  },
  auth: {
    login: 'Entrar',
    register: 'Registrar',
    name: 'Nome',
    email: 'Email',
    password: 'Senha',
    confirmPassword: 'Confirmar Senha',
    loginButton: 'Entrar',
    registerButton: 'Registrar',
    noAccount: 'Não tem uma conta?',
    hasAccount: 'Já tem uma conta?',
    registerLink: 'Registre-se agora',
    loginLink: 'Entre aqui',
    namePlaceholder: 'Digite seu nome',
    emailPlaceholder: 'Digite seu email',
    passwordPlaceholder: 'Digite sua senha',
    confirmPasswordPlaceholder: 'Confirme sua senha',
    passwordMismatch: 'As senhas não coincidem',
    changePassword: 'Alterar Senha',
    currentPassword: 'Senha Atual',
    newPassword: 'Nova Senha',
    confirmNewPassword: 'Confirmar Nova Senha',
    changePasswordButton: 'Alterar Senha',
    passwordChangeSuccess: 'Senha alterada com sucesso! Redirecionando para o login...',
    passwordTooShort: 'A senha deve ter pelo menos 6 caracteres',
    changePasswordError: 'Erro ao alterar a senha. Por favor, tente novamente.',
    currentPasswordPlaceholder: 'Digite sua senha atual',
    newPasswordPlaceholder: 'Digite sua nova senha',
    confirmNewPasswordPlaceholder: 'Confirme sua nova senha',
    backToLogin: 'Lembra sua senha?',
    forgotPassword: "Esqueceu sua senha?",
    resetPassword: "Redefinir Senha",
    sendResetLink: "Enviar link de redefinição",
    resetLinkSent: "Link de redefinição enviado para seu email",
    backToChangePassword: "Voltar para alteração de senha"
  },
  buttons: {
    save: 'Salvar',
    add: 'Adicionar',
    log: 'Registrar',
    complete: 'Completar',
    cancel: 'Cancelar',
  },
  notes: {
    label: 'Nova Nota',
    content: 'Conteúdo',
    color: 'Cor',
    addTag: 'Adicionar tag',
  },
  landing: {
    title: 'Acompanhe Sua Jornada de Humor',
    subtitle: 'Uma forma simples e bonita de acompanhar seus humores e hábitos diários. Entenda-se melhor, um dia de cada vez.',
    features: {
      mood: {
        title: 'Registre Seu Humor',
        description: 'Registre suas emoções e sentimentos diários com nossa interface intuitiva. Adicione notas e acompanhe padrões ao longo do tempo.',
        saveEntry: 'Salvar Entrada'
      },
      habits: {
        title: 'Construa Melhores Hábitos',
        description: 'Crie e acompanhe hábitos diários que melhoram seu bem-estar. Mantenha-se motivado com sequências e acompanhamento de progresso.',
        addHabit: 'Adicionar Hábito',
        logHabit: 'Completar'
      },
      notes: {
        title: 'Notas Rápidas',
        description: 'Capture pensamentos, reflexões e momentos memoráveis ao longo do seu dia. Mantenha tudo organizado em um só lugar.',
        addNote: 'Adicionar Notas'      
      },
      analytics: {
        title: 'Análises Perspicazes',
        description: 'Visualize seus padrões de humor e progresso de hábitos com belos gráficos e insights que ajudam você a crescer.'
      }
    }
  },
  dashboard: {
    yourDashboard: 'Seu Painel',
    howAreYouFeeling: 'Como você está se sentindo hoje?',
    habits: 'Hábitos',
    quickNotes: 'Notas Rápidas',
    moodLog: 'Registro de Humor',
    habitProgress: 'Progresso de Hábitos',
    addNote: 'Adicione uma nota sobre seu dia...',
  },
  moods: {
    verySad: 'Muito Triste',
    sad: 'Triste',
    angry: 'Irritado',
    veryAngry: 'Muito Irritado',
    neutral: 'Neutro',
    good: 'Bem',
    veryGood: 'Muito Bem',
    excellent: 'Excelente'
    },
  habits: {
    addTag: 'Adicionar tag...',
    tags: 'Tags',
    new: 'Novo hábito',
    name: 'Nome',
    color: 'Cor',
    description: 'Descrição',
    frequency: {
      label: 'Frequência',
      daily: 'Diário',
      weekly: 'Semanal',
      monthly: 'Mensal',
      yearly: 'Anual',
      custom: 'Personalizado'
    }
  },
  notFound: {
    errorCode: "4😵4",
    title: "Oops! Página não encontrada",
    description: "Parece que você se perdeu no espaço-tempo...",
    emoji: "🚀✨",
    quote: {
      text: "\"No fim, não são os anos em sua vida que contam, e sim a vida em seus anos... \n...e as páginas que você consegue encontrar!\"",
      author: " - Abraham Lincoln (talvez)"
    },
    button: "Voltar para Casa 🏠"
  },
  serverError: {
    errorCode: "500",
    title: "Ops! Nosso servidor está tirando uma soneca",
    description: "Não se preocupe, às vezes até os servidores precisam descansar um pouco. Estamos tentando acordá-lo!",
    emoji: "😴",
    quote: {
      text: "Até as melhores máquinas precisam de uma pausa",
      author: "- Um servidor cansado"
    },
    button: "Tentar Novamente"
  },
  terms: {
    title: 'Termos de Uso',
    lastUpdated: 'Última atualização: Janeiro 2024',
    sections: [
      {
        title: '1. Introdução',
        content: 'Bem-vindo ao MoodTracker! Nossa aplicação foi projetada para ajudar os usuários a rastrear e analisar seu humor e hábitos para promover bem-estar e produtividade.'
      },
      {
        title: '2. Aceitação dos Termos',
        content: 'Ao utilizar o MoodTracker, você concorda com estes Termos de Uso e com nossa Política de Privacidade. Se não concordar com qualquer parte destes termos, por favor, não utilize a aplicação.'
      },
      {
        title: '3. Dados Coletados',
        content: [
          'Coletamos e armazenamos os seguintes dados pessoais:',
          'Endereço de email e senha (armazenados de forma segura e criptografada)',
          'Registros de humor e hábitos fornecidos voluntariamente pelo usuário',
          'Dados de preferências de uso da aplicação',
        ]
      },
      {
        title: '4. Finalidade do Tratamento de Dados',
        content: [
          'Os dados coletados são utilizados exclusivamente para:',
          'Permitir que você registre e visualize informações sobre seu humor e hábitos',
          'Gerar relatórios e gráficos interativos para seu uso pessoal',
          'Melhorar a experiência do usuário e personalizar funcionalidades da aplicação',
          'Os registros de humor e hábitos são estritamente privados e visíveis apenas para o próprio usuário. Não utilizamos ou compartilhamos esses dados para nenhuma finalidade comercial ou de análise externa.',
        ]
      },
      {
        title: '5. Base Legal para Tratamento de Dados',
        content: [
          'Nosso tratamento de dados pessoais é fundamentado nas seguintes bases legais:',
          'Consentimento do titular dos dados para as funcionalidades da aplicação',
          'Execução de contrato para fornecer acesso aos serviços oferecidos',
          'Cumprimento de obrigações legais relativas à segurança dos dados',
        ]
      },
      {
        title: '6. Armazenamento e Segurança dos Dados',
        content: [
          'Os dados são armazenados em servidores seguros que utilizam criptografia para proteger as informações contra acesso não autorizado.',
          'Apenas você tem acesso direto aos seus registros de humor e hábitos através de sua conta',
          'Utilizamos técnicas como hashing e SALT para proteger senhas e dados sensíveis',
          'Os dados serão armazenados enquanto sua conta estiver ativa ou conforme exigido por lei'
        ]
      },
      {
        title: '7. Cookies e Tecnologias Semelhantes',
        content: [
          'O MoodTracker utiliza cookies e tecnologias semelhantes para:',
          'Melhorar a experiência do usuário na plataforma.',
          'Permitir a manutenção de sessões ativas com segurança.',
          'Você pode gerenciar suas preferências de cookies nas configurações do navegador.',
        ]
      },
      {
        title: '8. Compartilhamento de Dados',
        content: 'Não compartilhamos os dados dos usuários com terceiros, exceto quando exigido por lei ou para proteger nossos direitos legais. Em nenhuma circunstância seus registros de humor ou hábitos serão compartilhados ou usados para fins comerciais.'
      },
      {
        title: '9. Seus Direitos',
        content: [
        'Você tem os seguintes direitos em relação aos seus dados pessoais:',
        'Acessar seus dados pessoais armazenados',
        'Solicitar correção de dados incorretos ou incompletos',
        'Excluir sua conta e todos os dados associados',
        'Solicitar limitação ou oposição ao tratamento de dados',
        'Solicitar a portabilidade dos dados pessoais',
        'Retirar o consentimento a qualquer momento',
        'Entre em contato pelo email suporte@moodtracker.com para exercer seus direitos.',
        ]
      },
      {
        title: '10. Alterações aos Termos de Uso',
        content: 'Reservamo-nos o direito de atualizar estes Termos de Uso. Notificaremos você sobre quaisquer mudanças significativas por meio da aplicação ou email.'
      },
      {
        title: '11. Contato',
        content: 'Para dúvidas ou sugestões, entre em contato pelo email suporte@moodtracker.com.'
      }
    ],
    contact: 'Obrigado por usar o MoodTracker! Esperamos ajudar você a melhorar seu bem-estar e produtividade.'
  },
  footer: {
    copyright: 'MoodTracker. Todos os direitos reservados.',
    termsOfUse: 'Termos de uso',
    contact: 'Contato'
  }
}