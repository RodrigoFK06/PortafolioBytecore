import { motion } from "framer-motion";
import { SkillBar } from "@/components/skill-bar";

export default function TechnologiesSection() {
  return (
    <section id="technologies" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Nuestras <span className="text-primary">Tecnologías</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Utilizamos las tecnologías más avanzadas para crear soluciones digitales robustas, escalables y de alto rendimiento.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary">Frontend</h3>
            <SkillBar name="React / Next.js" percentage={95} delay={0.1} />
            <SkillBar name="Angular / Ionic" percentage={85} delay={0.2} />
            <SkillBar name="JavaScript / TypeScript" percentage={90} delay={0.3} />
            <SkillBar name="Material UI / Tailwind CSS" percentage={90} delay={0.4} />
            <SkillBar name="Flutter Web / Dart" percentage={85} delay={0.5} />
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary">Backend</h3>
            <SkillBar name="Node.js / Express" percentage={90} delay={0.1} />
            <SkillBar name="PHP (CodeIgniter / Laravel)" percentage={85} delay={0.2} />
            <SkillBar name="Spring Boot (Java)" percentage={85} delay={0.3} />
            <SkillBar name="TypeORM / Sequelize" percentage={80} delay={0.4} />
            <SkillBar name="API REST / GraphQL" percentage={85} delay={0.5} />
          </div>

          <div className="hidden md:block space-y-6">
            <h3 className="text-xl font-bold text-primary">Bases de Datos</h3>
            <SkillBar name="SQL Server / MySQL" percentage={90} delay={0.1} />
            <SkillBar name="PostgreSQL / Oracle" percentage={85} delay={0.2} />
            <SkillBar name="MongoDB / Firebase" percentage={80} delay={0.3} />
            <SkillBar name="MSSQL-JS / Prisma" percentage={75} delay={0.4} />
          </div>

          <div className="hidden lg:block space-y-6">
            <h3 className="text-xl font-bold text-primary">DevOps & Cloud</h3>
            <SkillBar name="AWS / Vercel / Netlify" percentage={80} delay={0.1} />
            <SkillBar name="Docker / Kubernetes" percentage={75} delay={0.2} />
            <SkillBar name="CI/CD Pipelines" percentage={70} delay={0.3} />
            <SkillBar name="WordPress / Shopify" percentage={85} delay={0.4} />
          </div>

          <div className="hidden lg:block space-y-6">
            <h3 className="text-xl font-bold text-primary">Seguridad & Arquitectura</h3>
            <SkillBar name="Clean Code / SOLID" percentage={95} delay={0.1} />
            <SkillBar name="Arquitectura Hexagonal / CQRS" percentage={85} delay={0.2} />
            <SkillBar name="Autenticación JWT / OAuth" percentage={90} delay={0.3} />
            <SkillBar name="Express Validator / Bcrypt" percentage={80} delay={0.4} />
          </div>
        </div>
      </div>
    </section>
  );
}
