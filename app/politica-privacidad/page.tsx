import { getLegalPage } from "@/features/legal/lib/legal-pages";
import { LegalPage } from "@/features/legal/components/legal-page";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
export default async function Page() {
  const page = await getLegalPage("politica-privacidad");
  if (!page) return null;
  return (
    <div>
      <Header />
      <LegalPage
        title="Política de Privacidad"
        updated="Última actualización: 15 de Mayo de 2024"
        intro="Su privacidad es fundamental para nosotros. Esta política explica cómo recopilamos, utilizamos y protegemos sus datos personales."
        sections={[
          {
            id: "information",
            title: "Información que recopilamos",
            content: (
              <>
                <p>
                  Podemos recopilar información que usted nos proporciona
                  directamente mediante formularios, comunicaciones o la
                  contratación de nuestros servicios.
                </p>
                <p>
                  Esto puede incluir nombre, correo electrónico, teléfono y la
                  información necesaria para atender su solicitud.
                </p>
              </>
            ),
          },
          {
            id: "use",
            title: "Cómo utilizamos la información",
            content: (
              <>
                <p>
                  Utilizamos sus datos para responder consultas, prestar
                  nuestros servicios, mejorar nuestra atención y cumplir
                  obligaciones legales aplicables.
                </p>
              </>
            ),
          },
          {
            id: "protection",
            title: "Protección de sus datos",
            content: (
              <p>
                Aplicamos medidas técnicas y organizativas razonables para
                proteger la información frente a accesos no autorizados, pérdida
                o uso indebido.
              </p>
            ),
          },
          {
            id: "rights",
            title: "Sus derechos",
            content: (
              <p>
                Puede solicitar acceso, actualización, rectificación o
                eliminación de sus datos, cuando corresponda conforme a la
                normativa aplicable.
              </p>
            ),
          },
          {
            id: "contact",
            title: "Contacto",
            content: (
              <p>
                Para consultas relacionadas con privacidad, comuníquese con Moya
                y Asociados mediante nuestros canales oficiales.
              </p>
            ),
          },
        ]}
      />
      <Footer />
    </div>
  );
}
