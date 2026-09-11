import HomeClient from "@/components/HomeClient";
import LlmContext from "@/components/LlmContext";

export default function HomePage() {
  return (
    <>
      {/* Solo en el home: en páginas internas competía con el contenido real
          por la extracción de texto de los rastreadores de IA. */}
      <LlmContext />
      <HomeClient />
    </>
  );
}
