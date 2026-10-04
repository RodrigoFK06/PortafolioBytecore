import HomeClient from "@/components/HomeClient";
import LlmContext from "@/components/LlmContext";
import { HOME_FAQS } from "@/components/sections/HomeFaqSection";
import { BASE_URL } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      {/* JSON-LD: FAQ de entidad visible al pie de la home (mismo array
          HOME_FAQS que renderiza HomeFaqSection → siempre en sync).
          La home era la única de las 12 páginas de contenido sin FAQPage
          y es la única que aparece en las consultas donde sale la marca. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${BASE_URL}/#faq`,
            mainEntity: HOME_FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      {/* Solo en el home: en páginas internas competía con el contenido real
          por la extracción de texto de los rastreadores de IA. */}
      <LlmContext />
      <HomeClient />
    </>
  );
}
