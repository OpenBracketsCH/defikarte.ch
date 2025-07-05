import logoGreen from '../../../assets/logo/defikarte-logo-quer-gruen-positiv-rgb.svg';

export const SplashScreen = () => {
  return (
    <div className="z-20 absolute top-0 bg-white h-full w-full flex justify-center items-center animate-pulse-slow">
      <img src={logoGreen} alt="defikarte.ch" className="w-50 " />
    </div>
  );
};
