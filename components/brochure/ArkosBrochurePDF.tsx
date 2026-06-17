import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Register Inter font from Google Fonts CDN for proper accent/ñ support
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf', fontWeight: 'bold' },
  ],
});

// Disable hyphenation to prevent word breaks like "De-sarrollo"
Font.registerHyphenationCallback((word) => [word]);

const C = { accent: "#0ea5e9", dark: "#0a0a0a", white: "#ffffff", gray: "#a1a1aa", grayDark: "#71717a", light: "#f4f4f5", border: "#27272a", mid: "#18181b", bodyLight: "#3f3f46" };

// Path segments — combined with baseUrl at render time
const PATHS = {
  logo: '/logo_ico/final - LOGO 2-02.png',
  logoDark: '/logo_ico/final - LOGO 2-01.png',
  iconWhite: '/logo_ico/final - LOGO 2-08.png',
  iconDark: '/logo_ico/final - LOGO 2-07.png',
};

const IMG = {
  cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  meeting: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
};

const PHONE = "+51 961 869 348";
const EMAIL = "gerencia@árkos.com";
const WEB = "árkos.com";

// Reusable watermark icon positioned bottom-right
const IconWatermark = ({ light, b }: { light?: boolean; b: string }) => (
  <Image src={`${b}${light ? PATHS.iconDark : PATHS.iconWhite}`} style={{ position: 'absolute' as const, bottom: 40, right: 40, width: 60, height: 60, opacity: 0.08 }} />
);

// Small header bar with logo + icon used on interior pages
const PageHeader = ({ light, b }: { light?: boolean; b: string }) => (
  <View style={{ flexDirection: 'row' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const, marginBottom: 25, paddingBottom: 12, borderBottom: `1px solid ${light ? '#e4e4e7' : C.border}` }}>
    <Image src={`${b}${light ? PATHS.logoDark : PATHS.logo}`} style={{ width: 75 }} />
    <Image src={`${b}${light ? PATHS.iconDark : PATHS.iconWhite}`} style={{ width: 20, height: 20, opacity: 0.4 }} />
  </View>
);

const s = StyleSheet.create({
  dk: { backgroundColor: C.dark, color: C.white, fontFamily: 'Inter', position: 'relative' as const },
  lt: { backgroundColor: C.white, color: C.dark, fontFamily: 'Inter', position: 'relative' as const },
  pad: { flex: 1, padding: 50 },
  row: { flexDirection: 'row' as const },
  w50: { width: '50%' },
  h1: { fontSize: 42, fontWeight: 'bold' as const, lineHeight: 1.1, letterSpacing: -1 },
  h2: { fontSize: 28, fontWeight: 'bold' as const, marginBottom: 15 },
  body: { fontSize: 11, lineHeight: 1.7 },
  muted: { fontSize: 10, color: C.gray, lineHeight: 1.6 },
  footer: { position: 'absolute' as const, bottom: 30, left: 50, right: 50, flexDirection: 'row' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const },
  footerTxt: { fontSize: 8, color: C.grayDark },
  pill: { backgroundColor: C.accent, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4, alignSelf: 'flex-start' as const },
  pillTxt: { color: C.white, fontSize: 8, fontWeight: 'bold' as const },
  divider: { height: 2, backgroundColor: C.accent, width: 40, marginVertical: 15 },
  statNum: { fontSize: 32, fontWeight: 'bold' as const, color: C.accent },
  tocRow: { flexDirection: 'row' as const, borderBottom: `1px solid ${C.border}`, paddingVertical: 14, alignItems: 'center' as const },
  tocNum: { fontSize: 12, color: C.accent, width: 35, fontWeight: 'bold' as const },
  tocTitle: { fontSize: 14, color: C.white },
  imgCover: { position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: 0, opacity: 0.2, objectFit: 'cover' as const },
  overlay: { position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: 0, backgroundColor: C.dark, opacity: 0.7 },
});

const Ft = ({ p, l }: { p: number; l?: boolean }) => (
  <View style={s.footer}>
    <Text style={[s.footerTxt, l ? { color: '#a1a1aa' } : {}]}>Brochure Corporativo — Árkos</Text>
    <Text style={[s.footerTxt, l ? { color: '#a1a1aa' } : {}]}>Página {p}</Text>
  </View>
);

// Service card with numbered badge
const SvcCard = ({ num, title, desc, dark }: { num: string; title: string; desc: string; dark?: boolean }) => (
  <View style={{ backgroundColor: dark ? C.mid : C.light, padding: 20, borderRadius: 8, marginBottom: 14, borderLeft: `4px solid ${C.accent}` }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
      <View style={{ width: 28, height: 28, backgroundColor: C.accent, borderRadius: 6, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
        <Text style={{ color: C.white, fontSize: 12, fontWeight: 'bold' }}>{num}</Text>
      </View>
      <Text style={{ fontSize: 15, fontWeight: 'bold', color: dark ? C.white : C.dark }}>{title}</Text>
    </View>
    <Text style={{ fontSize: 11, lineHeight: 1.6, color: dark ? '#d4d4d8' : C.bodyLight }}>{desc}</Text>
  </View>
);

export const ArkosBrochurePDF = ({ baseUrl = '' }: { baseUrl?: string }) => {
  const b = baseUrl;
  const LOGO = `${b}${PATHS.logo}`;
  const ICON_WHITE = `${b}${PATHS.iconWhite}`;
  const ICON_DARK = `${b}${PATHS.iconDark}`;

  return (
    <Document title="Brochure Corporativo - Árkos" author="Árkos" subject="Servicios de desarrollo de software">

    {/* P1: COVER */}
    <Page size="A4" style={s.dk}>
      <Image src={IMG.cover} style={s.imgCover} />
      <View style={s.overlay} />
      <Image src={ICON_WHITE} style={{ position: 'absolute', bottom: 120, right: -30, width: 200, height: 200, opacity: 0.06 }} />
      <View style={[s.pad, { justifyContent: 'space-between' }]}>
        <View style={[s.row, { justifyContent: 'space-between', alignItems: 'center' }]}>
          <Image src={LOGO} style={{ width: 100 }} />
          <View style={s.pill}><Text style={s.pillTxt}>BROCHURE CORPORATIVO</Text></View>
        </View>
        <View>
          <Text style={[s.h1, { marginBottom: 5 }]}>Impulsamos tu</Text>
          <Text style={[s.h1, { color: C.accent, marginBottom: 20 }]}>Transformación Digital</Text>
          <View style={s.divider} />
          <Text style={[s.body, { color: '#d4d4d8', maxWidth: 340 }]}>
            Agencia de desarrollo de software especializada en crear soluciones tecnológicas escalables, modernas y de alto rendimiento para empresas que buscan crecer.
          </Text>
        </View>
        <View style={[s.row, { justifyContent: 'space-between', borderTop: `1px solid ${C.border}`, paddingTop: 15 }]}>
          <Text style={s.footerTxt}>{WEB}</Text>
          <Text style={s.footerTxt}>{PHONE}</Text>
          <Text style={s.footerTxt}>{EMAIL}</Text>
        </View>
      </View>
    </Page>

    {/* P2: INDEX */}
    <Page size="A4" style={s.dk}>
      <IconWatermark b={b} />
      <View style={s.pad}>
        <PageHeader b={b} />
        <Text style={[s.h1, { marginBottom: 5 }]}>Índice de</Text>
        <Text style={[s.h1, { color: C.accent, marginBottom: 40 }]}>Contenido</Text>
        <View style={s.row}>
          <View style={[s.w50, { paddingRight: 20 }]}>
            {['Quiénes Somos','Nuestra Filosofía','Servicios Core','Más Soluciones'].map((t, i) => (
              <View key={i} style={s.tocRow}><Text style={s.tocNum}>{String(i+1).padStart(2,'0')}</Text><Text style={s.tocTitle}>{t}</Text></View>
            ))}
          </View>
          <View style={[s.w50, { paddingLeft: 20 }]}>
            {['Stack Tecnológico','Casos de Éxito','Garantías','Contacto'].map((t, i) => (
              <View key={i} style={s.tocRow}><Text style={s.tocNum}>{String(i+5).padStart(2,'0')}</Text><Text style={s.tocTitle}>{t}</Text></View>
            ))}
          </View>
        </View>
      </View>
      <Ft p={2} />
    </Page>

    {/* P3: ABOUT */}
    <Page size="A4" style={[s.lt, { flexDirection: 'row' }]}>
      <View style={{ width: '42%' }}>
        <Image src={IMG.team} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </View>
      <View style={{ width: '58%', padding: 40, justifyContent: 'center' }}>
        <Image src={ICON_DARK} style={{ width: 30, height: 30, opacity: 0.15, marginBottom: 10 }} />
        <View style={[s.pill, { marginBottom: 15 }]}><Text style={s.pillTxt}>QUIÉNES SOMOS</Text></View>
        <Text style={[s.h2, { color: C.dark, fontSize: 24 }]}>Árkos — Agencia de Desarrollo de Software</Text>
        <Text style={[s.body, { color: C.bodyLight, marginBottom: 15 }]}>
          Somos una agencia digital con sede en Perú dedicada a transformar ideas en productos digitales reales. Combinamos diseño de alto nivel con ingeniería de software robusta para entregar soluciones que generan impacto comercial medible.
        </Text>
        <Text style={[s.body, { color: C.bodyLight, marginBottom: 25 }]}>
          Trabajamos con startups, PYMEs y corporativos que buscan modernizar operaciones, automatizar procesos y escalar con tecnología de vanguardia.
        </Text>
        <View style={s.row}>
          {[{n:'40+',l:'Proyectos Entregados'},{n:'99%',l:'Satisfacción de Cliente'},{n:'24/7',l:'Soporte Activo'}].map((x,i) => (
            <View key={i} style={{ flex: 1, borderTop: `3px solid ${C.accent}`, paddingTop: 10, marginRight: 10 }}>
              <Text style={[s.statNum, { fontSize: 26 }]}>{x.n}</Text>
              <Text style={{ fontSize: 9, color: C.bodyLight, marginTop: 3 }}>{x.l}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>

    {/* P4: PHILOSOPHY */}
    <Page size="A4" style={s.dk}>
      <Image src={IMG.meeting} style={s.imgCover} />
      <View style={s.overlay} />
      <View style={[s.pad, { justifyContent: 'center' }]}>
        <View style={[s.pill, { marginBottom: 20 }]}><Text style={s.pillTxt}>NUESTRA FILOSOFÍA</Text></View>
        <Text style={[s.h1, { marginBottom: 10, fontSize: 36 }]}>Construimos software que</Text>
        <Text style={[s.h1, { marginBottom: 10, fontSize: 36, color: C.accent }]}>resuelve problemas</Text>
        <Text style={[s.h1, { marginBottom: 30, fontSize: 36 }]}>de negocio reales.</Text>
        <View style={s.divider} />
        <View style={[s.row, { marginTop: 20 }]}>
          <View style={[s.w50, { paddingRight: 20 }]}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: C.accent, marginBottom: 10 }}>WHY</Text>
            <Text style={[s.body, { color: '#d4d4d8' }]}>
              La tecnología correcta acelera el crecimiento. Cada línea de código que escribimos tiene un propósito de negocio claro: reducir costos, aumentar ventas o mejorar la experiencia de tus clientes.
            </Text>
          </View>
          <View style={[s.w50, { paddingLeft: 20 }]}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: C.accent, marginBottom: 10 }}>HOW</Text>
            <Text style={[s.body, { color: '#d4d4d8' }]}>
              Combinamos metodologías ágiles con un enfoque consultivo. Primero entendemos tu negocio, luego diseñamos la solución ideal y ejecutamos con sprints claros y entregas frecuentes.
            </Text>
          </View>
        </View>
      </View>
      <Ft p={4} />
    </Page>

    {/* P5: SERVICES CORE */}
    <Page size="A4" style={s.dk}>
      <IconWatermark b={b} />
      <View style={s.pad}>
        <PageHeader b={b} />
        <Text style={[s.h1, { marginBottom: 5 }]}>Nuestros</Text>
        <Text style={[s.h1, { color: C.accent, marginBottom: 25 }]}>Servicios</Text>
        <View style={s.row}>
          <View style={[s.w50, { paddingRight: 7 }]}>
            <SvcCard dark num="01" title="Sistemas ERP" desc="Plataformas empresariales completas para gestionar recursos, inventario, facturación, RRHH y procesos internos con total control y trazabilidad." />
            <SvcCard dark num="02" title="Soluciones CRM" desc="Gestión centralizada de relaciones con clientes: ventas, leads, pipelines comerciales, seguimientos y analíticas en tiempo real." />
            <SvcCard dark num="03" title="Software a Medida" desc="Plataformas SaaS, dashboards, portales web y apps específicas construidas exactamente para las necesidades únicas de tu empresa." />
          </View>
          <View style={[s.w50, { paddingLeft: 7 }]}>
            <SvcCard dark num="04" title="Automatización" desc="Integración con n8n, Make y Zapier para conectar sistemas, eliminar tareas repetitivas y optimizar flujos ahorrando cientos de horas al mes." />
            <SvcCard dark num="05" title="Inteligencia Artificial" desc="Chatbots con IA generativa (GPT, Claude, Gemini), agentes virtuales de ventas 24/7, procesamiento inteligente y atención automatizada." />
            <SvcCard dark num="06" title="Diseño UX/UI" desc="Interfaces modernas diseñadas en Figma. Landing pages de alta conversión, identidad visual y experiencias que enamoran a los usuarios." />
          </View>
        </View>
      </View>
      <Ft p={5} />
    </Page>

    {/* P6: MORE SERVICES */}
    <Page size="A4" style={s.lt}>
      <IconWatermark light b={b} />
      <View style={s.pad}>
        <PageHeader light b={b} />
        <View style={[s.pill, { marginBottom: 15 }]}><Text style={s.pillTxt}>MÁS SOLUCIONES</Text></View>
        <Text style={[s.h2, { color: C.dark }]}>Soluciones adicionales</Text>
        <View style={s.row}>
          <View style={[s.w50, { paddingRight: 7 }]}>
            <SvcCard num="07" title="Bases de Datos" desc="Diseño, optimización y migración SQL/NoSQL. Arquitecturas escalables con PostgreSQL, Supabase, MongoDB y Redis." />
            <SvcCard num="08" title="Aplicaciones Web" desc="Full-stack con React, Next.js y Node.js. Apps web progresivas (PWA) con rendimiento cercano a nativo." />
            <SvcCard num="09" title="E-Commerce" desc="Tiendas online personalizadas con pasarelas de pago (Stripe, Paddle), gestión de inventario y UX de compra optimizada." />
          </View>
          <View style={[s.w50, { paddingLeft: 7 }]}>
            <SvcCard num="10" title="Cloud y DevOps" desc="Infraestructura en AWS, Vercel, Digital Ocean. CI/CD automatizado, monitoreo 24/7 y despliegues sin downtime." />
            <SvcCard num="11" title="APIs e Integraciones" desc="APIs RESTful y GraphQL. Integración con servicios terceros, webhooks y arquitecturas de microservicios." />
            <SvcCard num="12" title="Consultoría Digital" desc="Análisis de procesos, auditorías técnicas, roadmaps de producto y estrategia de transformación digital." />
          </View>
        </View>
      </View>
      <Ft p={6} l />
    </Page>

    {/* P7: TECH STACK */}
    <Page size="A4" style={s.dk}>
      <IconWatermark b={b} />
      <View style={s.pad}>
        <PageHeader b={b} />
        <Text style={[s.h1, { marginBottom: 5 }]}>Stack</Text>
        <Text style={[s.h1, { color: C.accent, marginBottom: 35 }]}>Tecnológico</Text>
        <View style={[s.row, { marginBottom: 35 }]}>
          {[
            { title: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Flutter'] },
            { title: 'Backend', items: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'Supabase', 'Redis'] },
            { title: 'Cloud e IA', items: ['AWS', 'Vercel', 'Docker', 'OpenAI / GPT', 'Claude AI', 'Google Gemini'] },
          ].map((col, i) => (
            <View key={i} style={{ flex: 1, paddingHorizontal: 8 }}>
              <View style={{ backgroundColor: C.accent, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 8, marginBottom: 15, alignItems: 'center' }}>
                <Text style={{ color: C.white, fontSize: 14, fontWeight: 'bold' }}>{col.title}</Text>
              </View>
              {col.items.map((item, j) => (
                <View key={j} style={{ borderBottom: `1px solid ${C.border}`, paddingVertical: 9 }}>
                  <Text style={{ fontSize: 12, color: '#e4e4e7' }}>{item}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={{ backgroundColor: C.mid, borderRadius: 8, padding: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 13, fontWeight: 'bold', color: C.accent, marginBottom: 10 }}>Herramientas y Plataformas</Text>
          <View style={s.row}>
            {[
              { t: 'Diseño', v: 'Figma — Adobe XD' },
              { t: 'Automatización', v: 'n8n — Make — Zapier' },
              { t: 'Control', v: 'Git — GitHub — Jira' },
              { t: 'Pagos', v: 'Stripe — Paddle' },
            ].map((x, i) => (
              <View key={i} style={{ flex: 1, paddingHorizontal: 6 }}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: C.white, marginBottom: 4 }}>{x.t}</Text>
                <Text style={{ fontSize: 10, color: C.gray }}>{x.v}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <Ft p={7} />
    </Page>

    {/* P8: CASE STUDIES */}
    <Page size="A4" style={s.dk}>
      <IconWatermark b={b} />
      <View style={[s.pad, { paddingBottom: 40 }]}>
        <PageHeader b={b} />
        <Text style={[s.h1, { marginBottom: 5, fontSize: 36 }]}>Casos de</Text>
        <Text style={[s.h1, { color: C.accent, marginBottom: 20, fontSize: 36 }]}>Éxito</Text>
        {[
          { client: 'Kinetic Black', type: 'Landing Page Premium', desc: 'Landing de alto impacto para marca de suplementación de élite. Diseño oscuro premium con animaciones y CTA de alta conversión.', tags: 'Next.js / React / TailwindCSS', stat: '5x conversión' },
          { client: 'Solutec DHA', type: 'Landing + CRM/ERP', desc: 'Landing premium y sistema interno de gestión para servicio técnico a domicilio de reparación de electrodomésticos en Lima. La web captura leads desde WhatsApp y el CRM los gestiona end-to-end.', tags: 'React / Material UI / Next.js', stat: '+40% consultas' },
          { client: 'Clínica Juan Pablo II', type: 'Gestión Clínica', desc: 'Plataforma con módulos de historias clínicas, gestión de citas, facturación electrónica y reportes médicos automatizados.', tags: 'React / PostgreSQL / Node.js', stat: '60% menos tiempo' },
          { client: 'Megalodon Pro', type: 'ERP Restaurantes', desc: 'Sistema de gestión para restaurantes con control de ventas, inventario, cocina y RRHH desde un panel centralizado con POS integrado.', tags: 'React / Next.js / Dashboard / POS', stat: 'Control total' },
        ].map((c, i) => (
          <View key={i} style={{ backgroundColor: C.mid, borderRadius: 8, padding: 14, marginBottom: 10, borderLeft: `4px solid ${C.accent}` }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
              <View>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: C.white }}>{c.client}</Text>
                <Text style={{ fontSize: 9, color: C.accent, marginTop: 1 }}>{c.type}</Text>
              </View>
              <View style={{ backgroundColor: '#064e3b', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 }}>
                <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#34d399' }}>{c.stat}</Text>
              </View>
            </View>
            <Text style={{ fontSize: 10, color: '#d4d4d8', lineHeight: 1.5, marginBottom: 4 }}>{c.desc}</Text>
            <Text style={{ fontSize: 8, color: C.grayDark }}>{c.tags}</Text>
          </View>
        ))}
      </View>
      <Ft p={8} />
    </Page>

    {/* P9: GUARANTEES + CONTACT — simple dark bg, no background image to prevent rendering issues */}
    <Page size="A4" style={s.dk}>
      <IconWatermark b={b} />
      <View style={[s.pad, { justifyContent: 'center', alignItems: 'center' }]}>
        <View style={[s.pill, { marginBottom: 25 }]}><Text style={s.pillTxt}>NUESTRAS GARANTÍAS</Text></View>
        <View style={[s.row, { marginBottom: 50, width: '100%' }]}>
          {[
            { n: 'Ilimitadas', l: 'Revisiones\nde Diseño' },
            { n: '60 días', l: 'Garantía\nPost-Entrega' },
            { n: '24 hrs', l: 'Tiempo de\nRespuesta' },
          ].map((x, i) => (
            <View key={i} style={{ flex: 1, alignItems: 'center', paddingHorizontal: 8, borderRight: i < 2 ? `1px solid ${C.border}` : 'none' }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: C.accent }}>{x.n}</Text>
              <Text style={{ fontSize: 10, color: C.gray, textAlign: 'center', marginTop: 5 }}>{x.l}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 1, backgroundColor: C.border, width: '60%', marginBottom: 40 }} />

        <Image src={LOGO} style={{ width: 100, marginBottom: 20 }} />
        <Text style={[s.h1, { textAlign: 'center', marginBottom: 5, fontSize: 36 }]}>¿Listo para</Text>
        <Text style={[s.h1, { textAlign: 'center', color: C.accent, marginBottom: 20, fontSize: 36 }]}>empezar?</Text>
        <Text style={[s.body, { color: '#d4d4d8', textAlign: 'center', maxWidth: 350, marginBottom: 30 }]}>
          Conversemos sobre tu proyecto. Te presentamos una propuesta personalizada sin compromiso.
        </Text>

        <View style={s.row}>
          {[
            { label: 'Email', value: EMAIL },
            { label: 'Teléfono', value: PHONE },
            { label: 'Web', value: WEB },
          ].map((item, i) => (
            <View key={i} style={{ alignItems: 'center', paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: C.accent, marginBottom: 4 }}>{item.label}</Text>
              <Text style={{ fontSize: 10, color: C.gray }}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 40, borderTop: `1px solid ${C.border}`, paddingTop: 12, width: '100%' }}>
          <Text style={[s.footerTxt, { textAlign: 'center' }]}>© 2026 Árkos. Todos los derechos reservados.</Text>
        </View>
      </View>
    </Page>

  </Document>
  );
};

export default ArkosBrochurePDF;
