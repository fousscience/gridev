import { FloatingOrbs } from "./FloatingOrbs";
import { Reveal } from "./Reveal";

type PageBannerProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function PageBanner({ title, description, children }: PageBannerProps) {
  return (
    <section className="page-banner relative isolate overflow-hidden text-white">
      <div className="page-banner-bg absolute inset-0 -z-10" />
      <FloatingOrbs variant="subtle" />
      <div className="container relative z-10 py-14 md:py-20">
        <Reveal>
          <h1 className="font-display max-w-3xl text-4xl font-semibold md:text-5xl">{title}</h1>
        </Reveal>
        {description ? (
          <Reveal delay={0.12} className="mt-4 max-w-2xl text-lg text-white/80">
            <p>{description}</p>
          </Reveal>
        ) : null}
        {children ? <Reveal delay={0.2}>{children}</Reveal> : null}
      </div>
    </section>
  );
}
