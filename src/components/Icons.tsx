import { HugeiconsIcon } from '@hugeicons/react';
import { 
  Stethoscope02Icon,
  Medicine01Icon, 
  Shield01Icon,
  HandGripIcon,
  Clock01Icon,
  CheckmarkCircle01Icon,
  MessageUser01Icon,
  Location01Icon,
  Call02Icon,
  Mail01Icon,
  Calendar03Icon,
  StarIcon,
  InstagramIcon,
  Linkedin01Icon,
  ArrowRight01Icon,
  WhatsappIcon
} from '@hugeicons/core-free-icons';

// Service Icons
export function StethoscopeIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return <HugeiconsIcon icon={Stethoscope02Icon} size={size} className={className} />;
}

export function PillIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return <HugeiconsIcon icon={Medicine01Icon} size={size} className={className} />;
}

export function ShieldIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return <HugeiconsIcon icon={Shield01Icon} size={size} className={className} />;
}

export function HandshakeIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return <HugeiconsIcon icon={HandGripIcon} size={size} className={className} />;
}

// Hero Differentials Icons
export function ClockIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return <HugeiconsIcon icon={Clock01Icon} size={size} className={className} />;
}

export function CheckCircleIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return <HugeiconsIcon icon={CheckmarkCircle01Icon} size={size} className={className} />;
}

export function ChatIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return <HugeiconsIcon icon={MessageUser01Icon} size={size} className={className} />;
}

// Contact Icons
export function MapPinIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return <HugeiconsIcon icon={Location01Icon} size={size} className={className} />;
}

export function PhoneIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return <HugeiconsIcon icon={Call02Icon} size={size} className={className} />;
}

export function MailIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return <HugeiconsIcon icon={Mail01Icon} size={size} className={className} />;
}

export function CalendarIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return <HugeiconsIcon icon={Calendar03Icon} size={size} className={className} />;
}

// Social Icons
export function StarFilledIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return <HugeiconsIcon icon={StarIcon} size={size} className={className} />;
}

export function InstagramSocialIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return <HugeiconsIcon icon={InstagramIcon} size={size} className={className} />;
}

export function LinkedinSocialIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return <HugeiconsIcon icon={Linkedin01Icon} size={size} className={className} />;
}

export function ArrowRightIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return <HugeiconsIcon icon={ArrowRight01Icon} size={size} className={className} />;
}

export function WhatsAppIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return <HugeiconsIcon icon={WhatsappIcon} size={size} className={className} />;
}
