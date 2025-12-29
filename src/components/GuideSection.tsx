import { motion } from 'framer-motion';
import { Section } from './Section';

const credentials = [
  { value: '+23', label: 'Anos de Experiência' },
  { value: '5000+', label: 'Caminhões Atendidos' },
  { value: '100%', label: 'Foco em Diesel' },
];

const differentials = [
  'Diagnóstico preciso antes de qualquer troca',
  'Peças originais e garantia de serviço',
  'Atendimento rápido - entendemos sua urgência',
  'Experiência comprovada em linha diesel pesada',
];

export const GuideSection = () => {
  return (
    <Section id="sobre" className="bg-white">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image/Visual Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Placeholder for mechanic image - styled box */}
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950 to-blue-800 rounded-3xl transform rotate-3"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl flex items-center justify-center">
              <div className="text-center text-white p-8">
                <svg className="w-24 h-24 mx-auto mb-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-2xl font-extrabold block">Vando Cau</span>
                <span className="text-slate-400">Especialista em Diesel</span>
              </div>
            </div>
            
            {/* Floating badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="absolute -bottom-6 -right-6 bg-orange-600 text-white px-6 py-3 rounded-2xl shadow-lg"
            >
              <span className="text-3xl font-extrabold">+23</span>
              <span className="block text-sm">anos de mercado</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-orange-600 font-bold text-sm uppercase tracking-wider mb-4">
            O Seu Guia
          </span>
          <h2 className="section-title mb-6">
            Quem Entende de<br />
            <span className="text-orange-600">Diesel de Verdade</span>
          </h2>
          <p className="text-lg text-slate-600 mb-6">
            Meu nome é <strong className="text-blue-950">Vando Cau</strong> e há mais de 23 anos eu trabalho exclusivamente com 
            <strong className="text-blue-950"> mecânica diesel</strong> em São Sebastião do Paraíso, MG.
          </p>
          <p className="text-lg text-slate-600 mb-8">
            Eu sei que quando você me procura, <strong className="text-blue-950">cada minuto conta</strong>. 
            Por isso, meu foco é diagnóstico certeiro e solução rápida - nada de ficar "experimentando" peças às suas custas.
          </p>

          {/* Differentials */}
          <ul className="space-y-3 mb-8">
            {differentials.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-slate-700">{item}</span>
              </motion.li>
            ))}
          </ul>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {credentials.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-center bg-slate-50 rounded-xl p-4"
              >
                <span className="text-2xl md:text-3xl font-extrabold text-blue-950">{stat.value}</span>
                <span className="block text-xs text-slate-500 mt-1">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
