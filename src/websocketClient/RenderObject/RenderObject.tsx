/* eslint-disable @typescript-eslint/no-explicit-any */
interface IRenderObject {
  obj: any;
  level: number;
}

const RenderObject: React.FC<IRenderObject> = ({ obj, level }) => {
  if ((typeof obj !== "object" && !Array.isArray(obj)) || obj === null) {
    return <span>{obj}</span>;
  }

  if (Array.isArray(obj)) {
    return (
      <div>
        <span>{"["}</span>
        <div style={{ paddingLeft: 20 }}>
          {obj.map((item, index) => (
            <div key={index} style={{ paddingLeft: level * 20 }}>
              <RenderObject obj={item} level={level + 1} />
            </div>
          ))}
        </div>
        <span>{"]"}</span>
      </div>
    );
  }

  return (
    <div>
      <span>{"{"}</span>
      <div style={{ paddingLeft: 20 }}>
        {Object.entries(obj).map(([name, value]) => {
          if (typeof value === "object" && value !== null) {
            return (
              <div key={name} style={{ paddingLeft: level * 20 }}>
                "{name}":
                <RenderObject obj={value} level={level + 1} />
              </div>
            );
          }
          if (value) {
            return (
              <div key={name}>
                "{name}"{":"} {`${value}`}
              </div>
            );
          }
          return null;
        })}
      </div>
      <span>{"}"}</span>
    </div>
  );
};

export { RenderObject };
