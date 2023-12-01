import { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";

const RangeSelector = ({ onValueChange, minVal, maxVal,stepVal }) => {
  const [values, setValues] = useState([minVal, maxVal]);

  useEffect(() => {
    let rangeValue;
    if (values[0].toFixed(0) != minVal || values[1].toFixed(0) != maxVal) {
      rangeValue = {
        min: parseInt(values[0].toFixed(0)),
        max: parseInt(values[1].toFixed(0)),
      };
    } else {
      rangeValue = {
        min: 0,
        max: 0,
      };
    }
    onValueChange(rangeValue);
  }, [values, onValueChange, minVal, maxVal]);

  return (
    <div className="flex  items-center flex-col min-w-[213px] w-full">
      <Range
        values={values}
        step={stepVal?stepVal:1}
        min={minVal}
        max={maxVal}
        onChange={(newValues) => setValues(newValues)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "12px",
              width: "100%",
              borderRadius: "4px",
            }}
            className="bg-slate-300"
          >
            <div
              ref={props.ref}
              style={{
                height: "12px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#2E5268", "#ccc"],
                  min: 0,
                  max: 100,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              borderRadius: "50%",
              backgroundColor: "#2E5268",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                height: "8px",
                width: "8px",
                borderRadius: "50%",
                backgroundColor: "#f1faee",
              }}
            />
          </div>
        )}
      />
      <output id="output" className="text-fontcolor pt-2">
        {values[0].toFixed(0) == minVal && values[1].toFixed(0) == maxVal ? (
          <p>Todo</p>
        ) : (
          <p>
            {values[0].toFixed(0)} a {values[1].toFixed(0)}
          </p>
        )}
      </output>
    </div>
  );
};

export default RangeSelector;
