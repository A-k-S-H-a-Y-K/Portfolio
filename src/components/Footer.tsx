import { SecretQuestion } from './SecretQuestion';

interface FooterProps {
  correctAnswer: string;
}

export const Footer = ({ correctAnswer }: FooterProps) => {
  return (
    <footer className="bg-gray-800 text-white text-center py-6 mt-auto relative">
      <p className="text-sm">
        © 2025 AKSHAY CORP 
        <SecretQuestion correctAnswer={correctAnswer} />
        CODED BY AKSHAY K
      </p>
    </footer>
  );
}; 