import { Oval } from "react-loader-spinner";

interface SpinnerProps {
  height?: string;
  color?: string;
}

const Spinner = ({
  height = "80",
  color = "lightblue",
}: SpinnerProps) => {
  return (
    <Oval
      height={height}
      color={color}
      secondaryColor="skyblue"
      strokeWidth={6}
      strokeWidthSecondary={6}
      ariaLabel="loading"
    />
  );
};

export default Spinner;
