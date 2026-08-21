import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LegalPage } from "@/features/legal/components/legal-page";
export default function Page() {
  return (
    <>
      <Header />
      <LegalPage
        title="Términos de Servicio"
        updated="Última actualización: Noviembre 2024"
        intro="Estos términos establecen las condiciones generales aplicables al uso de nuestro sitio y la relación con nuestros servicios."
        sections={[
          {
            id: "acceptance",
            title: "Aceptación de los términos",
            content: (
              <p>
                Al utilizar este sitio o solicitar información sobre nuestros
                servicios, usted acepta estas condiciones y se compromete a
                utilizarlos de forma lícita.
              </p>
            ),
          },
          {
            id: "services",
            title: "Nuestros servicios",
            content: (
              <p>
                El alcance, condiciones, entregables y valores de cada servicio
                se definirán de forma específica en propuestas, contratos o
                acuerdos correspondientes.
              </p>
            ),
          },
          {
            id: "responsibilities",
            title: "Responsabilidades del usuario",
            content: (
              <p>
                El usuario debe proporcionar información veraz y mantener un uso
                adecuado de los canales y contenidos disponibles.
              </p>
            ),
          },
          {
            id: "intellectual-property",
            title: "Propiedad intelectual",
            content: (
              <p>
                Los contenidos, marcas, diseños y materiales del sitio están
                protegidos y no pueden reproducirse sin autorización cuando
                corresponda.
              </p>
            ),
          },
          {
            id: "changes",
            title: "Cambios a estos términos",
            content: (
              <p>
                Podemos actualizar estos términos para reflejar cambios
                operativos, legales o de nuestros servicios. La versión vigente
                será la publicada en este sitio.
              </p>
            ),
          },
          {
            id: "contact",
            title: "Contacto",
            content: (
              <p>
                Para cualquier consulta sobre estos términos, puede comunicarse
                con nosotros a través de la sección de contacto.
              </p>
            ),
          },
        ]}
      />
      <Footer />
    </>
  );
}
