import logo from '@/assets/aletheia.svg';
interface LogoProps {
  width?: number;
  height?: number;
}
export function Logo({ width = 42, height = 42 }: LogoProps) {
  return <img src={logo} alt='Aletheia Logo' width={width} height={height} />;
}
