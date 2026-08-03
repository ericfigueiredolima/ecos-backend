const supabase = require('./src/config/supabaseClient'); // Ajuste o caminho caso necessário

async function runSeed() {
  console.log("🌱 Iniciando o seed do banco de dados...");

  // 1. Inserir 10 Usuários
  const usersData = [
    { name: 'Ana Souza', email: 'ana.souza@ecos.com', role: 'admin' },
    { name: 'Carlos Silva', email: 'carlos.silva@ecos.com', role: 'collaborator' },
    { name: 'Mariana Lima', email: 'mariana.lima@ecos.com', role: 'collaborator' },
    { name: 'João Pedro', email: 'joao.pedro@ecos.com', role: 'collaborator' },
    { name: 'Beatriz Costa', email: 'beatriz.costa@ecos.com', role: 'collaborator' },
    { name: 'Lucas Martins', email: 'lucas.martins@ecos.com', role: 'collaborator' },
    { name: 'Fernanda Rocha', email: 'fernanda.rocha@ecos.com', role: 'collaborator' },
    { name: 'Gabriel Alves', email: 'gabriel.alves@ecos.com', role: 'collaborator' },
    { name: 'Juliana Mendes', email: 'juliana.mendes@ecos.com', role: 'collaborator' },
    { name: 'Rafael Santos', email: 'rafael.santos@ecos.com', role: 'admin' }
  ];

  const { error: userError } = await supabase
    .from('users')
    .upsert(usersData, { onConflict: 'email' }); // Evita duplicatas pelo e-mail

  if (userError) {
    console.error("Erro ao inserir usuários:", userError.message);
  } else {
    console.log("✅ Usuários inseridos com sucesso!");
  }

  // 2. Inserir 8 Funcionários
  const employeesData = [
    { full_name: 'Roberto Dias', email: 'roberto.dias@ecos.com', position: 'Desenvolvedor Frontend' },
    { full_name: 'Camila Ribeiro', email: 'camila.ribeiro@ecos.com', position: 'Desenvolvedora Backend' },
    { full_name: 'Bruno Cardoso', email: 'bruno.cardoso@ecos.com', position: 'Product Owner' },
    { full_name: 'Larissa Nunes', email: 'larissa.nunes@ecos.com', position: 'UX/UI Designer' },
    { full_name: 'Diego Farias', email: 'diego.farias@ecos.com', position: 'DevOps Engineer' },
    { full_name: 'Patrícia Moraes', email: 'patricia.moraes@ecos.com', position: 'QA Engineer' },
    { full_name: 'Marcos Vinicius', email: 'marcos.vinicius@ecos.com', position: 'Scrum Master' },
    { full_name: 'Renata Castro', email: 'renata.castro@ecos.com', position: 'Analista de Dados' }
  ];

  const { error: employeeError } = await supabase
    .from('employees')
    .upsert(employeesData, { onConflict: 'email' });

  if (employeeError) {
    console.error("Erro ao inserir funcionários:", employeeError.message);
  } else {
    console.log("✅ Funcionários inseridos com sucesso!");
  }

  // 3. Inserir 12 Projetos
  const projectsData = [
    { title: 'Plataforma ECOS v1', description: 'Desenvolvimento inicial do MVP da plataforma principal.', status: 'Em andamento', start_date: '2026-01-10' },
    { title: 'Migração Cloud', description: 'Migração da infraestrutura para o ambiente de nuvem.', status: 'Concluído', start_date: '2026-02-01' },
    { title: 'App Mobile Core', description: 'Aplicativo mobile para acompanhamento de métricas.', status: 'Planejado', start_date: '2026-05-15' },
    { title: 'Portal do Cliente', description: 'Criação de interface web voltada para o cliente final.', status: 'Em andamento', start_date: '2026-03-01' },
    { title: 'Sistema de Autenticação OAuth', description: 'Implementação de login unificado via Google.', status: 'Em andamento', start_date: '2026-04-10' },
    { title: 'Dashboard de Indicadores', description: 'Painel gerencial com gráficos em tempo real.', status: 'Planejado', start_date: '2026-06-01' },
    { title: 'API Gateway', description: 'Centralização e segurança das rotas de microserviços.', status: 'Concluído', start_date: '2026-01-20' },
    { title: 'Automação de Testes (CI/CD)', description: 'Esteira automatizada de testes e deploy contínuo.', status: 'Em andamento', start_date: '2026-02-15' },
    { title: 'Redesign do Design System', description: 'Atualização visual dos componentes globais.', status: 'Planejado', start_date: '2026-07-01' },
    { title: 'Módulo de Relatórios', description: 'Exportação de relatórios gerenciais em PDF e Excel.', status: 'Planejado', start_date: '2026-05-01' },
    { title: 'Segurança e LGPD', description: 'Adequação dos dados armazenados às normas de privacidade.', status: 'Em andamento', start_date: '2026-03-20' },
    { title: 'Otimização de Performance', description: 'Refatoração de consultas lentas no banco de dados.', status: 'Concluído', start_date: '2026-02-25' }
  ];

  // Como projetos geralmente não possuem chave única além do ID, usamos insert normal ou verificamos por título se necessário
  const { error: projectError } = await supabase
    .from('projects')
    .insert(projectsData);

  if (projectError) {
    console.error("Erro ao inserir projetos:", projectError.message);
  } else {
    console.log("✅ Projetos inseridos com sucesso!");
  }

  console.log("🚀 Seed finalizado!");
}

runSeed();