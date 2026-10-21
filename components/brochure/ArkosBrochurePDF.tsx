import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font, Svg, Path } from '@react-pdf/renderer';
import { theme } from './theme';
import { PRICE_TIERS, PRICE_FOOTNOTE, CREATIVE_SERVICES } from '@/data/pricing';

// Fuente de marca self-hosteada (TTF — react-pdf no soporta woff2).
// Switzer se usa en cuerpo Y display: la estática de Cabinet Grotesk de
// Fontshare trae los contornos de las vocales acentuadas mal dibujados
// (aguda→grave, "Árkos"→"Àrkos") y la variante variable instanciada
// cuelga a fontkit; Switzer Bold da títulos limpios con tildes correctas.
// Rutas relativas: el PDF se genera en el navegador, resuelven al origen.
// ?v= versiona el asset: evita que un navegador con una versión previa de
// la fuente en caché HTTP se la sirva a fontkit (una fuente malformada lo
// mete en un bucle que congela el hilo). Subir el número al cambiar el TTF.
Font.register({
  family: 'Switzer',
  fonts: [
    { src: '/fonts-pdf/Switzer-Regular.ttf?v=2', fontWeight: 'normal' },
    { src: '/fonts-pdf/Switzer-Bold.ttf?v=2', fontWeight: 'bold' },
  ],
});

// Disable hyphenation to prevent word breaks like "De-sarrollo"
Font.registerHyphenationCallback((word) => [word]);

// Path segments — combined with baseUrl at render time
const PATHS = {
  logo: '/logo_ico/final - LOGO 2-01.png',      // lockup completo (tinta oscura, para fondo claro) — solo portada / cierre
  iconWhite: '/logo_ico/final - LOGO 2-07.png',  // ícono del cubo (tinta oscura/cian, para fondo claro)
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
    <Text style={s.footerTxt}>Brochure de Árkos</Text>
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
    <View style={[s.pill, { marginBottom: 10 }]}><Text style={s.pillTxt}>SERVICIO PRINCIPAL</Text></View>
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
  page: { backgroundColor: theme.bg, color: theme.text, fontFamily: 'Switzer', position: 'relative' as const },
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
  // ── Tabla de inversión ──
  priceHead: { flexDirection: 'row' as const, backgroundColor: theme.surface, borderRadius: 6, paddingVertical: 9, paddingHorizontal: 12, marginBottom: 4 },
  priceHeadTxt: { fontSize: 9, fontWeight: 'bold' as const, color: theme.text, letterSpacing: 0.4 },
  priceRow: { flexDirection: 'row' as const, borderBottom: `1px solid ${theme.border}`, paddingVertical: 7, paddingHorizontal: 12, alignItems: 'flex-start' as const },
  priceName: { flex: 1, paddingRight: 10 },
  // alignItems, no textAlign: en react-pdf `textAlign` solo aplica a <Text>,
  // en una <View> se ignora silenciosamente y las columnas quedan a la izquierda.
  priceCol: { width: 74, alignItems: 'flex-end' as const },
  pricePen: { fontSize: 12, fontWeight: 'bold' as const, color: theme.text },
  priceUsd: { fontSize: 10, color: theme.muted },
});

export const ArkosBrochurePDF = ({ baseUrl = '' }: { baseUrl?: string }) => {
  const b = baseUrl;
  const LOGO = `${b}${PATHS.logo}`;
  const ICON_WHITE = `${b}${PATHS.iconWhite}`;

  return (
    <Document title="Brochure de Árkos" author="Árkos" subject="Mejora de procesos, automatización, IA y software a medida">

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
          <Text style={[s.h1, { marginBottom: 5 }]}>Mejoramos</Text>
          <Text style={[s.h1, { color: theme.accent, marginBottom: 20 }]}>tus procesos</Text>
          <View style={s.divider} />
          <Text style={[s.body, { color: theme.muted, maxWidth: 340 }]}>
            Empresa de Lima que mejora los procesos de otras empresas con automatización e IA, le enseña a su equipo a usarla y construye el software a medida que haga falta.
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
        <Text style={[s.h1, { color: theme.accent, marginBottom: 40 }]}>contenido</Text>
        <View style={s.row}>
          <View style={[s.w50, { paddingRight: 20 }]}>
            {['Quiénes somos','Cómo trabajamos','Software a medida','Datos y automatización','Optimización y tecnología','Diseño, contenido y producción'].map((t, i) => (
              <View key={i} style={s.tocRow}><Text style={s.tocNum}>{String(i+1).padStart(2,'0')}</Text><Text style={s.tocTitle}>{t}</Text></View>
            ))}
          </View>
          <View style={[s.w50, { paddingLeft: 20 }]}>
            {['Stack tecnológico','Inversión','Casos reales','Garantías','Contacto'].map((t, i) => (
              <View key={i} style={s.tocRow}><Text style={s.tocNum}>{String(i+7).padStart(2,'0')}</Text><Text style={s.tocTitle}>{t}</Text></View>
            ))}
          </View>
        </View>
      </View>
      <Footer p={2} />
    </Page>

    {/* P3: ABOUT */}
    <Page size="A4" style={[s.page, { flexDirection: 'row' }]}>
      <View style={{ width: '42%' }}>
        {/* 🖼️ "QUIÉNES SOMOS" — reemplaza con /public/assets/resthub-dashboard.png (USE_LOCAL_IMAGES = true) */}
        <Panel b={b} src={IMG.team} style={{ width: '100%', height: '100%' }} />
      </View>
      <View style={{ width: '58%', padding: 40, justifyContent: 'center' }}>
        <Image src={ICON_WHITE} style={{ width: 30, height: 30, opacity: 0.2, marginBottom: 10 }} />
        <View style={[s.pill, { marginBottom: 15 }]}><Text style={s.pillTxt}>QUIÉNES SOMOS</Text></View>
        <Text style={[s.h2, { fontSize: 24 }]}>Árkos: procesos, automatización y software a medida</Text>
        <Text style={[s.body, { color: theme.muted, marginBottom: 15 }]}>
          Somos una empresa de tecnología de Lima, Perú. Desde 2020 hacemos que los procesos de pymes y empresas funcionen mejor con automatización e IA, y construimos el software a medida que haga falta: ERPs, CRMs, PMS, webs y apps. Atendemos Lima y Callao con reuniones presenciales agendadas, y al resto del Perú y de Latinoamérica de forma remota.
        </Text>
        <Text style={[s.body, { color: theme.muted, marginBottom: 25 }]}>
          Trabajamos con clínicas, restaurantes, hoteles, comercios y servicios técnicos que ya no caben en un Excel. Somos nueve personas, y el onboarding de cada cliente lo hace Rodrigo Torres, el fundador.
        </Text>
        {/* Las tres cifras son LAS MISMAS del sitio (hero del home y página de
            Lima). Antes decían 40+ proyectos, 99% de satisfacción y soporte
            24/7: el sitio dice +50 y las otras dos no salen de ningún dato
            verificable. Un brochure que contradice a la web mata credibilidad. */}
        <View style={s.row}>
          {[{n:'+50',l:'Proyectos desplegados'},{n:'24',l:'Casos publicados'},{n:'2020',l:'Operando desde'}].map((x,i) => (
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
        <View style={[s.pill, { marginBottom: 20 }]}><Text style={s.pillTxt}>CÓMO TRABAJAMOS</Text></View>
        <Text style={[s.h1, { marginBottom: 10, fontSize: 36 }]}>Primero entendemos</Text>
        <Text style={[s.h1, { marginBottom: 10, fontSize: 36, color: theme.accent }]}>el proceso,</Text>
        <Text style={[s.h1, { marginBottom: 30, fontSize: 36 }]}>después el código.</Text>
        <View style={s.divider} />
        <View style={[s.row, { marginTop: 20 }]}>
          <View style={[s.w50, { paddingRight: 20 }]}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.accent, marginBottom: 10 }}>POR QUÉ</Text>
            <Text style={[s.body, { color: theme.muted }]}>
              Un sistema que nadie usa no mejora nada. Por eso medimos dónde se va el tiempo del equipo antes de proponer software, y si lo tuyo se arregla ordenando el Excel o definiendo un proceso, te lo decimos por escrito.
            </Text>
          </View>
          <View style={[s.w50, { paddingLeft: 20 }]}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.accent, marginBottom: 10 }}>CÓMO</Text>
            <Text style={[s.body, { color: theme.muted }]}>
              Taller para el equipo, diagnóstico de procesos con informe y costos, y recién entonces el desarrollo: por hitos, con una demo cada dos semanas y el código y los datos a tu nombre.
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
        <Text style={[s.h1, { color: theme.accent, marginBottom: 20 }]}>servicios</Text>
        <HeroCard
          title="Software a medida"
          desc="ERPs, CRMs, plataformas SaaS, portales y paneles internos construidos a partir de cómo opera tu equipo, para cuando el software enlatado se queda corto. El código y los datos son tuyos, y la facturación SUNAT va incluida cuando la operación la pide."
        />
        <View style={s.row}>
          <View style={[s.w50, { paddingRight: 7 }]}>
            <SvcCard num="01" title="Sistemas ERP" desc="Inventario, facturación, compras, RRHH y caja en un solo sistema, con registro de quién hizo qué y cuándo." />
            <SvcCard num="02" title="CRM" desc="Tu cartera de clientes fuera de los chats sueltos: contactos, oportunidades, seguimientos y reportes de venta en un solo lugar." />
          </View>
          <View style={[s.w50, { paddingLeft: 7 }]}>
            <SvcCard num="03" title="Aplicaciones web" desc="Con React, Next.js y Node.js, renderizadas en el servidor para que carguen rápido. Pueden instalarse en el celular como una app (PWA)." />
            <SvcCard num="04" title="E-commerce" desc="Tiendas online con pasarelas de pago en soles (Izipay, Culqi, MercadoPago) y Stripe para cobros internacionales, factura electrónica y control de stock." />
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
        <Text style={[s.h1, { color: theme.accent, marginBottom: 20, fontSize: 36 }]}>automatización</Text>
        <View style={s.row}>
          <View style={[s.w50, { paddingRight: 7 }]}>
            <SvcCard num="05" title="Centralización de datos" desc="Juntamos la información repartida en hojas de cálculo, apps y sistemas sueltos en una sola base, con reportes y tableros que se actualizan solos." />
            <SvcCard num="06" title="Cumplimiento e integraciones en Perú" desc="Facturación electrónica y SIRE (SUNAT), validación de identidad con RENIEC y planillas (PLAME, AFPnet) dentro del mismo sistema, sin trámites a mano." />
            <SvcCard num="07" title="Bases de datos" desc="Diseño, optimización y migración de bases SQL y NoSQL: PostgreSQL, Supabase, MongoDB y Redis." />
          </View>
          <View style={[s.w50, { paddingLeft: 7 }]}>
            <SvcCard num="08" title="APIs e integraciones" desc="APIs REST y GraphQL, webhooks e integración con los servicios de terceros que ya usas." />
            <SvcCard num="09" title="Automatización" desc="Flujos con n8n, Make y Zapier que conectan tus sistemas y hacen solos las tareas repetitivas, documentados y con registro de cada ejecución." />
            <SvcCard num="10" title="Reingeniería de procesos" desc="Revisamos tus flujos de trabajo y el código heredado que los traba: quitamos pasos manuales y cuellos de botella, y dejamos el proceso escrito y más simple." />
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
        <Text style={[s.h1, { color: theme.accent, marginBottom: 20, fontSize: 36 }]}>y tecnología</Text>
        <View style={s.row}>
          <View style={[s.w50, { paddingRight: 7 }]}>
            <SvcCard num="11" title="Optimización de sistemas" desc="Mejoramos el rendimiento, los costos y la estabilidad de tus sistemas actuales: consultas lentas, infraestructura sobredimensionada y deuda técnica que encarece cada cambio." />
            <SvcCard num="12" title="Consultoría y diagnóstico" desc="Análisis de procesos, auditorías técnicas y roadmaps de producto con costos, para decidir qué construir y qué no." />
            <SvcCard num="13" title="Inteligencia artificial" desc="Asistentes y agentes con Claude, Gemini o GPT que responden con tus datos, extracción de datos de documentos y atención por WhatsApp que pasa a una persona cuando hace falta." />
          </View>
          <View style={[s.w50, { paddingLeft: 7 }]}>
            <SvcCard num="14" title="Diseño UX/UI" desc="Investigación con usuarios, prototipo navegable en Figma y sistema de diseño antes de programar. Para landings, sistemas y apps." />
            <SvcCard num="15" title="Cloud y DevOps" desc="Infraestructura en AWS, Vercel y DigitalOcean, CI/CD automatizado, monitoreo y despliegues sin cortar el servicio." />
          </View>
        </View>
      </View>
      <Footer p={7} />
    </Page>

    {/* P8: DISEÑO, CONTENIDO Y PRODUCCIÓN
        Servicios creativos. Sin precio publicado: se cotizan por alcance.
        NO incluye pauta publicitaria (Meta / Facebook Ads) — todavía no es un
        servicio de Árkos y no se anuncia lo que no se presta. */}
    <Page size="A4" style={s.page}>
      <IconWatermark b={b} />
      <View style={s.pad}>
        <SectionHeader b={b} />
        <Text style={[s.h1, { marginBottom: 5, fontSize: 36 }]}>Diseño, contenido</Text>
        <Text style={[s.h1, { color: theme.accent, marginBottom: 12, fontSize: 36 }]}>y producción</Text>
        <Text style={[s.body, { color: theme.muted, marginBottom: 22, maxWidth: 430 }]}>
          Un sistema bien construido también necesita verse bien y comunicarse. Cubrimos la pieza
          gráfica y audiovisual con el mismo criterio que el software: coherencia con tu marca y
          entrega lista para usar en cada canal.
        </Text>
        <View style={s.row}>
          <View style={[s.w50, { paddingRight: 7 }]}>
            {CREATIVE_SERVICES.slice(0, 2).map((c) => (
              <SvcCard key={c.num} num={c.num} title={c.title} desc={c.desc} />
            ))}
          </View>
          <View style={[s.w50, { paddingLeft: 7 }]}>
            {CREATIVE_SERVICES.slice(2).map((c) => (
              <SvcCard key={c.num} num={c.num} title={c.title} desc={c.desc} />
            ))}
          </View>
        </View>
        <Card style={{ padding: 14, marginBottom: 0, marginTop: 4 }}>
          <Text style={{ fontSize: 10, color: theme.muted, lineHeight: 1.6 }}>
            Los servicios de diseño, audiovisual y producción se cotizan según alcance: volumen de
            piezas, formatos de entrega y si hay grabación de por medio. Cuéntanos qué necesitas y
            te pasamos una propuesta cerrada.
          </Text>
        </Card>
      </View>
      <Footer p={8} />
    </Page>

    {/* P9: TECH STACK */}
    <Page size="A4" style={s.page}>
      <IconWatermark b={b} />
      <View style={s.pad}>
        <SectionHeader b={b} />
        <Text style={[s.h1, { marginBottom: 5 }]}>Stack</Text>
        <Text style={[s.h1, { color: theme.accent, marginBottom: 35 }]}>tecnológico</Text>
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
          <Text style={{ fontSize: 13, fontWeight: 'bold', color: theme.accent, marginBottom: 10 }}>Herramientas y plataformas</Text>
          <View style={s.row}>
            {[
              { t: 'Diseño', v: 'Figma — Adobe XD' },
              { t: 'Automatización', v: 'n8n — Make — Zapier' },
              { t: 'Control', v: 'Git — GitHub — Jira' },
              { t: 'Pagos', v: 'Izipay — Culqi — MercadoPago — Stripe' },
            ].map((x, i) => (
              <View key={i} style={{ flex: 1, paddingHorizontal: 6 }}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: theme.text, marginBottom: 4 }}>{x.t}</Text>
                <Text style={{ fontSize: 10, color: theme.muted }}>{x.v}</Text>
              </View>
            ))}
          </View>
        </Card>
      </View>
      <Footer p={9} />
    </Page>

    {/* P10: INVERSIÓN — los precios REALES, los mismos de árkos.com/precios.
        Salen de data/pricing.ts, la fuente única que comparten el sitio y este
        documento: no pueden divergir. */}
    <Page size="A4" style={s.page}>
      <IconWatermark b={b} />
      <View style={s.pad}>
        <SectionHeader b={b} />
        {/* Esta página se salía de la hoja: las dos tarjetas de abajo caían
            partidas en una página extra sin encabezado. Título en una línea,
            filas más compactas y textos más cortos para que entre en una. */}
        <Text style={[s.h1, { fontSize: 36, marginBottom: 12 }]}>
          Inversión <Text style={{ color: theme.accent }}>en tu proyecto</Text>
        </Text>
        <Text style={[s.body, { color: theme.muted, marginBottom: 16 }]}>
          Publicamos rangos en lugar de responder «depende del alcance»: son los mismos precios de
          árkos.com/precios, para que tengas un punto de partida antes de la primera reunión.
        </Text>

        <View style={s.priceHead}>
          <View style={s.priceName}><Text style={s.priceHeadTxt}>TIPO DE PROYECTO</Text></View>
          <View style={s.priceCol}><Text style={s.priceHeadTxt}>DESDE (S/)</Text></View>
          <View style={s.priceCol}><Text style={s.priceHeadTxt}>DESDE (USD)</Text></View>
        </View>

        {PRICE_TIERS.map((t) => (
          <View key={t.name} style={s.priceRow}>
            <View style={s.priceName}>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: theme.text }}>
                {t.name}{t.quote ? '  ·  cotización' : ''}
              </Text>
              <Text style={{ fontSize: 9, color: theme.muted, lineHeight: 1.5, marginTop: 2 }}>{t.note}</Text>
            </View>
            <View style={s.priceCol}><Text style={s.pricePen}>S/ {t.penLabel}</Text></View>
            <View style={s.priceCol}><Text style={s.priceUsd}>$ {t.usdLabel}</Text></View>
          </View>
        ))}

        <Text style={{ fontSize: 8, color: theme.muted, marginTop: 10, lineHeight: 1.5 }}>
          {PRICE_FOOTNOTE}
        </Text>

        <View style={[s.row, { marginTop: 12 }]} wrap={false}>
          <View style={[s.w50, { paddingRight: 7 }]}>
            <Card style={{ marginBottom: 0 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: theme.text, marginBottom: 6 }}>Qué mueve el precio</Text>
              <Text style={{ fontSize: 9.5, color: theme.muted, lineHeight: 1.6 }}>
                Módulos, pantallas y roles de usuario; integraciones (pagos en soles, factura
                electrónica, courier, APIs); diseño a medida o plantilla, y migrar datos de un
                sistema anterior.
              </Text>
            </Card>
          </View>
          <View style={[s.w50, { paddingLeft: 7 }]}>
            <Card style={{ marginBottom: 0 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: theme.text, marginBottom: 6 }}>Cómo se paga</Text>
              <Text style={{ fontSize: 9.5, color: theme.muted, lineHeight: 1.6 }}>
                Por etapas contra hitos de entrega, o en mensualidades, con descuento si contratas
                varios servicios. Una web toma de 3 a 8 semanas; un sistema a medida, más según
                su complejidad.
              </Text>
            </Card>
          </View>
        </View>
      </View>
      <Footer p={10} />
    </Page>

    {/* P11: CASE STUDIES */}
    <Page size="A4" style={s.page}>
      <IconWatermark b={b} />
      <View style={[s.pad, { paddingBottom: 40 }]}>
        <SectionHeader b={b} />
        <Text style={[s.h1, { marginBottom: 5, fontSize: 36 }]}>Casos</Text>
        <Text style={[s.h1, { color: theme.accent, marginBottom: 20, fontSize: 36 }]}>reales</Text>
        {/* Cada `stat` sale de un dato real del sitio (testimonio firmado o
            ficha de /portfolio). Antes había métricas que no existían en
            ninguna parte —"5x conversión", "60% menos tiempo"— y una de ellas
            contradecía el 78% que declara el testimonio de la Clínica. */}
        {[
          { client: 'Solutec DHA', type: 'Landing + CRM/ERP', desc: 'Landing y sistema interno de gestión para un servicio técnico a domicilio de electrodomésticos en Lima. La web capta los contactos que llegan por WhatsApp y el sistema los sigue de punta a punta.', tags: 'React / Material UI / Next.js', stat: '+40% consultas' },
          { client: 'Clínica Juan Pablo II', type: 'Gestión clínica', desc: 'Plataforma de gestión hospitalaria y agendamiento de citas para una clínica que opera emergencias 24 horas y coordina con varias aseguradoras a la vez. Antes cada cita era una llamada, un cuaderno y una hoja de cálculo distinta.', tags: 'React / PostgreSQL / Node.js', stat: '78% de citas digitales' },
          { client: 'RestHUB', type: 'ERP para restaurantes', desc: 'ERP para restaurantes que une POS, cocina, caja y contabilidad en un solo sistema, con una pantalla para cada rol: caja no ve lo mismo que cocina.', tags: 'Next.js / React / TypeScript / ERP', stat: 'Cierre de caja: de 45 a 5 min' },
          { client: 'Encrypted Escape Room', type: 'Plataforma web interactiva', desc: 'Experiencia de escape room en línea con enigmas y códigos a resolver contra reloj, con varias salas temáticas y niveles de dificultad. Lógica de juego, control de tiempo y progresión por sala.', tags: 'React / Next.js / CodeIgniter / MySQL', stat: 'Salas temáticas' },
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
      <Footer p={11} />
    </Page>

    {/* P12: GUARANTEES + CONTACT */}
    <Page size="A4" style={s.page}>
      <IconWatermark b={b} />
      <View style={[s.pad, { justifyContent: 'center', alignItems: 'center' }]}>
        <View style={[s.pill, { marginBottom: 25 }]}><Text style={s.pillTxt}>NUESTRAS GARANTÍAS</Text></View>
        <View style={[s.row, { marginBottom: 50, width: '100%' }]}>
          {[
            { n: 'Ilimitadas', l: 'Revisiones\nde diseño' },
            { n: '60 días', l: 'Garantía\nposentrega' },
            { n: '24 hrs', l: 'Tiempo de\nrespuesta' },
          ].map((x, i) => (
            <View key={i} style={{ flex: 1, alignItems: 'center', paddingHorizontal: 8, borderRight: i < 2 ? `1px solid ${theme.border}` : 'none' }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.accent }}>{x.n}</Text>
              <Text style={{ fontSize: 10, color: theme.muted, textAlign: 'center', marginTop: 5 }}>{x.l}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 1, backgroundColor: theme.border, width: '60%', marginBottom: 40 }} />

        <Image src={LOGO} style={{ width: 100, marginBottom: 20 }} />
        <Text style={[s.h1, { textAlign: 'center', marginBottom: 5, fontSize: 36 }]}>¿Por dónde</Text>
        <Text style={[s.h1, { textAlign: 'center', color: theme.accent, marginBottom: 20, fontSize: 36 }]}>empezamos?</Text>
        <Text style={[s.body, { color: theme.muted, textAlign: 'center', maxWidth: 350, marginBottom: 30 }]}>
          Una llamada de 30 minutos, sin costo: nos cuentas cómo trabajan hoy y te decimos si lo tuyo pide un sistema, un ajuste o nada todavía.
        </Text>

        <View style={s.row}>
          {[
            { label: 'Email', value: EMAIL },
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
          <Text style={[s.footerTxt, { textAlign: 'center' }]}>© {new Date().getFullYear()} Árkos. Todos los derechos reservados.</Text>
        </View>
      </View>
    </Page>

  </Document>
  );
};

export default ArkosBrochurePDF;
