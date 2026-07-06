import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font, Svg, Path } from '@react-pdf/renderer';
import { theme } from './theme';

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

// Path segments — combined with baseUrl at render time
const PATHS = {
  logo: '/logo_ico/final - LOGO 2-02.png',      // lockup completo (blanco, para fondo oscuro) — solo portada / cierre
  iconWhite: '/logo_ico/final - LOGO 2-08.png',  // ícono del cubo (blanco)
};

// ─────────────────────────────────────────────────────────────
// IMÁGENES LOCALES
// Pon tus archivos en /public/assets/ y cambia USE_LOCAL_IMAGES a true.
// Mientras esté en false se muestra el fallback geométrico (cubos isométricos).
// ─────────────────────────────────────────────────────────────
const USE_LOCAL_IMAGES = false;
const IMG = {
  cover: '/assets/portada.png',            // ← REEMPLAZA: fondo de la portada (antes: ciudad de stock)
  team:  '/assets/resthub-dashboard.png',  // ← REEMPLAZA: "Quiénes Somos" (antes: señor en laptop)
  office:'/assets/producto-2.png',         // ← REEMPLAZA: "Nuestra Filosofía" (antes: oficina difuminada)
};

const PHONE = "+51 961 869 348";
const EMAIL = "gerencia@árkos.com";       // correo corporativo — portada y contacto
const EMAIL2 = "rodrigoan.torresp@gmail.com"; // correo secundario — solo en contacto
const WEB = "árkos.com";

// ─── Fallback geométrico: campo de cubos isométricos en wireframe turquesa ───
// Se genera una sola vez (determinista, sin Math.random) y se reusa en cada slot.
function cubePath(cx: number, cy: number, r: number): string {
  const s = (Math.sqrt(3) / 2) * r;
  const pt = (x: number, y: number) => `${x.toFixed(1)} ${y.toFixed(1)}`;
  const T = pt(cx, cy - r);
  const UR = pt(cx + s, cy - r / 2);
  const LR = pt(cx + s, cy + r / 2);
  const B = pt(cx, cy + r);
  const LL = pt(cx - s, cy + r / 2);
  const UL = pt(cx - s, cy - r / 2);
  const Ctr = pt(cx, cy);
  // hexágono exterior + 3 radios al centro = ilusión de cubo isométrico
  return `M ${T} L ${UR} L ${LR} L ${B} L ${LL} L ${UL} Z ` +
         `M ${Ctr} L ${T} M ${Ctr} L ${LR} M ${Ctr} L ${LL}`;
}

const CUBES = (() => {
  const r = 30;
  const colStep = Math.sqrt(3) * r;
  const rowStep = 1.5 * r;
  const out: React.ReactElement[] = [];
  let k = 0;
  for (let row = -1; row * rowStep < 460; row++) {
    for (let col = -1; col * colStep < 340; col++) {
      const cx = col * colStep + (Math.abs(row % 2) === 1 ? colStep / 2 : 0);
      const cy = row * rowStep;
      out.push(
        <Path key={k++} d={cubePath(cx, cy, r)} stroke={theme.accent} strokeWidth={0.9} strokeOpacity={0.16} fill="none" />
      );
    }
  }
  return out;
})();

const CubeField = ({ style }: { style?: any }) => (
  <View style={[{ backgroundColor: theme.bg, overflow: 'hidden' }, style]}>
    <Svg viewBox="0 0 300 430" preserveAspectRatio="xMidYMid slice" style={s.fill}>
      {CUBES}
    </Svg>
  </View>
);

// Slot de fondo a sangre completa (portada, filosofía)
const Bg = ({ b, src }: { b: string; src: string }) =>
  USE_LOCAL_IMAGES ? (
    <>
      <Image src={`${b}${src}`} style={s.imgCover} />
      <View style={s.overlay} />
    </>
  ) : (
    <CubeField style={s.fill} />
  );

// Slot de panel dentro de una columna (Quiénes Somos)
const Panel = ({ b, src, style }: { b: string; src: string; style?: any }) =>
  USE_LOCAL_IMAGES ? <Image src={`${b}${src}`} style={style} /> : <CubeField style={style} />;

// Marca limpia para headers: ícono separado del wordmark, con aire (no el lockup apretado)
const Brandmark = ({ b, size = 16 }: { b: string; size?: number }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Image src={`${b}${PATHS.iconWhite}`} style={{ width: size, height: size, marginRight: 9 }} />
    <Text style={{ fontSize: size * 0.95, fontWeight: 'bold', color: theme.text, letterSpacing: 0.5 }}>Árkos</Text>
  </View>
);

// Marca de agua del ícono, abajo a la derecha
const IconWatermark = ({ b }: { b: string }) => (
  <Image src={`${b}${PATHS.iconWhite}`} style={{ position: 'absolute', bottom: 40, right: 40, width: 60, height: 60, opacity: 0.07 }} />
);

// Header reutilizable de páginas interiores
const SectionHeader = ({ b }: { b: string }) => (
  <View style={s.header}>
    <Brandmark b={b} />
  </View>
);

// Footer reutilizable
const Footer = ({ p }: { p: number }) => (
  <View style={s.footer}>
    <Text style={s.footerTxt}>Brochure Corporativo — Árkos</Text>
    <Text style={s.footerTxt}>Página {p}</Text>
  </View>
);

// Tarjeta base — IDÉNTICA en todo el documento: superficie + borde izquierdo turquesa
const Card = ({ children, style }: { children: React.ReactNode; style?: any }) => (
  <View style={[s.card, style]}>{children}</View>
);

// Tarjeta HÉROE — servicio estrella (Software a Medida). Más grande, sin número.
const HeroCard = ({ title, desc }: { title: string; desc: string }) => (
  <View style={s.heroCard}>
    <View style={[s.pill, { marginBottom: 10 }]}><Text style={s.pillTxt}>SERVICIO ESTRELLA</Text></View>
    <Text style={{ fontSize: 19, fontWeight: 'bold', color: theme.text, marginBottom: 6 }}>{title}</Text>
    <Text style={{ fontSize: 11, lineHeight: 1.6, color: theme.muted }}>{desc}</Text>
  </View>
);

// Tarjeta de servicio con badge numerado (usa la Card base)
const SvcCard = ({ num, title, desc }: { num: string; title: string; desc: string }) => (
  <Card>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
      <View style={s.numBadge}>
        <Text style={s.numBadgeTxt}>{num}</Text>
      </View>
      <Text style={{ fontSize: 15, fontWeight: 'bold', color: theme.text }}>{title}</Text>
    </View>
    <Text style={{ fontSize: 11, lineHeight: 1.6, color: theme.muted }}>{desc}</Text>
  </Card>
);

const s = StyleSheet.create({
  page: { backgroundColor: theme.bg, color: theme.text, fontFamily: 'Inter', position: 'relative' as const },
  pad: { flex: 1, padding: 50 },
  row: { flexDirection: 'row' as const },
  w50: { width: '50%' },
  fill: { position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' },
  h1: { fontSize: 42, fontWeight: 'bold' as const, lineHeight: 1.1, letterSpacing: -1, color: theme.text },
  h2: { fontSize: 28, fontWeight: 'bold' as const, marginBottom: 15, color: theme.text },
  body: { fontSize: 11, lineHeight: 1.7, color: theme.text },
  muted: { fontSize: 10, color: theme.muted, lineHeight: 1.6 },
  header: { flexDirection: 'row' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const, marginBottom: 25, paddingBottom: 12, borderBottom: `1px solid ${theme.border}` },
  footer: { position: 'absolute' as const, bottom: 30, left: 50, right: 50, flexDirection: 'row' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const },
  footerTxt: { fontSize: 8, color: theme.muted },
  pill: { backgroundColor: theme.accent, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4, alignSelf: 'flex-start' as const },
  pillTxt: { color: theme.onAccent, fontSize: 8, fontWeight: 'bold' as const, letterSpacing: 0.5 },
  divider: { height: 2, backgroundColor: theme.accent, width: 40, marginVertical: 15 },
  statNum: { fontSize: 32, fontWeight: 'bold' as const, color: theme.accent },
  tocRow: { flexDirection: 'row' as const, borderBottom: `1px solid ${theme.border}`, paddingVertical: 14, alignItems: 'center' as const },
  tocNum: { fontSize: 12, color: theme.accent, width: 35, fontWeight: 'bold' as const },
  tocTitle: { fontSize: 14, color: theme.text },
  imgCover: { position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: 0, opacity: 0.2, objectFit: 'cover' as const },
  overlay: { position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: 0, backgroundColor: theme.bg, opacity: 0.7 },
  // Tarjeta base reutilizable
  card: { backgroundColor: theme.surface, borderLeft: `3px solid ${theme.accent}`, borderRadius: 6, padding: 16, marginBottom: 12 },
  // Tarjeta héroe (servicio estrella) — mismo lenguaje, más peso
  heroCard: { backgroundColor: theme.surface, borderLeftWidth: 4, borderLeftColor: theme.accent, borderRadius: 8, padding: 22, marginBottom: 16 },
  numBadge: { width: 26, height: 26, backgroundColor: theme.accent, borderRadius: 6, justifyContent: 'center' as const, alignItems: 'center' as const, marginRight: 10 },
  numBadgeTxt: { color: theme.onAccent, fontSize: 12, fontWeight: 'bold' as const },
  // Badge de resultado en casos de éxito (turquesa, no verde)
  statBadge: { borderWidth: 1, borderColor: theme.accent, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
  statBadgeTxt: { fontSize: 8, fontWeight: 'bold' as const, color: theme.accent },
});

export const ArkosBrochurePDF = ({ baseUrl = '' }: { baseUrl?: string }) => {
  const b = baseUrl;
  const LOGO = `${b}${PATHS.logo}`;
  const ICON_WHITE = `${b}${PATHS.iconWhite}`;

  return (
    <Document title="Brochure Corporativo - Árkos" author="Árkos" subject="Servicios de desarrollo de software">

    {/* P1: COVER */}
    <Page size="A4" style={s.page}>
      {/* 🖼️ FONDO PORTADA — reemplaza con /public/assets/portada.png (USE_LOCAL_IMAGES = true) */}
      <Bg b={b} src={IMG.cover} />
      <Image src={ICON_WHITE} style={{ position: 'absolute', bottom: 120, right: -30, width: 200, height: 200, opacity: 0.06 }} />
      <View style={[s.pad, { justifyContent: 'space-between' }]}>
        <View style={[s.row, { justifyContent: 'space-between', alignItems: 'center' }]}>
          <Image src={LOGO} style={{ width: 100 }} />
          <View style={s.pill}><Text style={s.pillTxt}>BROCHURE CORPORATIVO</Text></View>
        </View>
        <View>
          <Text style={[s.h1, { marginBottom: 5 }]}>Impulsamos tu</Text>
          <Text style={[s.h1, { color: theme.accent, marginBottom: 20 }]}>Transformación Digital</Text>
          <View style={s.divider} />
          <Text style={[s.body, { color: theme.muted, maxWidth: 340 }]}>
            Agencia de desarrollo de software especializada en crear soluciones tecnológicas escalables, modernas y de alto rendimiento para empresas que buscan crecer.
          </Text>
        </View>
        <View style={[s.row, { justifyContent: 'space-between', borderTop: `1px solid ${theme.border}`, paddingTop: 15 }]}>
          <Text style={s.footerTxt}>{WEB}</Text>
          <Text style={s.footerTxt}>{PHONE}</Text>
          <Text style={s.footerTxt}>{EMAIL}</Text>
        </View>
      </View>
    </Page>

    {/* P2: INDEX */}
    <Page size="A4" style={s.page}>
      <IconWatermark b={b} />
      <View style={s.pad}>
        <SectionHeader b={b} />
        <Text style={[s.h1, { marginBottom: 5 }]}>Índice de</Text>
        <Text style={[s.h1, { color: theme.accent, marginBottom: 40 }]}>Contenido</Text>
        <View style={s.row}>
          <View style={[s.w50, { paddingRight: 20 }]}>
            {['Quiénes Somos','Nuestra Filosofía','Servicios a Medida','Datos & Automatización','Optimización & Tecnología'].map((t, i) => (
              <View key={i} style={s.tocRow}><Text style={s.tocNum}>{String(i+1).padStart(2,'0')}</Text><Text style={s.tocTitle}>{t}</Text></View>
            ))}
          </View>
          <View style={[s.w50, { paddingLeft: 20 }]}>
            {['Stack Tecnológico','Casos de Éxito','Garantías','Contacto'].map((t, i) => (
              <View key={i} style={s.tocRow}><Text style={s.tocNum}>{String(i+6).padStart(2,'0')}</Text><Text style={s.tocTitle}>{t}</Text></View>
            ))}
          </View>
        </View>
      </View>
      <Footer p={2} />
    </Page>

    {/* P3: ABOUT — ahora en tema oscuro */}
    <Page size="A4" style={[s.page, { flexDirection: 'row' }]}>
      <View style={{ width: '42%' }}>
        {/* 🖼️ "QUIÉNES SOMOS" — reemplaza con /public/assets/resthub-dashboard.png (USE_LOCAL_IMAGES = true) */}
        <Panel b={b} src={IMG.team} style={{ width: '100%', height: '100%' }} />
      </View>
      <View style={{ width: '58%', padding: 40, justifyContent: 'center' }}>
        <Image src={ICON_WHITE} style={{ width: 30, height: 30, opacity: 0.2, marginBottom: 10 }} />
        <View style={[s.pill, { marginBottom: 15 }]}><Text style={s.pillTxt}>QUIÉNES SOMOS</Text></View>
        <Text style={[s.h2, { fontSize: 24 }]}>Árkos — Agencia de Desarrollo de Software</Text>
        <Text style={[s.body, { color: theme.muted, marginBottom: 15 }]}>
          Somos una agencia digital con sede en Perú dedicada a transformar ideas en productos digitales reales. Combinamos diseño de alto nivel con ingeniería de software robusta para entregar soluciones que generan impacto comercial medible.
        </Text>
        <Text style={[s.body, { color: theme.muted, marginBottom: 25 }]}>
          Trabajamos con startups, PYMEs y corporativos que buscan modernizar operaciones, automatizar procesos y escalar con tecnología de vanguardia.
        </Text>
        <View style={s.row}>
          {[{n:'40+',l:'Proyectos Entregados'},{n:'99%',l:'Satisfacción de Cliente'},{n:'24/7',l:'Soporte Activo'}].map((x,i) => (
            <View key={i} style={{ flex: 1, borderTop: `3px solid ${theme.accent}`, paddingTop: 10, marginRight: 10 }}>
              <Text style={[s.statNum, { fontSize: 26 }]}>{x.n}</Text>
              <Text style={{ fontSize: 9, color: theme.muted, marginTop: 3 }}>{x.l}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>

    {/* P4: PHILOSOPHY */}
    <Page size="A4" style={s.page}>
      {/* 🖼️ FONDO "NUESTRA FILOSOFÍA" — reemplaza con /public/assets/producto-2.png (USE_LOCAL_IMAGES = true) */}
      <Bg b={b} src={IMG.office} />
      <View style={[s.pad, { justifyContent: 'center' }]}>
        <View style={[s.pill, { marginBottom: 20 }]}><Text style={s.pillTxt}>NUESTRA FILOSOFÍA</Text></View>
        <Text style={[s.h1, { marginBottom: 10, fontSize: 36 }]}>Construimos software que</Text>
        <Text style={[s.h1, { marginBottom: 10, fontSize: 36, color: theme.accent }]}>resuelve problemas</Text>
        <Text style={[s.h1, { marginBottom: 30, fontSize: 36 }]}>de negocio reales.</Text>
        <View style={s.divider} />
        <View style={[s.row, { marginTop: 20 }]}>
          <View style={[s.w50, { paddingRight: 20 }]}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.accent, marginBottom: 10 }}>WHY</Text>
            <Text style={[s.body, { color: theme.muted }]}>
              La tecnología correcta acelera el crecimiento. Cada línea de código que escribimos tiene un propósito de negocio claro: reducir costos, aumentar ventas o mejorar la experiencia de tus clientes.
            </Text>
          </View>
          <View style={[s.w50, { paddingLeft: 20 }]}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.accent, marginBottom: 10 }}>HOW</Text>
            <Text style={[s.body, { color: theme.muted }]}>
              Combinamos metodologías ágiles con un enfoque consultivo. Primero entendemos tu negocio, luego diseñamos la solución ideal y ejecutamos con sprints claros y entregas frecuentes.
            </Text>
          </View>
        </View>
      </View>
      <Footer p={4} />
    </Page>

    {/* P5: SERVICES — A MEDIDA (héroe) */}
    <Page size="A4" style={s.page}>
      <IconWatermark b={b} />
      <View style={s.pad}>
        <SectionHeader b={b} />
        <Text style={[s.h1, { marginBottom: 5 }]}>Nuestros</Text>
        <Text style={[s.h1, { color: theme.accent, marginBottom: 20 }]}>Servicios</Text>
        <HeroCard
          title="Software a Medida — nuestro núcleo"
          desc="Diseñamos y construimos sistemas 100% a la medida de tu operación —ERP, CRM, plataformas SaaS, portales y paneles internos— cuando el software enlatado se queda corto. Arquitectura propia, código mantenible y una solución que se adapta a tu proceso, no al revés."
        />
        <View style={s.row}>
          <View style={[s.w50, { paddingRight: 7 }]}>
            <SvcCard num="01" title="Sistemas ERP" desc="Plataformas empresariales completas para gestionar recursos, inventario, facturación, RRHH y procesos internos con total control y trazabilidad." />
            <SvcCard num="02" title="Soluciones CRM" desc="Gestión centralizada de relaciones con clientes: ventas, leads, pipelines comerciales, seguimientos y analíticas en tiempo real." />
          </View>
          <View style={[s.w50, { paddingLeft: 7 }]}>
            <SvcCard num="03" title="Aplicaciones Web" desc="Full-stack con React, Next.js y Node.js. Apps web progresivas (PWA) con rendimiento cercano a nativo y experiencia de usuario impecable." />
            <SvcCard num="04" title="E-Commerce" desc="Tiendas online personalizadas con pasarelas de pago (Stripe, Paddle), gestión de inventario y UX de compra optimizada." />
          </View>
        </View>
      </View>
      <Footer p={5} />
    </Page>

    {/* P6: SERVICES — DATOS & AUTOMATIZACIÓN */}
    <Page size="A4" style={s.page}>
      <IconWatermark b={b} />
      <View style={s.pad}>
        <SectionHeader b={b} />
        <Text style={[s.h1, { marginBottom: 5, fontSize: 36 }]}>Datos y</Text>
        <Text style={[s.h1, { color: theme.accent, marginBottom: 20, fontSize: 36 }]}>Automatización</Text>
        <View style={s.row}>
          <View style={[s.w50, { paddingRight: 7 }]}>
            <SvcCard num="05" title="Centralización de Datos" desc="Unificamos información dispersa en hojas de cálculo, apps y sistemas aislados en una sola fuente de verdad, con reportes y tableros en tiempo real para decidir con datos confiables." />
            <SvcCard num="06" title="Cumplimiento & Integraciones Perú" desc="Integración con normativa y entidades peruanas: facturación electrónica y SIRE (SUNAT), validación de identidad con RENIEC y planillas (PLAME, AFPnet). Tu sistema opera en regla, sin trámites manuales." />
            <SvcCard num="07" title="Bases de Datos" desc="Diseño, optimización y migración SQL/NoSQL. Arquitecturas escalables con PostgreSQL, Supabase, MongoDB y Redis." />
          </View>
          <View style={[s.w50, { paddingLeft: 7 }]}>
            <SvcCard num="08" title="APIs e Integraciones" desc="APIs RESTful y GraphQL. Integración con servicios terceros, webhooks y arquitecturas de microservicios." />
            <SvcCard num="09" title="Automatización" desc="Integración con n8n, Make y Zapier para conectar sistemas, eliminar tareas repetitivas y optimizar flujos ahorrando cientos de horas al mes." />
            <SvcCard num="10" title="Reingeniería de Procesos" desc="Auditamos y rediseñamos tus flujos operativos y el código heredado que frena tu crecimiento: eliminamos cuellos de botella, reducimos pasos manuales y dejamos procesos más simples y escalables." />
          </View>
        </View>
      </View>
      <Footer p={6} />
    </Page>

    {/* P7: SERVICES — OPTIMIZACIÓN & TECNOLOGÍA */}
    <Page size="A4" style={s.page}>
      <IconWatermark b={b} />
      <View style={s.pad}>
        <SectionHeader b={b} />
        <Text style={[s.h1, { marginBottom: 5, fontSize: 36 }]}>Optimización</Text>
        <Text style={[s.h1, { color: theme.accent, marginBottom: 20, fontSize: 36 }]}>y Tecnología</Text>
        <View style={s.row}>
          <View style={[s.w50, { paddingRight: 7 }]}>
            <SvcCard num="11" title="Optimización de Sistemas" desc="Mejoramos el rendimiento, los costos y la estabilidad de tus sistemas actuales: consultas lentas, infraestructura sobredimensionada y deuda técnica que encarece cada cambio." />
            <SvcCard num="12" title="Consultoría Digital" desc="Análisis de procesos, auditorías técnicas, roadmaps de producto y estrategia de transformación digital." />
            <SvcCard num="13" title="Inteligencia Artificial" desc="Chatbots con IA generativa (GPT, Claude, Gemini), agentes virtuales de ventas 24/7, procesamiento inteligente y atención automatizada." />
          </View>
          <View style={[s.w50, { paddingLeft: 7 }]}>
            <SvcCard num="14" title="Diseño UX/UI" desc="Interfaces modernas diseñadas en Figma. Landing pages de alta conversión, identidad visual y experiencias que enamoran a los usuarios." />
            <SvcCard num="15" title="Cloud y DevOps" desc="Infraestructura en AWS, Vercel, Digital Ocean. CI/CD automatizado, monitoreo 24/7 y despliegues sin downtime." />
          </View>
        </View>
      </View>
      <Footer p={7} />
    </Page>

    {/* P8: TECH STACK */}
    <Page size="A4" style={s.page}>
      <IconWatermark b={b} />
      <View style={s.pad}>
        <SectionHeader b={b} />
        <Text style={[s.h1, { marginBottom: 5 }]}>Stack</Text>
        <Text style={[s.h1, { color: theme.accent, marginBottom: 35 }]}>Tecnológico</Text>
        <View style={[s.row, { marginBottom: 35 }]}>
          {[
            { title: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Flutter'] },
            { title: 'Backend', items: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'Supabase', 'Redis'] },
            { title: 'Cloud e IA', items: ['AWS', 'Vercel', 'Docker', 'OpenAI / GPT', 'Claude AI', 'Google Gemini'] },
          ].map((col, i) => (
            <View key={i} style={{ flex: 1, paddingHorizontal: 8 }}>
              <View style={{ backgroundColor: theme.accent, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 8, marginBottom: 15, alignItems: 'center' }}>
                <Text style={{ color: theme.onAccent, fontSize: 14, fontWeight: 'bold' }}>{col.title}</Text>
              </View>
              {col.items.map((item, j) => (
                <View key={j} style={{ borderBottom: `1px solid ${theme.border}`, paddingVertical: 9 }}>
                  <Text style={{ fontSize: 12, color: theme.text }}>{item}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        <Card style={{ padding: 20, marginBottom: 0 }}>
          <Text style={{ fontSize: 13, fontWeight: 'bold', color: theme.accent, marginBottom: 10 }}>Herramientas y Plataformas</Text>
          <View style={s.row}>
            {[
              { t: 'Diseño', v: 'Figma — Adobe XD' },
              { t: 'Automatización', v: 'n8n — Make — Zapier' },
              { t: 'Control', v: 'Git — GitHub — Jira' },
              { t: 'Pagos', v: 'Stripe — Paddle' },
            ].map((x, i) => (
              <View key={i} style={{ flex: 1, paddingHorizontal: 6 }}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: theme.text, marginBottom: 4 }}>{x.t}</Text>
                <Text style={{ fontSize: 10, color: theme.muted }}>{x.v}</Text>
              </View>
            ))}
          </View>
        </Card>
      </View>
      <Footer p={8} />
    </Page>

    {/* P9: CASE STUDIES */}
    <Page size="A4" style={s.page}>
      <IconWatermark b={b} />
      <View style={[s.pad, { paddingBottom: 40 }]}>
        <SectionHeader b={b} />
        <Text style={[s.h1, { marginBottom: 5, fontSize: 36 }]}>Casos de</Text>
        <Text style={[s.h1, { color: theme.accent, marginBottom: 20, fontSize: 36 }]}>Éxito</Text>
        {[
          { client: 'Kinetic Black', type: 'Landing Page Premium', desc: 'Landing de alto impacto para marca de suplementación de élite. Diseño oscuro premium con animaciones y CTA de alta conversión.', tags: 'Next.js / React / TailwindCSS', stat: '5x conversión' },
          { client: 'Solutec DHA', type: 'Landing + CRM/ERP', desc: 'Landing premium y sistema interno de gestión para servicio técnico a domicilio de reparación de electrodomésticos en Lima. La web captura leads desde WhatsApp y el CRM los gestiona end-to-end.', tags: 'React / Material UI / Next.js', stat: '+40% consultas' },
          { client: 'Clínica Juan Pablo II', type: 'Gestión Clínica', desc: 'Plataforma con módulos de historias clínicas, gestión de citas, facturación electrónica y reportes médicos automatizados.', tags: 'React / PostgreSQL / Node.js', stat: '60% menos tiempo' },
          { client: 'RestHUB', type: 'ERP Restaurantes', desc: 'ERP integral para restaurantes que unifica POS, cocina, caja y contabilidad en un solo sistema. Cada rol opera con su propia pantalla optimizada, con una landing premium pensada para Latinoamérica.', tags: 'Next.js / React / TypeScript / ERP', stat: 'Operación unificada' },
        ].map((c, i) => (
          <Card key={i} style={{ padding: 14, marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
              <View>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: theme.text }}>{c.client}</Text>
                <Text style={{ fontSize: 9, color: theme.accent, marginTop: 1 }}>{c.type}</Text>
              </View>
              <View style={s.statBadge}>
                <Text style={s.statBadgeTxt}>{c.stat}</Text>
              </View>
            </View>
            <Text style={{ fontSize: 10, color: theme.muted, lineHeight: 1.5, marginBottom: 4 }}>{c.desc}</Text>
            <Text style={{ fontSize: 8, color: theme.muted }}>{c.tags}</Text>
          </Card>
        ))}
      </View>
      <Footer p={9} />
    </Page>

    {/* P10: GUARANTEES + CONTACT */}
    <Page size="A4" style={s.page}>
      <IconWatermark b={b} />
      <View style={[s.pad, { justifyContent: 'center', alignItems: 'center' }]}>
        <View style={[s.pill, { marginBottom: 25 }]}><Text style={s.pillTxt}>NUESTRAS GARANTÍAS</Text></View>
        <View style={[s.row, { marginBottom: 50, width: '100%' }]}>
          {[
            { n: 'Ilimitadas', l: 'Revisiones\nde Diseño' },
            { n: '60 días', l: 'Garantía\nPost-Entrega' },
            { n: '24 hrs', l: 'Tiempo de\nRespuesta' },
          ].map((x, i) => (
            <View key={i} style={{ flex: 1, alignItems: 'center', paddingHorizontal: 8, borderRight: i < 2 ? `1px solid ${theme.border}` : 'none' }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.accent }}>{x.n}</Text>
              <Text style={{ fontSize: 10, color: theme.muted, textAlign: 'center', marginTop: 5 }}>{x.l}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 1, backgroundColor: theme.border, width: '60%', marginBottom: 40 }} />

        <Image src={LOGO} style={{ width: 100, marginBottom: 20 }} />
        <Text style={[s.h1, { textAlign: 'center', marginBottom: 5, fontSize: 36 }]}>¿Listo para</Text>
        <Text style={[s.h1, { textAlign: 'center', color: theme.accent, marginBottom: 20, fontSize: 36 }]}>empezar?</Text>
        <Text style={[s.body, { color: theme.muted, textAlign: 'center', maxWidth: 350, marginBottom: 30 }]}>
          Conversemos sobre tu proyecto. Te presentamos una propuesta personalizada sin compromiso.
        </Text>

        <View style={s.row}>
          {[
            { label: 'Email', value: `${EMAIL}\n${EMAIL2}` },
            { label: 'Teléfono', value: PHONE },
            { label: 'Web', value: WEB },
          ].map((item, i) => (
            <View key={i} style={{ alignItems: 'center', paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: theme.accent, marginBottom: 4 }}>{item.label}</Text>
              <Text style={{ fontSize: 10, color: theme.muted, textAlign: 'center', lineHeight: 1.4 }}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 40, borderTop: `1px solid ${theme.border}`, paddingTop: 12, width: '100%' }}>
          <Text style={[s.footerTxt, { textAlign: 'center' }]}>© 2026 Árkos. Todos los derechos reservados.</Text>
        </View>
      </View>
    </Page>

  </Document>
  );
};

export default ArkosBrochurePDF;
