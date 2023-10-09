import { ClassType } from "../shared/types";
import { noticia1 } from "../assets";
import { noticia2 } from "../assets";
import { noticia3 } from "../assets";
import Class from "./Class";

const infoNotice: Array<ClassType> = [
  {
    portal: "informação gerada aqui",
    title: "title gerado aqui",
    description: "descrição gerada aqui",
    image: noticia1,
  },
  {
    portal: "informação gerada aqui",
    title: "title gerado aqui",
    description: "descrição gerada aqui",
    image: noticia2,
  },
  {
    portal: "informação gerada aqui",
    title: "title gerado aqui",
    description: "descrição gerada aqui",
    image: noticia3,
  },
];

const notice = () => {
  return (
    <div>
      <div>
        {infoNotice.map((item, index) => (
          <Class
            key={`${item.portal}-${index}`}
            portal={item.portal}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default notice;
