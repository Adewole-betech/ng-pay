import { ArrowUp2 } from "iconsax-react";

const customTooltip = (props) => {
  const { payload, active } = props;
  if (!active || !payload) return null;
  return (
    <div className="w-fit flex flex-col items-center">
      <ArrowUp2 variant="Bold" className="text-black" />
      <div className="bg-black rounded-md p-2 flex flex-col items-center">
        {payload.map((category, idx) => (
          <div key={idx} className="flex flex-col text-white">
            <p className="text-tremor-content">
              {category.dataKey}:{" "}
              <span className="font-medium">{category.value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default customTooltip;
