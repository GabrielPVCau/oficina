import { HugeiconsIcon } from '@hugeicons/react';
import { 
  Stethoscope02Icon,
  Medicine01Icon, 
  Shield01Icon,
  HandGripIcon,
  ArrowRight01Icon
} from '@hugeicons/core-free-icons';

// Map icon names to actual icon data
const iconMap: Record<string, typeof Stethoscope02Icon> = {
  'stethoscope': Stethoscope02Icon,
  'pill': Medicine01Icon,
  'shield': Shield01Icon,
  'handshake': HandGripIcon,
};

interface ServiceCardProps {
  iconName: 'stethoscope' | 'pill' | 'shield' | 'handshake';
  title: string;
  description: string;
}

export function ServiceCard({ iconName, title, description }: ServiceCardProps) {
  const icon = iconMap[iconName];
  
  return (
    <article className="group bg-white rounded-xl p-6 md:p-8 shadow-sm border border-slate-100 hover:shadow-md hover:border-teal-100 transition-all duration-300">
      {/* Icon */}
      <div className="w-14 h-14 rounded-lg bg-teal-50 flex items-center justify-center mb-5 group-hover:bg-teal-100 transition-colors text-teal-600">
        <HugeiconsIcon icon={icon} size={28} />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-slate-900 mb-3">
        {title}
      </h3>

      <p className="text-slate-600 text-sm leading-relaxed">
        {description}
      </p>
    </article>
  );
}
