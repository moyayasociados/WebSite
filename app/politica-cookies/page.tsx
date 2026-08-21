import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LegalPage } from "@/features/legal/components/legal-page";
export default function Page() {
  return (
    <>
      <Header />
      <LegalPage
        title="Política de Cookies"
        updated="Última actualización: Noviembre 2024"
        intro="Utilizamos tecnologías similares a cookies para mejorar la experiencia y comprender el funcionamiento de nuestro sitio."
        sections={[
          {
            id: "what",
            title: "¿Qué son las cookies?",
            content: (
              <>
                <p>
                  Una cookie es un pequeño archivo que un sitio puede guardar en
                  su dispositivo para recordar determinadas preferencias o
                  información de navegación.
                </p>
                <p>
                  Las cookies ayudan a que los sitios funcionen correctamente y
                  pueden contribuir a mejorar la experiencia del usuario.
                </p>
              </>
            ),
          },
          {
            id: "types",
            title: "Tipos de cookies que utilizamos",
            content: (
              <p>
                Podemos utilizar cookies necesarias para el funcionamiento del
                sitio y, cuando corresponda, cookies analíticas o funcionales
                para comprender y mejorar su uso.
              </p>
            ),
          },
          {
            id: "manage",
            title: "Cómo gestionar las cookies",
            content: (
              <p>
                Puede controlar o eliminar cookies desde la configuración de su
                navegador. Desactivar algunas cookies puede afectar determinadas
                funcionalidades.
              </p>
            ),
          },
          {
            id: "contact",
            title: "Contacto",
            content: (
              <p>
                Si tiene preguntas sobre el uso de cookies, puede contactarnos
                mediante los canales oficiales de Moya y Asociados.
              </p>
            ),
          },
        ]}
      />
      <Footer />
    </>
  );
}
