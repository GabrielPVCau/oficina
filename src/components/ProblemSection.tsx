import { motion } from 'framer-motion';
import { Section } from './Section';

const problems = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Caminhão Parado',
    description: 'Cada dia parado é dinheiro perdido. Você sabe quanto custa um caminhão parado? Até R$ 1.000/dia em frete perdido.',
    highlight: 'R$ 1.000/dia',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Prazos Estourando',
    description: 'Cliente esperando, carga atrasada, contrato em risco. Cada hora conta quando você depende da estrada.',
    highlight: 'Contrato em risco',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    title: 'Mecânico que Só Troca Peça',
    description: 'Você já passou por isso: paga caro, troca peça, e o problema continua. Diagnóstico errado sai mais caro ainda.',
    highlight: 'Problema continua',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const ProblemSection = () => {
  return (
    <Section id="problema" className="bg-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="inline-block text-orange-600 font-bold text-sm uppercase tracking-wider mb-4">
          O Problema
        </span>
        <h2 className="section-title mb-4">
          Você Conhece Essa<br />
          <span className="text-orange-600">Dor de Cabeça</span>?
        </h2>
        <p className="section-subtitle mx-auto">
          Todo caminhoneiro e frotista já passou por pelo menos uma dessas situações.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-6 lg:gap-8"
      >
        {problems.map((problem, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="card group"
          >
            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
              {problem.icon}
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-2">{problem.title}</h3>
            <p className="text-slate-600 mb-4">{problem.description}</p>
            <span className="inline-block bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full">
              {problem.highlight}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};
