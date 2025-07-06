import logoGreen from '../../../assets/logo/defikarte-logo-quer-gruen-positiv-rgb.svg';

export const SplashScreen = () => {
  return (
    <>
      <div className="z-20 absolute top-0 bg-white h-full w-full animate-pulse-slow"></div>
      <div className="z-20 absolute top-0 h-full w-full flex justify-center items-center">
        <img src={logoGreen} alt="defikarte.ch" className="w-50 animate-bounce" />
      </div>
    </>
  );
};
