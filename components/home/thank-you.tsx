import CurvedLoop from "../shared/CurvedLoop";

const ThankYou = () => {
  return (
    <div className="flex flex-col gap-7 pb-20 pt-10 sm:pb-40 sm:pt-0 md:gap-10">
      <CurvedLoop
        marqueeText="Thank ✦ You ✦ For ✦ Scrolling ✦ Bye ✦"
        speed={2}
        curveAmount={400}
        direction="right"
      />
    </div>
  );
};

export default ThankYou;
